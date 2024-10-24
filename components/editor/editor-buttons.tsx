import {Button} from "@/components/ui/button";
import {CustomEditor} from "@/components/editor/editor-utils";
import React from "react";
import {CustomEditor as CustomEditorType} from "@/components/editor/editor-types";

type Props = {
    editor: CustomEditorType | null;
}

export const EditorButtons = ({editor}: Props) => {
    return (
        <div className={"bg-amber-300 z-20"}>
            <Button onMouseDown={(event) => {
                event.preventDefault()

                if (!editor) return;

                CustomEditor.toggleMarkFormat(editor, "bold")
            }}>
                Bold
            </Button>
            <Button onMouseDown={(event) => {
                event.preventDefault()
                if (!editor) return;
                CustomEditor.isHeadingBlockActive(editor)
                CustomEditor.toggleHeadingType(editor)
            }}>
                Heading
            </Button>

            <Button onMouseDown={(event) => {
                event.preventDefault()
                if (!editor) return;
                CustomEditor.toggleMarkFormat(editor, "strike")
            }}>
                Strike
            </Button>

            <Button onMouseDown={(event) => {
                event.preventDefault()
                if (!editor) return;
                CustomEditor.toggleMarkColor(editor, "purple")
            }}>
                Purple
            </Button>

            <Button onMouseDown={(event) => {
                event.preventDefault()
                if (!editor) return;
                CustomEditor.toggleMarkColor(editor, "gold")
            }}>
                Gold
            </Button>

            <Button onMouseDown={(event) => {
                event.preventDefault()
                if (!editor) return;
                CustomEditor.toggleMarkColor(editor, "green")
            }}>
                Green
            </Button>
        </div>
    )
}