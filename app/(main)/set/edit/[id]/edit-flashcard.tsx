"use client"

import {Flashcard} from "@/db/schema";
import {Button} from "@/components/ui/button";
import {Cuboid, FlameIcon, Loader, Trash, WandSparklesIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import axios from "axios";
import {useFlashcardsStore} from "@/app/(main)/set/edit/[id]/useFlashcardsStore";
import {FlashcardInput} from "@/app/(main)/set/edit/[id]/flashcard-input";
import {EditorButtons} from "@/components/editor/editor-buttons";
import {useEditorStore} from "@/components/editor/useEditorStore";
import {useState} from "react";
import AnimateHeight, {Height} from "react-animate-height";

type Props = {
    flashcard: Flashcard;
    arrayId: number;
}

type SavingHash = {
    term: boolean;
    backSide: boolean;
}

export const EditFlashcard = ({flashcard, arrayId}: Props) => {
    const updateRemovingFlashcardId = useFlashcardsStore(state => state.updateRemovingFlashcardId)
    const deleteFlashcard = useFlashcardsStore(state => state.deleteFlashcard)
    const removingFlashcardId = useFlashcardsStore(state => state.removingFlashcardId)
    const isRemoving = removingFlashcardId === flashcard.id
    const [height, setHeight] = useState<Height>("auto")

    const [savingHash, setIsSavingHash] = useState<SavingHash>({
        backSide: false,
        term: false,
    })

    const isSaving = Object.values(savingHash).includes(true)

    const currentEditor = useEditorStore(state => state.currentEditor)

    const onDelete = (flashcardId: number) => {
        updateRemovingFlashcardId(flashcardId)
        setHeight(0)
        axios.delete(`/api/flashcard/${flashcardId}`)
        setTimeout(() => {
            deleteFlashcard(flashcardId)
            updateRemovingFlashcardId(null)
        }, 300)
    }

    return (
        <AnimateHeight height={height} duration={300}>
            <div className={cn("w-full border rounded-2xl pb-4 overflow-hidden max-h-full transition-all duration-500 mt-6", isRemoving ? "opacity-0 mt-0" : "opacity-100")}>
                <div className={"border-b py-3 px-7 flex justify-between items-center"}>
                    <span className={"font-bold flex items-center gap-2"}>{arrayId + 1} <Cuboid /></span>

                    <button
                        className={"flex gap-2 items-center relative group bg-neutral-800 rounded-2xl px-4 py-1 transition-all group-hover:bg-neutral-900"}
                    >
                        <WandSparklesIcon width={20} height={20} className={"group-hover:text-violet-200 transition-colors"}/>
                        <span className={"text-lg group-hover:text-violet-200 transition-colors"}>Fill with AI</span>
                        <FlameIcon
                            width={16}
                            height={16}
                            className={"transition-all duration-500 text-amber-300 absolute left-[50%] opacity-0 top-0 group-hover:-translate-y-2 rotate-90 group-hover:translate-x-7 group-hover:rotate-0 group-hover:opacity-100"}
                        />
                        <FlameIcon
                            width={16}
                            height={16}
                            className={"transition-all duration-500 text-amber-300 absolute left-[50%] rotate-90 opacity-0 top-[50%] group-hover:translate-y-2 group-hover:-translate-x-10 group-hover:rotate-0 group-hover:opacity-100"}
                        />
                    </button>

                    <Loader className={cn("animate-spin transition-all", isSaving ? "opacity-100" : "opacity-0")}/>
                    <EditorButtons editor={currentEditor}/>
                    <Button
                        onClick={() => onDelete(flashcard.id)}
                        variant={"destructive"} size={"icon"}
                        disabled={isRemoving}
                    >
                        <Trash/>
                    </Button>
                </div>

                <div className={"px-7 py-6 flex gap-4"}>
                    <div className={"w-[20%]"}>
                        <FlashcardInput
                            initialValue={flashcard.term || ""}
                            title={"Term"}
                            fieldName={"term"}
                            flashcardId={flashcard.id}
                            setSaving={(state) => setIsSavingHash(prevState => ({...prevState, term: state}))}
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
            </div>
        </AnimateHeight>
    )
}