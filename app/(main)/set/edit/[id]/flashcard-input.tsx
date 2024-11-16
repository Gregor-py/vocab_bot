"use client"

import {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import axios from "axios";
import {EditorComponent} from "@/components/editor/editor";
import {withHistory} from "slate-history";
import {withReact} from "slate-react";
import {createEditor} from "slate";
import {CustomEditor as CustomEditorType} from "@/components/editor/editor-types"
import {LoaderCircle} from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
    initialValue: string;
    title: string;
    fieldName: string;
    flashcardId: number;
    setSaving: (state: boolean) => void;
    onChange?: (value: string) => void;
    editor: CustomEditorType;
    loading?: boolean
}

export const FlashcardInput = ({initialValue, title, fieldName, flashcardId, setSaving, onChange, editor, loading = false}: Props) => {
    const [value, setValue] = useState(initialValue)
    const [debouncedValue] = useDebounce(value, 1000);

    const updateFlashcard = () => {
        if (value) {
            axios.put(`/api/flashcard/${flashcardId}`, {[fieldName]: value}).then(() => {
                setSaving(false)
            })
        }
    }

    useEffect(() => {
        updateFlashcard();
    }, [debouncedValue]);

    return (
        <>
            <div>
                <div className={"relative"}>
                   <div className={cn("absolute w-full h-full bg-black/70 opacity-0 -z-40 bottom-0 left-0 flex items-center justify-center transition-all", loading && "z-40 opacity-100")}>
                        <LoaderCircle width={30} height={30} className={"animate-spin"}/>
                    </div>
                    <EditorComponent
                        initialText={initialValue}
                        editor={editor}
                        readonly={loading}
                        setValue={(value) => {
                            setValue(value)
                            setSaving(true)
                            if (onChange) {
                                onChange(value)
                            }
                        }}
                        className={"py-[5px] text-lg border-0 border-b-white border-b-2"}
                    />
                </div>
                <span className={"text-blue-400"}>{title}</span>
            </div>

        </>
    )
}