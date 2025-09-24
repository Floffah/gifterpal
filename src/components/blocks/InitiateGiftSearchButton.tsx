"use client";

import { useConvexMutation } from "@convex-dev/react-query";
import { DefaultError, useMutation } from "@tanstack/react-query";
import { FunctionArgs, FunctionReturnType } from "convex/server";
import { useRouter } from "next/navigation";
import { ComponentProps, useEffect } from "react";
import { api } from "~convex/api";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function InitiateGiftSearchButton({
    className,
    onSearch,
    ...props
}: ComponentProps<"div"> & { onSearch?: () => Promise<void> | void }) {
    const router = useRouter();

    const initiateSearchMutation = useMutation<
        FunctionReturnType<typeof api.giftSearches.general.initiate>,
        DefaultError,
        FunctionArgs<typeof api.giftSearches.general.initiate>
    >({
        mutationFn: useConvexMutation(api.giftSearches.general.initiate),
        onSuccess: async (id) => {
            if (onSearch) {
                await onSearch();
            }

            router.push(`/search/${id}`);
        },
    });

    useEffect(() => {
        router.prefetch("/search/[id]");
    }, [router]);

    return (
        <div className={cn("flex items-center gap-2", className)} {...props}>
            <p className="text-lg">I&apos;m looking for a gift for my</p>
            <Select
                disabled={initiateSearchMutation.isPending}
                onValueChange={(value) =>
                    initiateSearchMutation.mutate({ relationship: value })
                }
            >
                <SelectTrigger loading={initiateSearchMutation.isPending}>
                    <SelectValue placeholder="Relationship" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Brother">Brother</SelectItem>
                    <SelectItem value="Sister">Sister</SelectItem>
                    <SelectItem value="Mother">Mother</SelectItem>
                    <SelectItem value="Father">Father</SelectItem>
                    <SelectItem value="Other Family Member">
                        Other Family Member
                    </SelectItem>
                    <SelectItem value="Friend">Friend</SelectItem>
                    <SelectItem value="Colleague">Colleague</SelectItem>
                    <SelectItem value="Significant Other">
                        Significant Other
                    </SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
