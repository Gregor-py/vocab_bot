"use client"
import {flashcards as flashcardsSchema}  from "@/db/schema";
import {useState} from "react";
import {EditFlashcard} from "@/app/(main)/set/edit/[id]/edit-flashcard";
import {AddFlashcardButton} from "@/app/(main)/set/edit/[id]/add-flashcard-button";
import axios from "axios";

type Flashcard = typeof flashcardsSchema.$inferSelect;

type Props = {
    initialFlashcards: Flashcard[];
    setId: number;
}

export const EditFlashcardsList = ({initialFlashcards, setId}: Props) => {
    const [flashcards, setFlashcards] = useState<Flashcard[]>(initialFlashcards)
    const [removingFlashcardId, setRemovingFlashcardId] = useState<null | number>();

    const addNewFlashcard = (newFlashcard: Flashcard) => {
        setFlashcards((prevState) => [...prevState, newFlashcard])
    }

    const deleteFlashcard = (id: number) => {
        setRemovingFlashcardId(id)
        axios.delete(`/api/flashcard/${id}`)

        setTimeout(() => {
            setFlashcards((prevState) => prevState.filter(el => el.id !== id))
        }, 500)
    }

    return (
        <div>
            <div className={"flex flex-col gap-4 mt-10"}>

                {flashcards.map((flashcard, id) => (
                    <EditFlashcard isRemoving={removingFlashcardId === flashcard.id} onDelete={deleteFlashcard} key={flashcard.id} flashcard={flashcard} id={id} />
                ))}

            </div>

            <div className={"py-6"}>
                <AddFlashcardButton flashcards={flashcards} setId={setId} addNewFlashcard={addNewFlashcard}/>
            </div>
        </div>
    )
}