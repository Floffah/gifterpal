import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery, preloadedQueryResult } from "convex/nextjs";
import { Preloaded } from "convex/react";
import { cache } from "react";
import { api } from "~convex/api";
import { Id } from "~convex/dataModel";

export const getGiftSearch = cache(async (id: string) => {
    let preloadedGiftSearch: Preloaded<
        typeof api.giftSearches.general.get
    > | null = null;
    try {
        preloadedGiftSearch = await preloadQuery(
            api.giftSearches.general.get,
            {
                giftSearchId: id as Id<"giftSearches">,
            },
            {
                token: await convexAuthNextjsToken(),
            },
        );
    } catch (e) {
        preloadedGiftSearch = null;
    }
    if (!preloadedGiftSearch) {
        return {
            preloadedGiftSearch: null,
            giftSearch: null,
        };
    }

    return {
        preloadedGiftSearch,
        giftSearch: preloadedQueryResult(preloadedGiftSearch),
    };
});
