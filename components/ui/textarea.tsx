import * as React from "react";
import {cn} from "@/lib/utils";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    "flex min-h-[120px] w-full rounded-md border-2 border-green-400/20 bg-transparent px-3 py-2 text-sm",
                    "shadow-[inset_0_0_12px_rgba(74,222,128,0.05)]",
                    "transition-all duration-200",
                    "placeholder:text-green-500/70 placeholder:transition-all placeholder:duration-200",
                    "hover:border-green-400 hover:shadow-[inset_0_0_12px_rgba(74,222,128,0.08)]",
                    "focus:placeholder:-translate-y-1.5 focus:placeholder:opacity-0",
                    "focus-visible:outline-none",
                    "disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none",
                    "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-green-400/20 hover:scrollbar-thumb-green-400/30",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Textarea.displayName = "Textarea"

export { Textarea }