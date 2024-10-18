"use client"
import {flashcards as flashcardsSchema}  from "@/db/schema";
import {useState} from "react";
import {EditFlashcard} from "@/app/(main)/set/edit/[id]/edit-flashcard";
import {AddFlashcardButton} from "@/app/(main)/set/edit/[id]/add-flashcard-button";

type Flashcard = typeof flashcardsSchema.$inferSelect;

type Props = {
    initialFlashcards: Flashcard[];
    setId: number;
}

export const EditFlashcardsList = ({initialFlashcards, setId}: Props) => {
    const [flashcards, setFlashcards] = useState<Flashcard[]>(initialFlashcards)

    const addNewFlashcard = (newFlashcard: Flashcard) => {
        setFlashcards((prevState) => [...prevState, newFlashcard])
    }

    return (
        <div>
            <div className={"flex flex-col gap-4 mt-10"}>

                {flashcards.map((flashcard, id) => (
                    <EditFlashcard key={flashcard.id} flashcard={flashcard} id={id} />
                ))}

            </div>

            <div className={"pt-6"}>
                <AddFlashcardButton setId={setId} addNewFlashcard={addNewFlashcard}/>
            </div>
        </div>
    )
}