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
import { PRIVACY_POLICY_URL, TERMS_OF_SERVICE_URL } from "@/lib/links";

export default function WelcomeTerms({ onNext }: OnboardingStepBaseProps) {
    return (
        <Card asChild className="w-full max-w-sm">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
            >
                <CardHeader>
                    <CardTitle>Welcome to Gifterpal</CardTitle>
                    <CardDescription>
                        By using Gifterpal, you agree to our{" "}
                        <a href={TERMS_OF_SERVICE_URL} className="underline">
                            Terms and Conditions
                        </a>{" "}
                        and have read our{" "}
                        <a href={PRIVACY_POLICY_URL} className="underline">
                            Privacy Policy
                        </a>
                        . In the next few slides we will force you to be aware
                        of some important aspects of using Gifterpal.
                    </CardDescription>
                    <CardDescription>
                        These slides are intended to deter you from using
                        Gifterpal if you are not comfortable with any of the
                        aspects mentioned. If you are comfortable, please click
                        &quot;Next&quot; on each subsequent slide to proceed.
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
