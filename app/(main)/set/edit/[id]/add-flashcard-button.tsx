import {Button} from "@/components/ui/button"
import {BadgePlus} from "lucide-react";
import {flashcards} from "@/db/schema";
import axios from "axios";

type Flashcard = typeof flashcards.$inferSelect

type Props = {
    setId: number;
    addNewFlashcard: (flashcard: Flashcard) => void;
    flashcards: Flashcard[];
}

export const AddFlashcardButton = ({setId, addNewFlashcard, flashcards}: Props) => {
    const handleCreate = async () => {
        const flashcard = await axios.post<Flashcard>("/api/flashcard", {setId, order: flashcards.length+1}).then(data => data.data)

        if (!flashcard) {
            return;
        }

        addNewFlashcard(flashcard)
    }

    return (
        <Button onClick={handleCreate} className={"w-full"} size={"lg"}>Add a flashcard  <BadgePlus /></Button>
    )
}