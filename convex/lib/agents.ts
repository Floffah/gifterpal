import { Agent } from "@convex-dev/agent";
import { components } from "~convex/api";

import { systemPromptsDictionary } from "../codegen/prompts";
import { openrouter } from "./openrouter";

export const questionsAgent = new Agent(components.agent, {
    name: "Question Prompting Agent",
    languageModel: openrouter.chat("deepseek/deepseek-chat-v3.1:free"),
    instructions: systemPromptsDictionary.questions,
    contextOptions: {
        recentMessages: 100,
        searchOtherThreads: false,
        excludeToolMessages: false,
        searchOptions: {
            limit: 10,
            textSearch: true,
            // vectorSearch: true,
            messageRange: {
                before: 10,
                after: 2,
            },
        },
    },
});
