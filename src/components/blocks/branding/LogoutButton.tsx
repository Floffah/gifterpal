"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { ComponentProps } from "react";

import { Button } from "@/components/ui/button";

export default function LogoutButton({
    size = "sm",
    ...props
}: ComponentProps<typeof Button>) {
    const { signOut } = useAuthActions();

    return (
        <Button size={size} onClick={signOut} {...props}>
            Log out
        </Button>
    );
}
