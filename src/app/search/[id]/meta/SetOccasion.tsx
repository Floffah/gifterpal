"use client";

import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useState } from "react";
import { api } from "~convex/api";

import { useGiftSearch } from "@/app/search/[id]/GiftSearchClientProvider";
import OtherOccasionDialog from "@/app/search/[id]/meta/OtherOccasionDialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function SetOccasion() {
    const giftSearch = useGiftSearch();

    const updateGiftSearch = useMutation({
        mutationFn: useConvexMutation(api.giftSearches.update),
    });

    const [otherOccasionDialogOpen, setOtherOccasionDialogOpen] =
        useState(false);

    const onSelected = async (value: string) => {
        if (value === "Other") {
            setOtherOccasionDialogOpen(true);
        } else {
            await updateGiftSearch.mutateAsync({
                giftSearchId: giftSearch._id,
                occasion: value,
            });
        }
    };

    return (
        <>
            <OtherOccasionDialog
                open={otherOccasionDialogOpen}
                onOpenChange={setOtherOccasionDialogOpen}
                onSet={onSelected}
            />

            <motion.div
                className="flex flex-col gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <p>What is the occasion?</p>
                <Select
                    onValueChange={onSelected}
                    disabled={
                        otherOccasionDialogOpen || updateGiftSearch.isPending
                    }
                >
                    <SelectTrigger
                        className="w-full"
                        loading={updateGiftSearch.isPending}
                    >
                        <SelectValue placeholder="E.g. Birthday" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Birthday">Birthday</SelectItem>
                        <SelectItem value="Christmas">Christmas</SelectItem>
                        <SelectItem value="Anniversary">Anniversary</SelectItem>
                        <SelectItem value="Wedding">Wedding</SelectItem>
                        <SelectItem value="Graduation">Graduation</SelectItem>
                        <SelectItem value="New Baby">New Baby</SelectItem>
                        <SelectItem value="Housewarming">
                            Housewarming
                        </SelectItem>
                        <SelectItem value="Retirement">Retirement</SelectItem>
                        <SelectItem value="Thank You">Thank You</SelectItem>
                        <SelectItem value="Get Well Soon">
                            Get Well Soon
                        </SelectItem>
                        <SelectItem value="Just Because">
                            Just Because
                        </SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                </Select>
            </motion.div>
        </>
    );
}
