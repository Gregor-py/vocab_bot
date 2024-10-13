import {cn} from "@/lib/utils";
import {ArrowRightToLine} from "lucide-react";
import {getUsersSets} from "@/db/queries";

const DashboardPage = async () => {
    const sets = await getUsersSets()

    return (
        <div>
            <div className="container mx-auto p-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {sets.map((set) => (
                        <div key={Math.random()} className={cn("py-9 px-12 rounded-3xl shadow-md", set.setTheme.mainBg)}>
                            <h2 className={cn("text-2xl text-white font-semibold", set.setTheme.mainText)}>{set.name}</h2>
                            <div className={"text-neutral-100"}>2 days ago, German</div>
                            <div className={cn("flex items-center mt-6 relative ")}>
                                <div className={cn(set.setTheme.innerBlockBg, set.setTheme.innerBlockBg, "flex-1 rounded-xl px-4 py-2 text-sm font-medium shadow-inner")}>{set.flashcards.length} Flashcards</div>
                                <div className={cn(set.setTheme.iconColor, set.setTheme.iconBgColor, "flex items-center rounded-r-xl justify-center h-full absolute top-0 right-0 w-[36px]")}><ArrowRightToLine/></div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    )
}

export default DashboardPage