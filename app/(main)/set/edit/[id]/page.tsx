import {Input} from "@/components/ui/input";
import {getFlashCardsBySet} from "@/db/queries";
import {EditFlashcard} from "@/app/(main)/set/edit/[id]/edit-flashcard";
import { Button } from "@/components/ui/button";
import {AddFlashcardButton} from "@/app/(main)/set/edit/[id]/add-flashcard-button";
import {EditFlashcardsList} from "@/app/(main)/set/edit/[id]/edit-flashcards-list";

interface SetPageProps {
    params: {
        id: number;
    };
}
const SetEditPage = async ({ params }: SetPageProps) => {
    const flashcards = await getFlashCardsBySet(params.id)

    return (
        <div className={"mt-24"}>
            <h2 className={"text-4xl"}>Edit a new flashcards set</h2>

            <div className={"mt-10"}>
                <Input className={"text-3xl h-14"} placeholder={"Name"} value={"A new set"} />
            </div>

            <EditFlashcardsList initialFlashcards={flashcards} setId={params.id} />
        </div>
    )
}

export default SetEditPage