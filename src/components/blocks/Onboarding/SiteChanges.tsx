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

export default function SiteChanges({ onNext }: OnboardingStepBaseProps) {
    return (
        <>
            <Card asChild className="w-full max-w-sm">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                >
                    <CardHeader>
                        <CardTitle>Site Changes</CardTitle>
                        <CardDescription>
                            Gifterpal is an evolving platform. By using
                            Gifterpal, you acknowledge and agree that we may
                            make changes to the site, its features, and its
                            policies from time to time. We will strive to notify
                            you of any significant changes through appropriate
                            means, such as email or notifications on the
                            platform but it is your responsibility to stay
                            informed about any updates. Changes include but are
                            not limited to changes in functionality, adding a
                            subscription model, or changes to the terms of
                            service or privacy policy.
                        </CardDescription>
                        <CardDescription>
                            Continued use of Gifterpal after any changes
                            constitutes your acceptance of the updated terms. If
                            you do not agree with the changes, you may choose to
                            discontinue using Gifterpal. You can request
                            deletion of your account and data at any time.
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
                Almost there...
            </motion.p>
        </>
    );
}
