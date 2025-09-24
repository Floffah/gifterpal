import { v } from "convex/values";

export const reconnaissanceQuestion = v.object({
    action: v.union(v.literal("ASK"), v.literal("FINISH")),
    question: v.optional(v.string()),
    thoughts: v.string(),
    confidence: v.number(),
});
