import Loops from "@auth/core/providers/loops";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
    providers: [
        // @ts-expect-error - .
        Loops({
            transactionalId: process.env.LOOPS_AUTH_TRANSACTIONAL_ID!,
            apiKey: process.env.LOOPS_KEY!,
        }),
    ],
});
