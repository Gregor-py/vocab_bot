import {Button} from "@/components/ui/button";
import {CustomEditor} from "@/components/editor/editor-utils";
import React from "react";
import {CustomEditor as CustomEditorType} from "@/components/editor/editor-types";

type Props = {
    editor: CustomEditorType
}

export const EditorButtons = ({editor}: Props) => {
    return (
        <>
            <Button onMouseDown={(event) => {
                event.preventDefault()
                CustomEditor.toggleMarkFormat(editor, "bold")
            }}>
                Bold
            </Button>
            <Button onMouseDown={(event) => {
                event.preventDefault()
                CustomEditor.isHeadingBlockActive(editor)
                CustomEditor.toggleHeadingType(editor)
            }}>
                Heading
            </Button>

            <Button onMouseDown={(event) => {
                event.preventDefault()
                CustomEditor.toggleMarkFormat(editor, "strike")
            }}>
                Strike
            </Button>

            <Button onMouseDown={(event) => {
                event.preventDefault()
                CustomEditor.toggleMarkColor(editor, "purple")
            }}>
                Purple
            </Button>

            <Button onMouseDown={(event) => {
                event.preventDefault()
                CustomEditor.toggleMarkColor(editor, "gold")
            }}>
                Gold
            </Button>

            <Button onMouseDown={(event) => {
                event.preventDefault()
                CustomEditor.toggleMarkColor(editor, "green")
            }}>
                Green
            </Button>

            <Button onMouseDown={(event) => {
                event.preventDefault()
            }}>
                Back
            </Button>
        </>
    )
}