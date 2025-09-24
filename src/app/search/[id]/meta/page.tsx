"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useGiftSearch } from "@/app/search/[id]/GiftSearchClientProvider";

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
            advanceStep(-1);
        }
    }, [giftSearch]);

    useEffect(() => {
        if (giftSearch && step === MetaStep.Complete) {
            router.push(`/search/${giftSearch._id}`);
        }
    }, [step, router, giftSearch]);

    return (
        <main className="flex flex-1 flex-col items-center justify-center">
            <h1 className="text-xl font-semibold sm:text-2xl">
                We need to gather a bit more info first
            </h1>
        </main>
    );
}
