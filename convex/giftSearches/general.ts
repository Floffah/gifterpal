import { createThread } from "@convex-dev/agent";
import { ConvexError, Infer, v } from "convex/values";
import { z } from "zod";
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

export const initiate = mutation({
    args: v.object({
        relationship: v.string(),
    }),
    handler: async (ctx, { relationship }) => {
        const user = await ensureUser(ctx);

        if (!user.onboarded) {
            await ctx.db.patch(user._id, { onboarded: true });
        }

        return await ctx.db.insert("giftSearches", {
            userId: user._id,
            relationship,
        });
    },
});

export const get = query({
    args: v.object({
        giftSearchId: v.id("giftSearches"),
    }),
    handler: async (ctx, { giftSearchId }) => {
        const user = await ensureUser(ctx);

        const giftSearch = await ctx.db.get(giftSearchId);
        if (!giftSearch || giftSearch.userId !== user._id) {
            return null;
        }

        return giftSearch;
    },
});

export const list = query({
    handler: async (ctx) => {
        const user = await ensureUser(ctx);

        return await ctx.db
            .query("giftSearches")
            .filter((q) => q.eq(q.field("userId"), user._id))
            .collect();
    },
});

export const update = mutation({
    args: v.object({
        giftSearchId: v.id("giftSearches"),
        occasion: v.optional(v.string()),
        relationship: v.optional(v.string()),
        budget: v.optional(v.number()),
        recipientId: v.optional(v.id("recipients")),
    }),
    handler: async (ctx, { giftSearchId, ...updates }) => {
        const user = await ensureUser(ctx);

        const giftSearch = await ctx.db.get(giftSearchId);

        if (!giftSearch || giftSearch.userId !== user._id) {
            throw new ConvexError("Gift search not found");
        }

        await ctx.db.patch(giftSearchId, updates);
    },
});
