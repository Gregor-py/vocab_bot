import {cn} from "@/lib/utils";
import {ArrowRightToLine} from "lucide-react";
import {getUsersSets} from "@/db/queries";
import Link from "next/link";

const DashboardPage = async () => {
    const sets = await getUsersSets()

    return (
        <div>
            <div className="container mx-auto p-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {sets.map((set) => (
                        <Link href={`/set/edit/${set.id}`} key={set.id}>
                            <div
                                style={{ backgroundColor: set.setTheme.mainBg || "" }}
                                className={cn(
                                    "group py-3 px-4 rounded-3xl shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                                )}
                            >
                                <h2
                                    style={{ color: set.setTheme.mainText || "" }}
                                    className={cn("text-2xl text-white font-semibold")}
                                >
                                    {set.name}
                                </h2>
                                <div className={"text-neutral-100"}>{set.language.name}</div>
                                <div className={cn("flex items-center mt-6 relative max-w-[75%]")}>
                                    <div
                                        style={{ background: set.setTheme.innerBlockBg || "" }}
                                        className={cn(
                                            "flex-1 rounded-xl px-4 py-2 text-sm font-medium shadow-inner transform transition-transform duration-300" +
                                            "group-hover:bg-amber-300 group-hover:translate-x-2"
                                        )}
                                    >
                                        {set.flashcards.length} Flashcards
                                    </div>
                                    <div
                                        style={{ color: set.setTheme.iconColor || "" }}
                                        className={cn(
                                            "flex items-center rounded-r-xl justify-center h-full absolute top-0 right-0 w-[36px] transform transition-transform duration-300 group-hover:translate-x-2"
                                        )}
                                    >
                                        <ArrowRightToLine />
                                    </div>
                                </div>
                            </div>
                        </Link>

                    ))}

                </div>
            </div>

        </div>
    )
}

export default DashboardPage