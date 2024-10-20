import {Button} from "@/components/ui/button"
import {BadgePlus} from "lucide-react";
import {flashcards} from "@/db/schema";
import axios from "axios";
import {useFlashcardsStore} from "@/app/(main)/set/edit/[id]/useFlashcardsStore";

type Flashcard = typeof flashcards.$inferSelect

type Props = {
    setId: number;
}

export const AddFlashcardButton = ({setId}: Props) => {
    const addFlashcard = useFlashcardsStore(state => state.addFlashcard)
    const flashcards = useFlashcardsStore(state => state.flashcards)

    const handleCreate = async () => {
        const flashcard = await axios.post<Flashcard>("/api/flashcard", {setId, order: flashcards.length+1}).then(data => data.data)

        if (!flashcard) {
            return;
        }

        addFlashcard(flashcard)
    }

    return (
        <Button onClick={handleCreate} className={"w-full"} size={"lg"}>Add a flashcard  <BadgePlus /></Button>
    )
}