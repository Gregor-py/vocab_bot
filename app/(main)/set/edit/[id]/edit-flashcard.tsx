"use client"

import {Flashcard} from "@/db/schema";
import {Button} from "@/components/ui/button";
import {Loader, Trash} from "lucide-react";
import {cn} from "@/lib/utils";
import axios from "axios";
import {TypeSwitcher} from "@/app/(main)/set/edit/[id]/type-switcher";
import {useFlashcardsStore} from "@/app/(main)/set/edit/[id]/useFlashcardsStore";
import {FlashcardInput} from "@/app/(main)/set/edit/[id]/flashcard-input";
import {EditorButtons} from "@/components/editor/editor-buttons";
import {useEditorStore} from "@/components/editor/useEditorStore";
import {useState} from "react";

type Props = {
    flashcard: Flashcard;
    arrayId: number;
}

type SavingHash = {
    word: boolean;
    definition: boolean;
    source: boolean;
    examples: boolean;
    frontSide: boolean;
    backSide: boolean;
}

export const EditFlashcard = ({flashcard, arrayId}: Props) => {
    const updateRemovingFlashcardId = useFlashcardsStore(state => state.updateRemovingFlashcardId)
    const deleteFlashcard = useFlashcardsStore(state => state.deleteFlashcard)
    const removingFlashcardId = useFlashcardsStore(state => state.removingFlashcardId)
    const isRemoving = removingFlashcardId === flashcard.id

    const [savingHash, setIsSavingHash] = useState<SavingHash>({
        backSide: false,
        definition: false,
        frontSide: false,
        examples: false,
        source: false,
        word: false
    })

    const isSaving = Object.values(savingHash).includes(true)

    const currentEditor = useEditorStore(state => state.currentEditor)

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
                <span className={"font-bold"}>{arrayId + 1} | {flashcard.id}</span>
                <Loader className={cn("animate-spin transition-all", isSaving ? "opacity-100" : "opacity-0")}/>
                <TypeSwitcher isSaving={isSaving} type={flashcard.type} flashcardId={flashcard.id}/>
                <EditorButtons editor={currentEditor}/>
                <Button onClick={() => onDelete(flashcard.id)} variant={"destructive"} size={"icon"}><Trash/></Button>
            </div>

            {flashcard.type === "structured" && <>
                <div className={"px-7 py-6 flex gap-4"}>
                    <div className={"w-[35%]"}>
                        <FlashcardInput
                            initialValue={flashcard.word || ""}
                            title={"Word"}
                            fieldName={"word"}
                            flashcardId={flashcard.id}
                            setSaving={(state) => setIsSavingHash(prevState => ({...prevState, word: state}))}
                        />
                    </div>
                    <div className={"w-[65%]"}>
                        <FlashcardInput
                            initialValue={flashcard.definition || ""}
                            title={"Definition"}
                            fieldName={"definition"}
                            flashcardId={flashcard.id}
                            setSaving={(state) => setIsSavingHash(prevState => ({...prevState, definition: state}))}
                        />
                        <FlashcardInput
                            initialValue={flashcard.source || ""}
                            title={"Source"}
                            fieldName={"source"}
                            flashcardId={flashcard.id}
                            setSaving={(state) => setIsSavingHash(prevState => ({...prevState, source: state}))}
                        />
                        <FlashcardInput
                            initialValue={flashcard.examples || ""}
                            title={"Examples"}
                            fieldName={"examples"}
                            flashcardId={flashcard.id}
                            setSaving={(state) => setIsSavingHash(prevState => ({...prevState, examples: state}))}
                        />
                    </div>
                </div>
            </>}

            {flashcard.type === "unstructured" && <>
                <div className={"px-7 py-6 flex gap-4"}>
                    <div className={"w-[20%]"}>
                        <FlashcardInput
                            initialValue={flashcard.frontSide || ""}
                            title={"Front side"}
                            fieldName={"frontSide"}
                            flashcardId={flashcard.id}
                            setSaving={(state) => setIsSavingHash(prevState => ({...prevState, frontSide: state}))}
                        />
                    </div>
                    <div className={"w-[80%]"}>
                        <FlashcardInput
                            initialValue={flashcard.backSide || ""}
                            title={"Back side"}
                            fieldName={"backSide"}
                            flashcardId={flashcard.id}
                            setSaving={(state) => setIsSavingHash(prevState => ({...prevState, backSide: state}))}
                        />
                    </div>
                </div>
            </>}
        </div>
    )
}