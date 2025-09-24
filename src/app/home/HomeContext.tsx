"use client";

import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { Preloaded, usePreloadedQuery } from "convex/react";
import Link from "next/link";
import { api } from "~convex/api";

import Onboarding from "@/components/blocks/Onboarding";
import NavBar from "@/components/blocks/branding/NavBar";

export default function HomeContent({
    preloadedUser,
}: {
    preloadedUser: Preloaded<typeof api.user.currentUser>;
}) {
    const currentUser = usePreloadedQuery(preloadedUser);

    const searches = useQuery(convexQuery(api.giftSearches.general.list, {}));

    if (!currentUser?.onboarded) {
        return <Onboarding />;
    }

    return (
        <div className="flex flex-col gap-2">
            <NavBar />

            <main className="flex flex-col gap-2 p-4">
                <h2 className="text-xl font-semibold">
                    Continue where you left off...
                </h2>

                {searches.data?.map((search) => (
                    <Link
                        key={search._id.toString()}
                        className="rounded border p-4"
                        href={`/search/${search._id}`}
                    >
                        <h3 className="font-bold">{search.occasion}</h3>
                        <p>For: {search.relationship}</p>
                        <p>Budget: ${search.budget}</p>
                    </Link>
                ))}
            </main>
        </div>
    );
}
