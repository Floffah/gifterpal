"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "~convex/api";

export default function GiftSearch({
    preloadedGiftSearch,
}: {
    preloadedGiftSearch: Preloaded<typeof api.giftSearches.get>;
}) {
    const giftSearch = usePreloadedQuery(preloadedGiftSearch)!;

    return null;
}
