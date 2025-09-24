"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import InitiateGiftSearchButton from "@/components/blocks/InitiateGiftSearchButton";
import AgreeTraining from "@/components/blocks/Onboarding/AgreeTraining";
import PeopleConsent from "@/components/blocks/Onboarding/PeopleConsent";
import Relying from "@/components/blocks/Onboarding/Relying";
import SiteChanges from "@/components/blocks/Onboarding/SiteChanges";
import WelcomeTerms from "@/components/blocks/Onboarding/WelcomeTerms";
import { PRIVACY_POLICY_URL, TERMS_OF_SERVICE_URL } from "@/lib/links";

const AnimatedInitiateGiftSearchButton = motion(InitiateGiftSearchButton);

enum OnboardingStep {
    WelcomeTerms,
    PeopleConsent,
    AgreeTraining,
    SiteChanges,
    Relying,
    Complete,
}

export interface OnboardingStepBaseProps {
    onNext: () => void;
}

export default function Onboarding() {
    const [step, setStep] = useState<OnboardingStep>(0);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
            <AnimatePresence mode="wait">
                {step === OnboardingStep.WelcomeTerms && (
                    <WelcomeTerms
                        key="welcome-terms"
                        onNext={() => setStep(OnboardingStep.PeopleConsent)}
                    />
                )}
                {step === OnboardingStep.PeopleConsent && (
                    <PeopleConsent
                        key="people-consent"
                        onNext={() => setStep(OnboardingStep.AgreeTraining)}
                    />
                )}
                {step === OnboardingStep.AgreeTraining && (
                    <AgreeTraining
                        key="agree-training"
                        onNext={() => setStep(OnboardingStep.SiteChanges)}
                    />
                )}
                {step === OnboardingStep.SiteChanges && (
                    <SiteChanges
                        key="site-changes"
                        onNext={() => setStep(OnboardingStep.Relying)}
                    />
                )}
                {step === OnboardingStep.Relying && (
                    <Relying
                        key="relying"
                        onNext={() => setStep(OnboardingStep.Complete)}
                    />
                )}
                {step === OnboardingStep.Complete && (
                    <motion.div
                        key="initiate-gift-search"
                        className="flex flex-col items-center gap-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        <p className="text-muted-foreground">
                            Let&apos;s give it a go...
                        </p>
                        <InitiateGiftSearchButton />
                    </motion.div>
                )}
            </AnimatePresence>

            <div
                key="footer-links"
                className="fixed bottom-0 flex items-center gap-2 p-4 text-sm text-muted-foreground"
            >
                <a href={TERMS_OF_SERVICE_URL} className="hover:underline">
                    Terms of Service
                </a>
                <span>•</span>
                <a href={PRIVACY_POLICY_URL} className="hover:underline">
                    Privacy Policy
                </a>
            </div>
        </main>
    );
}
