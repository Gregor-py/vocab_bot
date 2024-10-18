import {Input} from "@/components/ui/input";
import {getFlashcardsBySet, getSetById} from "@/db/queries";
import {EditFlashcard} from "@/app/(main)/set/edit/[id]/edit-flashcard";
import { Button } from "@/components/ui/button";
import {AddFlashcardButton} from "@/app/(main)/set/edit/[id]/add-flashcard-button";
import {EditFlashcardsList} from "@/app/(main)/set/edit/[id]/edit-flashcards-list";
import {SetTitle} from "@/app/(main)/set/edit/[id]/set-title";
import {redirect} from "next/navigation";

interface SetPageProps {
    params: {
        id: number;
    };
}
const SetEditPage = async ({ params }: SetPageProps) => {
    const flashcards = await getFlashcardsBySet(params.id)
    const set = await getSetById(params.id)

    if (!set) {
        redirect("/")
    }

    return (
        <div className={"mt-4"}>
            <h2 className={"text-4xl"}>Edit a new flashcards set</h2>

            <div className={"mt-3"}>
                <SetTitle set={set} />
            </div>

            <EditFlashcardsList initialFlashcards={flashcards} setId={params.id} />
        </div>
    )
}

export default SetEditPage