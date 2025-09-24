import { Loader2Icon } from "lucide-react";
import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export default function Loader({
    className,
    ...props
}: Omit<ComponentProps<typeof Loader2Icon>, "childre ">) {
    return (
        <Loader2Icon
            className={cn("size-4 animate-spin", className)}
            {...props}
        />
    );
}
