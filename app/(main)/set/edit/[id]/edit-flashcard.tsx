"use client"

import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Flashcard} from "@/db/schema";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import {cn} from "@/lib/utils";
import {useEffect, useState} from "react";
import axios from "axios";
import {useDebounce} from "use-debounce";
import {TypeSwitcher} from "@/app/(main)/set/edit/[id]/type-switcher";
import {useFlashcardsStore} from "@/app/(main)/set/edit/[id]/useFlashcardsStore";
import {FlashcardInput} from "@/app/(main)/set/edit/[id]/flashcard-input";

type Props = {
    flashcard: Flashcard;
    arrayId: number;
}

export const EditFlashcard = ({flashcard, arrayId}: Props) => {
    const updateRemovingFlashcardId = useFlashcardsStore(state => state.updateRemovingFlashcardId)
    const deleteFlashcard = useFlashcardsStore(state => state.deleteFlashcard)
    const removingFlashcardId = useFlashcardsStore(state => state.removingFlashcardId)
    const isRemoving = removingFlashcardId === flashcard.id

    const onDelete = (flashcardId: number) => {
        updateRemovingFlashcardId(flashcardId)
        axios.delete(`/api/flashcard/${flashcardId}`)

        setTimeout(() => {
            deleteFlashcard(flashcardId)
            updateRemovingFlashcardId(null)
        }, 500)
    }

    return (
        <div className={cn("transition-all duration-500 w-full border rounded-2xl pb-4", isRemoving ? "opacity-0" : "")}>
            <div className={"border-b py-3 px-7 flex justify-between items-center"}>
                <span className={"font-bold"}>{arrayId+1} | {flashcard.id}</span>
                <TypeSwitcher type={flashcard.type} flashcardId={flashcard.id} />
                <Button onClick={() => onDelete(flashcard.id)} variant={"destructive"} size={"icon"}><Trash /></Button>
            </div>

            <div className={"px-7 py-6 flex gap-4"}>
                <div className={"w-[35%]"}>
                    <FlashcardInput
                        initialValue={flashcard.word || ""}
                        title={"Word"}
                        fieldName={"word"}
                        flashcardId={flashcard.id}
                    />
                </div>
                <div className={"w-[65%]"}>
                    <FlashcardInput
                        initialValue={flashcard.definition || ""}
                        title={"Definition"}
                        fieldName={"definition"}
                        flashcardId={flashcard.id}
                    />
                    <FlashcardInput
                        initialValue={flashcard.source || ""}
                        title={"Source"}
                        fieldName={"source"}
                        flashcardId={flashcard.id}
                    />
                    <FlashcardInput
                        initialValue={flashcard.examples || ""}
                        title={"Examples"}
                        fieldName={"examples"}
                        flashcardId={flashcard.id}
                        type={"textarea"}
                    />
                </div>
            </div>
        </div>
    )
}