"use client"
import {EditFlashcard} from "@/app/(main)/set/edit/[id]/edit-flashcard";
import {AddFlashcardButton} from "@/app/(main)/set/edit/[id]/add-flashcard-button";
import {useEffect} from "react";
import axios from "axios";
import {Flashcard} from "@/db/schema";
import {useFlashcardsStore} from "@/app/(main)/set/edit/[id]/useFlashcardsStore";

type Props = {
    setId: number;
}


export const EditFlashcardsList = ({setId}: Props) => {
    const updateFlashcards = useFlashcardsStore(state => state.updateFlashcards)
    const updateIsLoading = useFlashcardsStore(state => state.updateIsLoading)

    const flashcards = useFlashcardsStore(state => state.flashcards)
    const isLoading = useFlashcardsStore(state => state.isLoading)


    useEffect(() => {
        if (!setId) {
            return
        }

        updateIsLoading(true)

        axios.get<{initialFlashcards: Flashcard[]}>(`/api/set/flashcards/${setId}`).then(response => {
            updateFlashcards(response.data.initialFlashcards)
            updateIsLoading(false)
        })

    }, [setId]);

    if (isLoading) {
        return (<div>Loading...</div>)
    }

    return (
        <div>
            <div className={"flex flex-col gap-4 mt-10"}>

                {flashcards.map((flashcard, id) => (
                    <EditFlashcard key={flashcard.id} flashcard={flashcard} arrayId={id} />
                ))}

            </div>

            <div className={"py-6"}>
                <AddFlashcardButton setId={setId}/>
            </div>
        </div>
    )
}