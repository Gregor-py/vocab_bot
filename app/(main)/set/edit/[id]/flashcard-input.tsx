"use client"

import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import axios from "axios";
import {Textarea} from "@/components/ui/textarea";
import {EditorComponent} from "@/components/editor/editor";

type Props = {
    initialValue: string;
    title: string;
    fieldName: string;
    flashcardId: number;
}

export const FlashcardInput = ({initialValue, title, fieldName, flashcardId}: Props) => {
    const [value, setValue] = useState(initialValue)
    const [debouncedValue] = useDebounce(value, 1000);

    const updateFlashcard = () => {
        if (value) {
            axios.put(`/api/flashcard/${flashcardId}`, { [fieldName]: value })
        }
    };

    useEffect(() => {
        updateFlashcard();
    }, [debouncedValue]);

    return (
        <div>
            <EditorComponent
                initialText={initialValue}
                setValue={(value) => setValue(value)}
                className={"py-[5px] text-lg border-0 border-b-white border-b-2"}
            />
            <span>{title}</span>
        </div>
    )
}