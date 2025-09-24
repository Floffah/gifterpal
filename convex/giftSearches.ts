import { ConvexError, v } from "convex/values";
import { mutation, query } from "~convex/server";

import { ensureUser } from "./lib/auth";

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
            characteristics: [],
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
