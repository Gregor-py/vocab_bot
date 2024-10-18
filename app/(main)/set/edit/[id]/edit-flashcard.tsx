import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {flashcards} from "@/db/schema";

type Props = {
    flashcard: typeof flashcards.$inferSelect;
    id: number;
}

export const EditFlashcard = ({flashcard, id}: Props) => {
    return (
        <div className={"w-full border rounded-2xl pb-4"}>
            <div className={"border-b py-3 px-7 "}>
                <span className={"font-bold"}>{id+1}</span>
            </div>

            <div className={"px-7 py-6 flex gap-4"}>
                <div className={"w-[35%]"}>
                    <div>
                        <Input placeholder={". . ."}
                               className={"placeholder:text-gray-400 rounded-none px-0 border-0 border-b-white border-b-2 focus:border-amber-300 transition-transform"}/>
                        <span>Term</span>
                    </div>
                </div>
                <div className={"w-[65%]"}>
                    <div>
                        <Input placeholder={". . ."}
                               className={"placeholder:text-gray-400 rounded-none px-0 border-0 border-b-white border-b-2 focus:border-amber-300 transition-transform"}/>
                        <span>Definition</span>
                    </div>
                    <div>
                        <Input placeholder={". . ."}
                               className={"placeholder:text-gray-400 rounded-none px-0 border-0 border-b-white border-b-2 focus:border-amber-300 transition-transform"}/>
                        <span>Source</span>
                    </div>
                    <div>
                        <Textarea placeholder={". . ."}
                                  className={"placeholder:text-gray-400 rounded-none px-0 border-0 border-b-white border-b-2 focus:border-amber-300 transition-transform"}/>
                        <span>Examples</span>
                    </div>
                </div>
            </div>
        </div>
    )
}