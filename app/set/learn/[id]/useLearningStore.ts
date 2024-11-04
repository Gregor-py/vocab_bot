import {create} from "zustand/index";
import {flashcards as flashcardsSchema} from "@/db/schema";
import {CustomEditor} from "@/components/editor/editor-types";

type State = {
    currentCard: number;
}

type Action = {
    updateCurrentCard: (currentCard: State['currentCard']) => void,
}

export const useLearningStore = create<State & Action>((set) => ({
    currentCard: 0,
    updateCurrentCard: (currentCard) => set(() => ({ currentCard })),
}))