import { motion } from "motion/react";

import { OnboardingStepBaseProps } from "@/components/blocks/Onboarding/index";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function PeopleConsent({ onNext }: OnboardingStepBaseProps) {
    return (
        <Card asChild className="w-full max-w-sm">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
            >
                <CardHeader>
                    <CardTitle>Persons Consent</CardTitle>
                    <CardDescription>
                        By using Gifterpal,{" "}
                        <strong>
                            you agree that you will not upload any personally
                            identifiable information (PII) of individuals
                            without their explicit consent
                        </strong>
                        . This includes, but is not limited to, names, email
                        addresses, phone numbers, and any other information that
                        can be used to identify an individual.
                    </CardDescription>
                    <CardDescription>
                        Our AI models are designed to respect user privacy and
                        reject any PII that is uploaded without consent.{" "}
                        <strong>
                            If you are found to have breached this agreement,
                            your account may be suspended or terminated and data
                            may be deleted.
                        </strong>
                    </CardDescription>
                    <CardDescription>
                        (This is not legal advice. If you have any questions,
                        please consult a legal professional)
                    </CardDescription>
                </CardHeader>
                <CardFooter className="justify-end">
                    <Button onClick={onNext}>Next</Button>
                </CardFooter>
            </motion.div>
        </Card>
    );
}
