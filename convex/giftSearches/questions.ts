import { createThread } from "@convex-dev/agent";
import { ConvexError, Infer, v } from "convex/values";
import { api, components, internal } from "~convex/api";
import {
    internalAction,
    internalMutation,
    mutation,
    query,
} from "~convex/server";

import { systemPromptsDictionary } from "../codegen/prompts";
import { questionsAgent } from "../lib/agents";
import { ensureUser } from "../lib/auth";
import { reconnaissanceQuestion } from "../types";

// --- GENERATING QUESTIONS ---

export const generateNextQuestion = mutation({
    args: v.object({ giftSearchId: v.id("giftSearches") }),
    handler: async (ctx, { giftSearchId }) => {
        const user = await ensureUser(ctx);

        const giftSearch = await ctx.runQuery(api.giftSearches.general.get, {
            giftSearchId,
        });

        if (!giftSearch || giftSearch.userId !== user._id) {
            throw new ConvexError("Gift search not found");
        }

        if (
            giftSearch.generationState !== undefined &&
            giftSearch.generationState !== "ready_for_next_question"
        ) {
            throw new ConvexError("Already generating a question");
        }

        let threadId = giftSearch.threadId;

        if (!threadId) {
            threadId = await createThread(ctx, components.agent, {
                userId: user._id,
            });
        }

        await ctx.db.patch(giftSearch._id, {
            generationState: "generating_question",
            threadId,
        });

        await ctx.scheduler.runAfter(
            1,
            internal.giftSearches.questions.internalGenerateQuestion,
            {
                userId: user._id,
                threadId,
                giftSearchId: giftSearch._id,
                stringifiedGiftSearch: JSON.stringify(giftSearch, null, 2),
            },
        );
    },
});

export const internalSaveQuestion = internalMutation({
    args: v.object({
        giftSearchId: v.id("giftSearches"),
        question: reconnaissanceQuestion,
    }),
    handler: async (ctx, { giftSearchId, question }) => {
        const giftSearch = await ctx.db.get(giftSearchId);
        if (!giftSearch) {
            throw new ConvexError("Gift search not found");
        }

        await ctx.db.insert("giftReconnaissance", {
            giftSearchId,
            question,
        });

        if (question.action === "ASK") {
            await ctx.db.patch(giftSearchId, {
                generationState: "waiting_for_user_answer",
            });
        } else {
            await ctx.db.patch(giftSearchId, {
                generationState: "reconnaissance_complete",
            });
        }
    },
});

export const internalGenerateQuestion = internalAction({
    args: v.object({
        userId: v.id("users"),
        threadId: v.string(),
        giftSearchId: v.id("giftSearches"),
        stringifiedGiftSearch: v.string(),
        previousAnswer: v.optional(v.string()),
    }),
    handler: async (
        ctx,
        {
            userId,
            threadId,
            giftSearchId,
            stringifiedGiftSearch,
            previousAnswer,
        },
    ) => {
        let prompt = "Next question\n\n";

        if (previousAnswer) {
            prompt += `The user answered the previous question with: "${previousAnswer}"\n\n`;
        }

        prompt += `Here is the current state of the gift search model:\n\n\`\`\`${stringifiedGiftSearch}\n\`\`\`\n`;

        const question = await questionsAgent.generateText(
            ctx,
            {
                userId: userId,
                threadId,
            },
            {
                system: systemPromptsDictionary.questions,
                prompt,
            },
        );

        await ctx.runMutation(
            internal.giftSearches.questions.internalSaveQuestion,
            {
                giftSearchId,
                question: JSON.parse(question.text) as Infer<
                    typeof reconnaissanceQuestion
                >,
            },
        );
    },
});

// --- ANSWERING QUESTIONS ---

export const getLastQuestion = query({
    args: v.object({ giftSearchId: v.id("giftSearches") }),
    handler: async (ctx, { giftSearchId }) => {
        const giftSearch = await ctx.db.get(giftSearchId);
        if (!giftSearch) {
            throw new ConvexError("Gift search not found");
        }

        return await ctx.db
            .query("giftReconnaissance")
            .withIndex("by_creation_time")
            .order("desc")
            .filter((q) => q.eq(q.field("giftSearchId"), giftSearchId))
            .first();
    },
});

export const answerQuestion = mutation({
    args: v.object({
        questionId: v.id("giftReconnaissance"),
        answer: v.string(),
    }),
    handler: async (ctx, { questionId, answer }) => {
        const user = await ensureUser(ctx);

        const question = await ctx.db.get(questionId);
        if (!question) {
            throw new ConvexError("Question not found");
        }

        const giftSearch = await ctx.db.get(question.giftSearchId);
        if (
            !giftSearch ||
            giftSearch.userId !== user._id ||
            !giftSearch.threadId
        ) {
            throw new ConvexError("Gift search not found");
        }

        if (giftSearch.generationState !== "waiting_for_user_answer") {
            throw new ConvexError("Not waiting for an answer");
        }

        await ctx.db.patch(questionId, { answer });

        await ctx.db.patch(giftSearch._id, {
            generationState: "ready_for_next_question",
        });

        await ctx.db.patch(giftSearch._id, {
            generationState: "generating_question",
            threadId: giftSearch.threadId,
        });

        await ctx.scheduler.runAfter(
            1,
            internal.giftSearches.questions.internalGenerateQuestion,
            {
                userId: user._id,
                threadId: giftSearch.threadId,
                giftSearchId: giftSearch._id,
                stringifiedGiftSearch: JSON.stringify(giftSearch, null, 2),
                previousAnswer: answer,
            },
        );
    },
});
