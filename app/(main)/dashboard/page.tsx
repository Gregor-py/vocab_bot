import {cn} from "@/lib/utils";
import {ArrowRightToLine} from "lucide-react";

const DashboardPage = () => {
    const sets = [
        {
            title: "Daily Conversation",
            cardsLength: 14,
            theme: {
                mainText: "text-white",
                mainBg: "bg-blue-600",
                blockBg: "bg-amber-200",
                iconColor: "text-neutral-100",
                blockText: "text-blue-800",
                iconBgColor: "bg-cyan-600"
            }
        },
        {
            title: "Daily Conversation",
            cardsLength: 14,
            theme: {
                mainText: "text-white",
                mainBg: "bg-blue-600",
                blockBg: "bg-amber-200",
                iconColor: "text-neutral-100",
                blockText: "text-blue-800",
                iconBgColor: "bg-cyan-600"
            }
        },
        {
            title: "Daily Conversation",
            cardsLength: 14,
            theme: {
                mainText: "text-white",
                mainBg: "bg-blue-600",
                blockBg: "bg-amber-200",
                iconColor: "text-neutral-100",
                blockText: "text-blue-800",
                iconBgColor: "bg-cyan-600"
            }
        },{
            title: "Daily Conversation",
            cardsLength: 14,
            theme: {
                mainText: "text-white",
                mainBg: "bg-blue-600",
                blockBg: "bg-amber-200",
                iconColor: "text-neutral-100",
                blockText: "text-blue-800",
                iconBgColor: "bg-cyan-600"
            }
        }

    ]

    return (
        <div>
            <div className="container mx-auto p-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {sets.map((set) => (
                        <div key={Math.random()} className={cn("py-9 px-12 rounded-3xl shadow-md", set.theme.mainBg)}>
                            <h2 className={cn("text-2xl text-white font-semibold", set.theme.mainText)}>{set.title}</h2>
                            <div className={"text-neutral-100"}>2 days ago, German</div>
                            <div className={cn("flex items-center mt-6 relative ")}>
                                <div className={cn(set.theme.blockBg, set.theme.blockText, "flex-1 rounded-xl px-4 py-2 text-sm font-medium shadow-inner")}>{set.cardsLength} Flashcards</div>
                                <div className={cn(set.theme.iconColor, set.theme.iconBgColor, "flex items-center rounded-r-xl justify-center h-full absolute top-0 right-0 w-[36px]")}><ArrowRightToLine/></div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    )
}

export default DashboardPage