"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSignIcon } from "lucide-react";
import { ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
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
    budget: z.coerce
        .number({ error: "Enter a number" })
        .min(1, "Budget must be at least 1"),
});

export default function OtherBudgetDialog({
    onSet,
    ...props
}: ComponentProps<typeof Dialog> & {
    onSet: (budget: number) => Promise<void> | void;
}) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            budget: 50,
        },
    });

    const onSubmit = form.handleSubmit((data) => {
        return onSet(data.budget);
    });

    return (
        <Dialog {...props}>
            <DialogContent className="max-w-sm">
                <Form {...form}>
                    <DialogHeader>
                        <DialogTitle>Custom Budget</DialogTitle>
                        <DialogDescription>
                            Enter an exact number for your budget
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col">
                        <FormField
                            name="budget"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Budget (in your currency)
                                    </FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={1}
                                                placeholder="E.g. 75"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value,
                                                    )
                                                }
                                                className="pl-7"
                                            />
                                        </FormControl>
                                        <DollarSignIcon className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" onClick={onSubmit}>
                            {form.formState.isSubmitting && <Loader />}
                            Save
                        </Button>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
