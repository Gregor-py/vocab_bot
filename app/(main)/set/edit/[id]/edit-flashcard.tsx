"use client"

import {Flashcard} from "@/db/schema";
import {Button} from "@/components/ui/button";
import {Cuboid, Loader, Trash} from "lucide-react";
import {cleanHtml, cn} from "@/lib/utils";
import axios from "axios";
import {useFlashcardsStore} from "@/app/(main)/set/edit/[id]/useFlashcardsStore";
import {FlashcardInput} from "@/app/(main)/set/edit/[id]/flashcard-input";
import {EditorButtons} from "@/components/editor/editor-buttons";
import {useEditorStore} from "@/components/editor/useEditorStore";
import {useState} from "react";
import AnimateHeight, {Height} from "react-animate-height";
import {FillWithAiButton} from "@/app/(main)/set/edit/[id]/fill-with-ai-button";
import {toast} from "@/hooks/use-toast";
import {withHistory} from "slate-history";
import {withReact} from "slate-react";
import {createEditor} from "slate";
import {CustomEditor} from "@/components/editor/editor-utils";

type Props = {
    flashcard: Flashcard;
    arrayId: number;
    language: string;
}

type SavingHash = {
    term: boolean;
    backSide: boolean;
}

export const EditFlashcard = ({flashcard, arrayId, language}: Props) => {
    const updateRemovingFlashcardId = useFlashcardsStore(state => state.updateRemovingFlashcardId)
    const deleteFlashcard = useFlashcardsStore(state => state.deleteFlashcard)
    const removingFlashcardId = useFlashcardsStore(state => state.removingFlashcardId)
    const isRemoving = removingFlashcardId === flashcard.id
    const [height, setHeight] = useState<Height>("auto")

    const [termEditor] = useState(() => withHistory(withReact(createEditor())))
    const [backSideEditor] = useState(() => withHistory(withReact(createEditor())))

    const [initialBacksideValue, setInitialBacksideValue] = useState(flashcard.backSide || "")

    const [term, setTerm] = useState(flashcard.term || "")

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

    const onFillWithAi = () => {
        const cleanedTerm = cleanHtml(term)

        if (!cleanedTerm) {
            toast({
                title: "There is no term",
                description: "Write the term down",
            })
            return
        }

        axios.put(`/api/ai/card-fill`, {language: language, term: cleanedTerm})
            .then((response) => {
                const {backSide} = response.data

                console.log(response.data)

                if (!backSide) {
                    toast({
                        title: "Error",
                        description: "Write the term down",
                    })
                }

                console.log(backSide)

                CustomEditor.putText(backSideEditor, backSide)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <AnimateHeight height={height} duration={300}>
            <div
                className={cn("w-full border rounded-2xl pb-4 overflow-hidden max-h-full transition-all duration-500 mt-6", isRemoving ? "opacity-0 mt-0" : "opacity-100")}>
                <div className={"border-b py-3 px-7 flex justify-between items-center"}>
                    <span className={"font-bold flex items-center gap-2"}>{arrayId + 1} <Cuboid/></span>

                    <FillWithAiButton onClick={onFillWithAi}/>

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
                            editor={termEditor}
                            initialValue={flashcard.term || ""}
                            title={"Term"}
                            fieldName={"term"}
                            flashcardId={flashcard.id}
                            setSaving={(state) => setIsSavingHash(prevState => ({...prevState, term: state}))}
                            onChange={(value) => setTerm(value)}
                        />
                    </div>
                    <div className={"w-[80%]"}>
                        <FlashcardInput
                            editor={backSideEditor}
                            initialValue={initialBacksideValue}
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