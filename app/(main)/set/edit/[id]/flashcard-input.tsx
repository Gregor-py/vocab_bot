"use client"

import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import axios from "axios";
import {Textarea} from "@/components/ui/textarea";

type Props = {
    initialValue: string;
    title: string;
    fieldName: string;
    flashcardId: number;
    type?: "input" | "textarea"
}

export const FlashcardInput = ({initialValue, title, fieldName, flashcardId, type="input"}: Props) => {
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
            {type === "input" ?
                <>
                    <Input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={". . ."}
                        className={"placeholder:text-gray-400 rounded-none px-0 border-0 border-b-white border-b-2 focus:border-amber-300 transition-transform"}
                    />
                </>
                : <>
                    <Textarea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={". . ."}
                        className={"placeholder:text-gray-400 rounded-none px-0 border-0 border-b-white border-b-2 focus:border-amber-300 transition-transform"}
                    />
                </>
            }
            <span>{title}</span>
        </div>
    )
}