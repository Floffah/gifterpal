"use client";

import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SendIcon } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { api } from "~convex/api";

import { useGiftSearch } from "@/app/search/[id]/GiftSearchClientProvider";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
    const router = useRouter();
    const giftSearch = useGiftSearch();

    const latestQuestion = useQuery(
        convexQuery(api.giftSearches.questions.getLastQuestion, {
            giftSearchId: giftSearch._id,
        }),
    );

    const genNextQuestionMutation = useMutation({
        mutationFn: useConvexMutation(
            api.giftSearches.questions.generateNextQuestion,
        ),
    });

    const answerQuestionMutation = useMutation({
        mutationFn: useConvexMutation(
            api.giftSearches.questions.answerQuestion,
        ),
    });

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useQuery({
        queryKey: ["initial-question", giftSearch._id],
        queryFn: async () => {
            if (!giftSearch) {
                return -1;
            }

            if (!giftSearch.generationState) {
                await genNextQuestionMutation.mutateAsync({
                    giftSearchId: giftSearch._id,
                });
            }

            return 0;
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        enabled: giftSearch && !giftSearch.generationState,
    });

    const onSubmitAnswer = () => {
        const answer = textareaRef.current?.value;
        if (
            !answer ||
            !latestQuestion.data ||
            answer.length === 0 ||
            !latestQuestion.data
        ) {
            return;
        }

        answerQuestionMutation.mutate({
            questionId: latestQuestion.data._id,
            answer,
        });
    };

    useEffect(() => {
        if (giftSearch.generationState === "reconnaissance_complete") {
            router.push(`/search/${giftSearch._id}/ideas`);
        }
    }, [giftSearch._id, giftSearch.generationState, router]);

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-1 flex-col items-center justify-center gap-4"
        >
            <h1 className="text-xl font-semibold sm:text-2xl">
                Let&apos;s get to know them better...
            </h1>

            {giftSearch.generationState === "generating_question" &&
                !latestQuestion.data && (
                    <div className="flex gap-2 text-muted-foreground">
                        <Loader className="size-6" />
                        <p>Getting set up...</p>
                    </div>
                )}

            {giftSearch.generationState === "generating_question" &&
                !!latestQuestion.data && (
                    <div className="flex gap-2 text-muted-foreground">
                        <Loader className="size-6" />
                        <p>Thinking...</p>
                    </div>
                )}

            {giftSearch.generationState === "waiting_for_user_answer" &&
                latestQuestion.data && (
                    <Card className="flex w-full max-w-md flex-col gap-2">
                        <CardHeader>
                            <CardTitle>
                                {latestQuestion.data.question.question}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative">
                                <Textarea
                                    placeholder="Your answer"
                                    ref={textareaRef}
                                />
                                <Button
                                    className="absolute right-2 bottom-2"
                                    size="xs"
                                    variant="outline"
                                    onClick={onSubmitAnswer}
                                >
                                    <SendIcon className="size-3" />
                                    Submit
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
        </motion.main>
    );
}
