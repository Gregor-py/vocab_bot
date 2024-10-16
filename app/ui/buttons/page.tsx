import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ChevronRight, Pencil, Trash, Star } from "lucide-react"

export default function ButtonShowcase() {
    return (
        <div className="flex min-h-screen flex-col items-start gap-8 bg-zinc-950 p-8">
            {/* Default Variants */}
            <div className="space-y-2">
                <h3 className="text-sm font-medium text-zinc-400">Default Buttons</h3>
                <div className="flex flex-wrap gap-4">
                    <button className={buttonVariants()}>
                        Next Card
                        <ChevronRight className="ml-2 h-4 w-4" />
                    </button>
                    <button className={buttonVariants({ size: "sm" })}>Small</button>
                    <button className={buttonVariants({ size: "lg" })}>Large</button>
                    <button className={buttonVariants({ size: "icon" })}>
                        <Star className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Secondary Variants */}
            <div className="space-y-2">
                <h3 className="text-sm font-medium text-zinc-400">Secondary Buttons</h3>
                <div className="flex flex-wrap gap-4">
                    <button className={buttonVariants({ variant: "secondary" })}>
                        Show Answer
                    </button>
                    <button className={buttonVariants({ variant: "secondary", size: "sm" })}>
                        Small
                    </button>
                    <button className={buttonVariants({ variant: "secondary", size: "lg" })}>
                        Large
                    </button>
                </div>
            </div>

            {/* Outline Variants */}
            <div className="space-y-2">
                <h3 className="text-sm font-medium text-zinc-400">Outline Buttons</h3>
                <div className="flex flex-wrap gap-4">
                    <button className={buttonVariants({ variant: "outline" })}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Card
                    </button>
                    <button className={buttonVariants({ variant: "outline", size: "sm" })}>
                        Small
                    </button>
                    <button className={buttonVariants({ variant: "outline", size: "lg" })}>
                        Large
                    </button>
                </div>
            </div>

            {/* Ghost Variants */}
            <div className="space-y-2">
                <h3 className="text-sm font-medium text-zinc-400">Ghost Buttons</h3>
                <div className="flex flex-wrap gap-4">
                    <button className={buttonVariants({ variant: "ghost" })}>
                        Skip Card
                    </button>
                    <button className={buttonVariants({ variant: "ghost", size: "sm" })}>
                        Small
                    </button>
                    <button className={buttonVariants({ variant: "ghost", size: "lg" })}>
                        Large
                    </button>
                </div>
            </div>

            {/* Destructive Variants */}
            <div className="space-y-2">
                <h3 className="text-sm font-medium text-zinc-400">Destructive Buttons</h3>
                <div className="flex flex-wrap gap-4">
                    <button className={buttonVariants({ variant: "destructive" })}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Deck
                    </button>
                    <button className={buttonVariants({ variant: "destructive", size: "sm" })}>
                        Small
                    </button>
                    <button className={buttonVariants({ variant: "destructive", size: "lg" })}>
                        Large
                    </button>
                </div>
            </div>

            {/* Link Variants */}
            <div className="space-y-2">
                <h3 className="text-sm font-medium text-zinc-400">Link Buttons</h3>
                <div className="flex flex-wrap gap-4">
                    <button className={buttonVariants({ variant: "link" })}>
                        View Statistics
                    </button>
                    <button className={buttonVariants({ variant: "link", size: "sm" })}>
                        Small Link
                    </button>
                    <button className={buttonVariants({ variant: "link", size: "lg" })}>
                        Large Link
                    </button>
                </div>
            </div>
        </div>
    )
}