import { cn } from "@/lib/utils";
import {FlameIcon, LoaderCircle, WandSparklesIcon} from "lucide-react";

type Props = {
    onClick: () => void;
    loading: boolean;
}

export const FillWithAiButton = ({onClick, loading}: Props) => {
    return (
        <button
            className={cn("flex gap-2 items-center relative group bg-neutral-800 rounded-2xl px-4 py-1 transition-all group-hover:bg-neutral-900 active:bg-neutral-700", loading && "bg-neutral-900 active:bg-neutral-900")}
            onClick={onClick}
            disabled={loading}
        >
            {!loading && <WandSparklesIcon width={20} height={20} className={"group-hover:text-violet-200 transition-colors"}/>}
            {loading && <LoaderCircle width={20} height={20} className={"animate-spin"}/>}
            <span className={cn("text-lg group-hover:text-violet-200 transition-colors", loading && "group-hover:text-white")}>Fill with AI</span>
            <FlameIcon
                width={16}
                height={16}
                className={cn("transition-all duration-500 text-amber-300 absolute left-[50%] opacity-0 top-0 group-hover:-translate-y-2 rotate-90 group-hover:translate-x-7 group-hover:rotate-0 group-hover:opacity-100", loading && "group-hover:opacity-0")}
            />
            <FlameIcon
                width={16}
                height={16}
                className={cn("transition-all duration-500 text-amber-300 absolute left-[50%] rotate-90 opacity-0 top-[50%] group-hover:translate-y-2 group-hover:-translate-x-10 group-hover:rotate-0 group-hover:opacity-100", loading && "group-hover:opacity-0")}
            />
        </button>
    )
}