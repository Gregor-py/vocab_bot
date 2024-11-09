import {cn} from "@/lib/utils";

type Props = {
    percent: number;
    bgColor?: string;
}

export const ProgressBar = ({percent, bgColor}: Props) => {
    return (
        <div>
            <div
                style={{width: `${percent}%`}}
                className={cn("h-[2px] transition-all duration-700 ease-in-out", bgColor ? bgColor : "bg-white")}
            />
        </div>
    )
}