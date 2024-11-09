import {create} from "zustand/index";

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