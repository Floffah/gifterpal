import { getAuthUserId } from "@convex-dev/auth/server";
import { Doc } from "~convex/dataModel";
import { internalQuery, query } from "~convex/server";

import { ensureUser } from "./lib/auth";

export const currentUser = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (userId === null) {
            return null;
        }
        return (await ctx.db.get(userId)) as Doc<"users">;
    },
});

export const internalEnsureUser = internalQuery({
    handler: async (ctx) => {
        return await ensureUser(ctx);
    },
});
