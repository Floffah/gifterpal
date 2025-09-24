import Link from "next/link";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";

import { GiftSearchClientProvider } from "@/app/search/[id]/GiftSearchClientProvider";
import { getGiftSearch } from "@/app/search/[id]/getGiftSearch";
import { Button } from "@/components/ui/button";

export default async function Layout({
    params,
    children,
}: PropsWithChildren<{
    params: Promise<{ id: string }>;
}>) {
    const { id } = await params;

    const { preloadedGiftSearch } = await getGiftSearch(id);

    if (!preloadedGiftSearch) {
        notFound();
        return null;
    }

    return (
        <GiftSearchClientProvider preloadedGiftSearch={preloadedGiftSearch}>
            <div className="flex min-h-screen flex-col gap-4 p-4">
                <header className="flex items-center justify-between gap-4">
                    <Button asChild size="sm">
                        <Link href="/home">Back</Link>
                    </Button>
                    <p className="text-xs text-muted-foreground">
                        You can leave this page at any time, your progress will
                        be saved.
                    </p>
                </header>
                {children}
            </div>
        </GiftSearchClientProvider>
    );
}
