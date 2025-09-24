"use client";

import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useState } from "react";
import { api } from "~convex/api";

import { useGiftSearch } from "@/app/search/[id]/GiftSearchClientProvider";
import OtherBudgetDialog from "@/app/search/[id]/meta/OtherBudgetDialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const budgetOptions = [
    { label: "Cheap ($)", value: 10 },
    { label: "Budget ($$)", value: 50 },
    { label: "Big ($$$)", value: 100 },
    { label: "Expensive ($$$$)", value: 500 },
    { label: "Designer ($$$$$)", value: 1000 },
    { label: "Let me choose", value: "custom" },
];

export default function SetBudget() {
    const giftSearch = useGiftSearch();
    const updateGiftSearch = useMutation({
        mutationFn: useConvexMutation(api.giftSearches.update),
    });

    const [otherBudgetDialogOpen, setOtherBudgetDialogOpen] = useState(false);

    const onSelected = async (value: string) => {
        if (value === "custom") {
            setOtherBudgetDialogOpen(true);
        } else {
            await updateGiftSearch.mutateAsync({
                giftSearchId: giftSearch._id,
                budget: Number(value),
            });
        }
    };

    const onSetCustom = async (budget: number) => {
        await updateGiftSearch.mutateAsync({
            giftSearchId: giftSearch._id,
            budget,
        });
    };

    return (
        <>
            <OtherBudgetDialog
                open={otherBudgetDialogOpen}
                onOpenChange={setOtherBudgetDialogOpen}
                onSet={onSetCustom}
            />
            <motion.div
                className="flex flex-col gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <p>What is your budget?</p>
                <Select
                    onValueChange={onSelected}
                    disabled={
                        otherBudgetDialogOpen || updateGiftSearch.isPending
                    }
                >
                    <SelectTrigger
                        className="w-full"
                        loading={updateGiftSearch.isPending}
                    >
                        <SelectValue placeholder="E.g. 50" />
                    </SelectTrigger>
                    <SelectContent>
                        {budgetOptions.map((opt) => (
                            <SelectItem
                                key={opt.label}
                                value={String(opt.value)}
                            >
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </motion.div>
        </>
    );
}
