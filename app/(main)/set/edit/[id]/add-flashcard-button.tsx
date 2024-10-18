import { Button } from "@/components/ui/button"
import {BadgePlus} from "lucide-react";
import {flashcards} from "@/db/schema";
import axios from "axios";
import {getFlashcardById} from "@/db/queries";

type Flashcard = typeof flashcards.$inferSelect

type Props = {
    setId: number;
    addNewFlashcard: (flashcard: Flashcard) => void;
}

export const AddFlashcardButton = ({setId, addNewFlashcard}: Props) => {
    const handleCreate = async () => {
        const flashcard = await axios.post<Flashcard>("/api/flashcard", {setId}).then(data => data.data)

        if (!flashcard) {
            return;
        }

        addNewFlashcard(flashcard)
    }

    return (
        <Button onClick={handleCreate} className={"w-full"} size={"lg"}>Add a flashcard  <BadgePlus /></Button>
    )
}