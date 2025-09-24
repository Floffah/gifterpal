"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "~convex/api";

import Onboarding from "@/components/blocks/Onboarding";

export default function HomeContent({
    preloadedUser,
}: {
    preloadedUser: Preloaded<typeof api.user.currentUser>;
}) {
    const currentUser = usePreloadedQuery(preloadedUser);

    if (!currentUser?.onboarded) {
        return <Onboarding />;
    }

    return null;
}
