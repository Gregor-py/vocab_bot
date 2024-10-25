import {useState} from 'react';
import clsx from 'clsx';
import {cn} from "@/lib/utils";
import axios from "axios";
import {Flashcard, FlashcardType} from "@/db/schema";
import {useFlashcardsStore} from "@/app/(main)/set/edit/[id]/useFlashcardsStore";

type Props = {
    type: FlashcardType,
    flashcardId: number;
    isSaving: boolean;
}

export const TypeSwitcher = ({type, flashcardId, isSaving}: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const updateFlashcard = useFlashcardsStore(state => state.updateFlashcard)

    const handleToggle = async () => {
        setIsLoading(true);

        const nextValue = type === "structured" ? "unstructured" : "structured"
        const {flashcard} = await axios.put<{message: string, flashcard: Flashcard}>(`/api/flashcard/change-type/${flashcardId}`, {"type": nextValue})
            .then(response => response.data)

        updateFlashcard(flashcard)

        setIsLoading(false)
    };

    return (
        <div className="flex items-center gap-3">
            <span className={clsx('text-lg font-medium')}>Structured</span>
            <button
                onClick={handleToggle}
                disabled={isLoading || isSaving}
                className={cn(
                    'w-16 h-8 flex items-center rounded-full p-1 transition-colors duration-300',
                    type === 'unstructured' ? 'bg-gray-500' : 'bg-blue-400',
                    isLoading ? 'bg-yellow-400' : ''
                )}
            >
                <div
                    className={cn(
                        'w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300',
                        type === 'unstructured' ? 'translate-x-8' : 'translate-x-0'
                    )}
                />
            </button>
            <span className={clsx('ml-2 text-lg font-medium')}>Unstructured</span>
        </div>
    );
};
