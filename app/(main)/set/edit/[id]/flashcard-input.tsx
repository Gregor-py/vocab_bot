"use client"

import {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import axios from "axios";
import {EditorComponent} from "@/components/editor/editor";
import {withHistory} from "slate-history";
import {withReact} from "slate-react";
import {createEditor} from "slate";
import {CustomEditor as CustomEditorType} from "@/components/editor/editor-types"

type Props = {
    initialValue: string;
    title: string;
    fieldName: string;
    flashcardId: number;
    setSaving: (state: boolean) => void;
    onChange?: (value: string) => void;
    editor: CustomEditorType;
}

export const FlashcardInput = ({initialValue, title, fieldName, flashcardId, setSaving, onChange, editor}: Props) => {
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
                <EditorComponent
                    initialText={initialValue}
                    editor={editor}
                    setValue={(value) => {
                        setValue(value)
                        setSaving(true)
                        if (onChange) {
                            onChange(value)
                        }
                    }}
                    className={"py-[5px] text-lg border-0 border-b-white border-b-2"}
                />
                <span className={"text-blue-400"}>{title}</span>
            </div>

        </>
    )
}