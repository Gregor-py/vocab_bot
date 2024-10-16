// input.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-md border-2 border-green-400/50 bg-transparent px-3 py-1 text-sm",
                    "shadow-[inset_0_0_12px_rgba(74,222,128,0.05)]",
                    "transition-all duration-200",
                    "placeholder:text-green-500/50 placeholder:transition-all placeholder:duration-200",
                    "hover:border-green-400/30 hover:shadow-[inset_0_0_12px_rgba(74,222,128,0.08)]",
                    "focus:border-green-400/40 focus:shadow-[inset_0_0_12px_rgba(74,222,128,0.1)]",
                    "focus:placeholder:-translate-y-1 focus:placeholder:opacity-0",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-500/50",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }