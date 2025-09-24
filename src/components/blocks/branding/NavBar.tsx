import Link from "next/link";

import Loader from "@/components/Loader";
import { AuthLoading, Authenticated, Unauthenticated } from "@/components/auth";
import LogoutButton from "@/components/blocks/branding/LogoutButton";
import { Button } from "@/components/ui/button";

export default function NavBar() {
    return (
        <nav className="flex justify-center border-b border-b-muted">
            <div className="flex w-full max-w-300 items-center justify-between px-8 py-3">
                <h1 className="text-lg">Gifterpal</h1>

                <div>
                    <AuthLoading>
                        <Button size="sm" disabled variant="secondary">
                            <Loader />
                        </Button>
                    </AuthLoading>
                    <Authenticated>
                        <LogoutButton />
                    </Authenticated>
                    <Unauthenticated>
                        <Button size="sm" asChild>
                            <Link href="/">Log in</Link>
                        </Button>
                    </Unauthenticated>
                </div>
            </div>
        </nav>
    );
}
