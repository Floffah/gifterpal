import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

import { reconnaissanceQuestion } from "./types";

const schema = defineSchema({
    ...authTables,
    users: defineTable({
        name: v.optional(v.string()),
        image: v.optional(v.string()),
        email: v.optional(v.string()),
        emailVerificationTime: v.optional(v.number()),
        phone: v.optional(v.string()),
        phoneVerificationTime: v.optional(v.number()),
        isAnonymous: v.optional(v.boolean()),
        // other "users" fields...

        onboarded: v.optional(v.boolean()),
    }).index("email", ["email"]),

    giftSearches: defineTable({
        userId: v.id("users"),
        recipientId: v.optional(v.id("recipients")),
        occasion: v.optional(v.string()),
        relationship: v.string(),
        budget: v.optional(v.number()),
        generationState: v.optional(
            v.union(
                v.literal("generating_question"),
                v.literal("waiting_for_user_answer"),
                v.literal("ready_for_next_question"),
                v.literal("reconnaissance_complete"),
            ),
        ),
        threadId: v.optional(v.string()),
    }).index("byUser", ["userId"]),

    giftReconnaissance: defineTable({
        giftSearchId: v.id("giftSearches"),
        question: reconnaissanceQuestion,
        answer: v.optional(v.string()),
    }).index("byGiftSearch", ["giftSearchId"]),

    recipients: defineTable({
        userId: v.id("users"),
        name: v.string(),
        relationship: v.string(),
        characteristics: v.array(v.string()),
    }).index("byUser", ["userId"]),

    giftHistory: defineTable({
        recipientId: v.id("recipients"),
        gift: v.string(),
        occasion: v.string(),
        date: v.number(),
    }).index("byRecipient", ["recipientId", "date"]),
});

export default schema;
