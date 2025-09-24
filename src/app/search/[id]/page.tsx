import { notFound, redirect } from "next/navigation";

import GiftSearch from "@/app/search/[id]/GiftSearch";
import { getGiftSearch } from "@/app/search/[id]/getGiftSearch";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const { preloadedGiftSearch, giftSearch } = await getGiftSearch(id);

    if (!preloadedGiftSearch || !giftSearch) {
        notFound();
        return null;
    }

    if (!giftSearch.budget || !giftSearch.occasion) {
        redirect(`/search/${id}/meta`);
    }

    if (giftSearch.generationState !== "reconnaissance_complete") {
        redirect(`/search/${id}/reconnaissance`);
    }

    return <GiftSearch preloadedGiftSearch={preloadedGiftSearch} />;
}
