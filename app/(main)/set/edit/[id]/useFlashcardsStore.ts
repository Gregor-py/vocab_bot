import {create} from "zustand/index";
import {flashcards as flashcardsSchema} from "@/db/schema";

type Flashcard = typeof flashcardsSchema.$inferSelect;

type State = {
    flashcards: Flashcard[],
    isLoading: boolean,
    removingFlashcardId: number | null,
}

type Action = {
    updateFlashcards: (flashcards: State['flashcards']) => void,
    updateIsLoading: (isLoading: State['isLoading']) => void,
    updateRemovingFlashcardId: (removingFlashCardId: State['removingFlashcardId']) => void,
    deleteFlashcard: (flashcardId: number) => void,
    addFlashcard: (flashcard: Flashcard) => void,
    updateFlashcard: (flashcard: Flashcard) => void
}

export const useFlashcardsStore = create<State & Action>((set) => ({
    flashcards: [],
    isLoading: false,
    removingFlashcardId: null,
    updateFlashcards: (flashcards) => set(() => ({ flashcards: flashcards })),
    addFlashcard: (flashcard) => set((state) => ({ flashcards: [... state.flashcards, flashcard] })),
    updateIsLoading: (isLoading) => set(() => ({ isLoading })),
    deleteFlashcard: (flashcardId) => set(state => ({flashcards: state.flashcards.filter(flashcard => flashcard.id !== flashcardId)})),
    updateRemovingFlashcardId: (removingFlashCardId) => set(() => ({removingFlashcardId: removingFlashCardId})),
    updateFlashcard: (flashcard) => set((state) => ({
        flashcards: state.flashcards.map(element => {
            if (element.id === flashcard.id) {
                return flashcard
            } else {
                return element
            }
        })
    }))
}))
