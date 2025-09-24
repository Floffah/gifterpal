"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useGiftSearch } from "@/app/search/[id]/GiftSearchClientProvider";
import SetBudget from "@/app/search/[id]/meta/SetBudget";
import SetOccasion from "@/app/search/[id]/meta/SetOccasion";

enum MetaStep {
    Occasion,
    Budget,
    Complete,
}

export default function SearchMetaPage() {
    const router = useRouter();
    const giftSearch = useGiftSearch();

    const [step, setStep] = useState<MetaStep>(0);

    const advanceStep = (currentStep: number = step) => {
        let nextStep = currentStep + 1;
        let nextStepSatisfied = false;

        do {
            switch (nextStep) {
                case MetaStep.Occasion:
                    nextStepSatisfied = !!giftSearch.occasion;
                    break;
                case MetaStep.Budget:
                    nextStepSatisfied = !!giftSearch.budget;
                    break;
                case MetaStep.Complete:
                    nextStepSatisfied = false;
                    break;
            }

            if (nextStepSatisfied) {
                nextStep++;
            }
        } while (nextStepSatisfied);

        setStep(nextStep);
    };

    useEffect(() => {
        if (giftSearch) {
            advanceStep(step - 1);
        }
    }, [giftSearch]);

    useEffect(() => {
        if (giftSearch && step === MetaStep.Complete) {
            router.push(`/search/${giftSearch._id}`);
        }
    }, [step, router, giftSearch]);

    console.log(step);

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-1 flex-col items-center justify-center gap-4"
        >
            <h1 className="text-xl font-semibold sm:text-2xl">
                We need to gather a bit more info first
            </h1>
            <AnimatePresence mode="wait">
                {step === MetaStep.Occasion && <SetOccasion key="occasion" />}
                {step === MetaStep.Budget && <SetBudget key="budget" />}
            </AnimatePresence>
        </motion.main>
    );
}
