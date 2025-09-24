import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { api } from "~convex/api";

import HomeContent from "@/app/home/HomeContext";

export default async function Page() {
    const preloadedUser = await preloadQuery(
        api.user.currentUser,
        {},
        {
            token: await convexAuthNextjsToken(),
        },
    );

    return <HomeContent preloadedUser={preloadedUser} />;
}
