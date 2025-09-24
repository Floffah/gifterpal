import { getAuthUserId } from "@convex-dev/auth/server";
import { GenericDatabaseReader, GenericDatabaseWriter } from "convex/server";
import { ConvexError } from "convex/values";

import { DataModel } from "../_generated/dataModel";
import { GenericCtx } from "../_generated/server";

export async function ensureUser(
    ctx: GenericCtx & {
        db: GenericDatabaseWriter<DataModel> | GenericDatabaseReader<DataModel>;
    },
) {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
        throw new ConvexError("Unauthorized");
    }

    const user = await ctx.db.get(userId);
    if (!user) {
        throw new ConvexError("Unauthorized");
    }

    return user;
}
