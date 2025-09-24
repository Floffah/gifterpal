"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { convexQuery } from "@convex-dev/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~convex/api";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    email: z.email(),
});

export default function Home() {
    const router = useRouter();
    const { signIn } = useAuthActions();
    const currentUserQuery = useQuery(convexQuery(api.user.currentUser, {}));

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        disabled: currentUserQuery.isPending,
    });

    const onSubmit = form.handleSubmit(async (data) => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        await signIn("loops", data);
        setIsSubmitting(false);
        setIsSubmitted(true);
    });

    useEffect(() => {
        router.prefetch("/home");

        if (currentUserQuery.data) {
            router.push("/home");
        }
    }, [currentUserQuery.data, router]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <main className="flex flex-col gap-4">
                <h1 className="text-center text-2xl font-semibold">Login</h1>

                {!isSubmitted && (
                    <Form {...form}>
                        <form
                            onSubmit={onSubmit}
                            className="flex flex-col gap-4"
                        >
                            <FormField
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Enter Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="me@example.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                className="w-full"
                                disabled={
                                    currentUserQuery.isPending || isSubmitting
                                }
                            >
                                Get login link
                                {(isSubmitting ||
                                    currentUserQuery.isPending) && <Loader />}
                            </Button>
                        </form>
                    </Form>
                )}

                {isSubmitted && (
                    <div className="text-center">
                        <p className="mb-2">
                            Check your email for the login link! <br />(
                            {form.getValues().email})
                        </p>
                        <Button
                            variant="link"
                            onClick={() => {
                                setIsSubmitted(false);
                                form.reset();
                            }}
                        >
                            Back
                        </Button>
                    </div>
                )}
            </main>
        </div>
    );
}
