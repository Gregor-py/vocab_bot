import * as React from "react"
import {Slot} from "@radix-ui/react-slot"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-gradient-to-r from-green-400 to-green-500 text-black shadow-lg hover:shadow-green-500/25 hover:from-green-500 hover:to-green-600 active:shadow-inner active:from-green-600 active:to-green-700",
                secondary:
                    "bg-gradient-to-r from-zinc-700 to-zinc-800 text-zinc-100 shadow-lg hover:shadow-zinc-800/25 hover:from-zinc-600 hover:to-zinc-700 active:shadow-inner active:from-zinc-800 active:to-zinc-900",
                outline:
                    "border-2 border-green-400 bg-gradient-to-r from-transparent to-transparent text-green-400 shadow-lg hover:shadow-green-500/25 hover:from-green-400/10 hover:to-green-500/10 active:shadow-inner active:from-green-400/20 active:to-green-500/20",
                ghost:
                    "bg-gradient-to-r from-transparent to-transparent text-green-400 hover:from-green-400/10 hover:to-green-500/10 active:from-green-400/20 active:to-green-500/20",
                destructive:
                    "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-red-500/25 hover:from-red-600 hover:to-red-700 active:shadow-inner active:from-red-700 active:to-red-800",
                link:
                    "bg-gradient-to-r from-transparent to-transparent text-green-400 underline-offset-4 hover:text-green-300 active:text-green-500",
                icon: "bg-default bg-gradient-none bg-gray-900 hover:bg-gray-800"
            },
            size: {
                default: "h-10 px-5 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-12 rounded-md px-8 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({className, variant, size, asChild = false, ...props}, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({variant, size, className}))}
                ref={ref}
                {...props}
            >
            </Comp>
        )
    }
)
Button.displayName = "Button"

export {Button, buttonVariants}
