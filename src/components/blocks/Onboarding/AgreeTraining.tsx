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
import { PRIVACY_POLICY_URL } from "@/lib/links";

export default function AgreeTraining({ onNext }: OnboardingStepBaseProps) {
    return (
        <>
            <Card asChild className="w-full max-w-sm">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                >
                    <CardHeader>
                        <CardTitle>Training Agreement</CardTitle>
                        <CardDescription>
                            By using Gifterpal, you are okay with your data
                            being used to train and improve our AI models. We
                            ensure that your data is handled with the utmost
                            care and in accordance with our{" "}
                            <a href={PRIVACY_POLICY_URL} className="underline">
                                Privacy Policy
                            </a>
                            .{" "}
                            <strong>
                                If you do not agree to this, please do not use
                                Gifterpal.
                            </strong>
                        </CardDescription>
                        <CardDescription>
                            Refer to the previous slide or our{" "}
                            <a href={PRIVACY_POLICY_URL} className="underline">
                                Privacy Policy
                            </a>{" "}
                            for more information on how we handle your data and
                            personally identifiable information (PII).
                        </CardDescription>
                        <CardDescription>
                            (This is not legal advice. If you have any
                            questions, please consult a legal professional)
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="justify-end">
                        <Button onClick={onNext}>Next</Button>
                    </CardFooter>
                </motion.div>
            </Card>
            <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="max-w-sm text-center text-xs text-muted-foreground"
            >
                Yes, these screens are designed to deter you from using the
                site. During beta, I only want users who are interested in using
                the site, and informed of the risks and implications of using
                the site.
            </motion.p>
        </>
    );
}
