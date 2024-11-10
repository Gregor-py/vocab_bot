"use client"
import {EditFlashcard} from "@/app/(main)/set/edit/[id]/edit-flashcard";
import {AddFlashcardButton} from "@/app/(main)/set/edit/[id]/add-flashcard-button";
import {useEffect, useState} from "react";
import axios from "axios";
import {Flashcard} from "@/db/schema";
import {useFlashcardsStore} from "@/app/(main)/set/edit/[id]/useFlashcardsStore";
import Skeleton from "react-loading-skeleton";


type Props = {
    setId: number;
}


export const FlashcardsList = ({setId}: Props) => {
    const updateFlashcards = useFlashcardsStore(state => state.updateFlashcards)
    const updateIsLoading = useFlashcardsStore(state => state.updateIsLoading)
    const creatingFlashcardsCount = useFlashcardsStore(state => state.creatingFlashcardsCount)


    const flashcards = useFlashcardsStore(state => state.flashcards)
    const isLoading = useFlashcardsStore(state => state.isLoading)


    useEffect(() => {
        if (!setId) {
            return;
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
            <div className={"flex flex-col"}>

                {flashcards.map((flashcard, id) => (
                    <EditFlashcard key={flashcard.id} flashcard={flashcard} arrayId={id} />
                ))}

                {[...Array(creatingFlashcardsCount).keys()].map((_, index) => (
                    <div key={index} className={"rounded-3xl overflow-hidden mt-6"}>
                        <Skeleton height={190}/>
                    </div>
                ))}

            </div>

            <div className={"py-6"}>
                <AddFlashcardButton setId={setId}/>
            </div>
        </div>
    )
}