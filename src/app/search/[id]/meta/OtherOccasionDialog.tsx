"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
    occasion: z.string().min(1, "Please enter an occasion"),
});

export default function OtherOccasionDialog({
    onSet,
    ...props
}: ComponentProps<typeof Dialog> & {
    onSet: (occasion: string) => Promise<void> | void;
}) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            occasion: "",
        },
    });

    const onSubmit = form.handleSubmit((data) => {
        return onSet(data.occasion);
    });

    return (
        <Dialog {...props}>
            <DialogContent className="max-w-sm">
                <Form {...form}>
                    <DialogHeader>
                        <DialogTitle>Custom Occasion</DialogTitle>
                        <DialogDescription>
                            Enter an occasion not listed previously
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col">
                        <FormField
                            name="occasion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Occasion</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="E.g. New Job"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            onClick={onSubmit}
                            disabled={!form.formState.isDirty}
                        >
                            {form.formState.isSubmitting && <Loader />}
                            Save
                        </Button>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
