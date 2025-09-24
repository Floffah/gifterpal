"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { PropsWithChildren, createContext, useContext } from "react";
import { api } from "~convex/api";
import { Doc } from "~convex/dataModel";

const GiftSearchClientContext = createContext<Doc<"giftSearches">>(null!);

export const useGiftSearch = () => useContext(GiftSearchClientContext);

export const GiftSearchClientProvider = ({
    preloadedGiftSearch,
    children,
}: PropsWithChildren<{
    preloadedGiftSearch: Preloaded<typeof api.giftSearches.get>;
}>) => {
    const giftSearch = usePreloadedQuery(preloadedGiftSearch)!;

    return (
        <GiftSearchClientContext.Provider value={giftSearch}>
            {children}
        </GiftSearchClientContext.Provider>
    );
};
