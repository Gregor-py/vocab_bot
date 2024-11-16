import {FlameIcon, WandSparklesIcon} from "lucide-react";

type Props = {
    onClick: () => void;
}

export const FillWithAiButton = ({onClick}: Props) => {
    return (
        <button
            className={"flex gap-2 items-center relative group bg-neutral-800 rounded-2xl px-4 py-1 transition-all group-hover:bg-neutral-900 active:bg-neutral-700"}
            onClick={onClick}
        >
            <WandSparklesIcon width={20} height={20} className={"group-hover:text-violet-200 transition-colors"}/>
            <span className={"text-lg group-hover:text-violet-200 transition-colors"}>Fill with AI</span>
            <FlameIcon
                width={16}
                height={16}
                className={"transition-all duration-500 text-amber-300 absolute left-[50%] opacity-0 top-0 group-hover:-translate-y-2 rotate-90 group-hover:translate-x-7 group-hover:rotate-0 group-hover:opacity-100"}
            />
            <FlameIcon
                width={16}
                height={16}
                className={"transition-all duration-500 text-amber-300 absolute left-[50%] rotate-90 opacity-0 top-[50%] group-hover:translate-y-2 group-hover:-translate-x-10 group-hover:rotate-0 group-hover:opacity-100"}
            />
        </button>
    )
}