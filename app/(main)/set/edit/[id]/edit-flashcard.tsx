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

    const [word, setWord] = useState<string>(flashcard.word ? flashcard.word : "");
    const [definition, setDefinition] = useState<string>(flashcard.definition ? flashcard.definition : "");
    const [source, setSource] = useState<string>(flashcard.source ? flashcard.source : "");
    const [examples, setExamples] = useState<string>(flashcard.examples ? flashcard.examples : "");

    const [debouncedWord] = useDebounce(word, 1000);
    const [debouncedDefinition] = useDebounce(definition, 1000);
    const [debouncedSource] = useDebounce(source, 1000);
    const [debouncedExamples] = useDebounce(examples, 1000);

    const updateFlashcard = (field: string, value: string) => {
        if (value) {
            axios.put(`/api/flashcard/${flashcard.id}`, { [field]: value })
                .then(response => {
                    console.log(`${field} updated:`, response.data);
                })
                .catch(error => {
                    console.error(`Error updating ${field}:`, error);
                });
        }
    };

    useEffect(() => {
        updateFlashcard('word', debouncedWord);
    }, [debouncedWord]);

    useEffect(() => {
        updateFlashcard('definition', debouncedDefinition);
    }, [debouncedDefinition]);

    useEffect(() => {
        updateFlashcard('source', debouncedSource);
    }, [debouncedSource]);

    useEffect(() => {
        updateFlashcard('examples', debouncedExamples);
    }, [debouncedExamples]);



    return (
        <div className={cn("transition-all duration-500 w-full border rounded-2xl pb-4", isRemoving ? "opacity-0" : "")}>
            <div className={"border-b py-3 px-7 flex justify-between items-center"}>
                <span className={"font-bold"}>{arrayId+1} | {flashcard.id}</span>
                <TypeSwitcher initialType={flashcard.type} id={flashcard.id} />
                <Button onClick={() => onDelete(flashcard.id)} variant={"destructive"} size={"icon"}><Trash /></Button>
            </div>

            <div className={"px-7 py-6 flex gap-4"}>
                <div className={"w-[35%]"}>
                    <div>
                        <Input
                            value={word}
                            onChange={(e) => setWord(e.target.value)}
                            placeholder={". . ."}
                            className={"placeholder:text-gray-400 rounded-none px-0 border-0 border-b-white border-b-2 focus:border-amber-300 transition-transform"}
                        />
                        <span>Term</span>
                    </div>
                </div>
                <div className={"w-[65%]"}>
                    <div>
                        <Input
                            value={definition}
                            onChange={(e) => setDefinition(e.target.value)}
                            placeholder={". . ."}
                            className={"placeholder:text-gray-400 rounded-none px-0 border-0 border-b-white border-b-2 focus:border-amber-300 transition-transform"}
                        />
                        <span>Definition</span>
                    </div>
                    <div>
                        <Input
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            placeholder={". . ."}
                            className={"placeholder:text-gray-400 rounded-none px-0 border-0 border-b-white border-b-2 focus:border-amber-300 transition-transform"}
                        />
                        <span>Source</span>
                    </div>
                    <div>
                        <Textarea
                            value={examples}
                            onChange={(e) => setExamples(e.target.value)}
                            placeholder={". . ."}
                            className={"placeholder:text-gray-400 rounded-none px-0 border-0 border-b-white border-b-2 focus:border-amber-300 transition-transform"}
                        />
                        <span>Examples</span>
                    </div>
                </div>
            </div>
        </div>
    )
}