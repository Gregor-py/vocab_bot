import {create} from "zustand/index";
import {flashcards as flashcardsSchema} from "@/db/schema";
import {CustomEditor} from "@/components/editor/editor-types";

type Flashcard = typeof flashcardsSchema.$inferSelect;

type State = {
    currentEditor: CustomEditor | null,
}

type Action = {
    updateCurrentEditor: (editor: State['currentEditor']) => void,
}

export const useEditorStore = create<State & Action>((set) => ({
    currentEditor: null,
    updateCurrentEditor: (editor) => set(() => ({ currentEditor: editor })),
}))