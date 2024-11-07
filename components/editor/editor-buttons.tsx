import {Button} from "@/components/ui/button";
import {CustomEditor} from "@/components/editor/editor-utils";
import React from "react";
import {CustomEditor as CustomEditorType, TextColor} from "@/components/editor/editor-types";
import {BoldIcon, Paintbrush, RemoveFormatting, Strikethrough} from "lucide-react";
import {cn} from "@/lib/utils";

type Props = {
    editor: CustomEditorType | null;
}

type Color = {
    value: TextColor;
    color: string;
    hover: string;
}

export const EditorButtons = ({editor}: Props) => {
    const colors: Color[] = [
        {
            value: "green",
            color: "bg-green-700",
            hover: "hover:bg-green-700/60"
        },
        {
            value: "gold",
            color: "bg-yellow-500",
            hover: "hover:bg-yellow-500/60"
        },
        {
            value: "purple",
            color: "bg-purple-400",
            hover: "hover:bg-purple-400/60"
        }
    ]

    return (
        <div className={"flex gap-1"}>
            <Button
                variant={"icon"}
                size={"icon"}
                onMouseDown={(event) => {
                    event.preventDefault()
                    if (!editor) return;
                    CustomEditor.removeAllFormating(editor)
                }}
            >
                <RemoveFormatting />
            </Button>
            <Button
                variant={"icon"}
                size={"icon"}
                onMouseDown={(event) => {
                    event.preventDefault()
                    if (!editor) return;
                    CustomEditor.toggleMarkFormat(editor, "bold")
                }}
            >
                <BoldIcon/>
            </Button>

            <Button
                variant={"icon"}
                size={"icon"}
                onMouseDown={(event) => {
                    event.preventDefault()
                    if (!editor) return;
                    CustomEditor.toggleMarkFormat(editor, "strike")
                }}
            >
                <Strikethrough/>
            </Button>

            {colors.map((color) => (
                <Button
                    key={color.value}
                    variant={"icon"}
                    className={cn(color.color, color.hover)}
                    size={"icon"}
                    onMouseDown={(event) => {
                        event.preventDefault()
                        if (!editor) return;
                        CustomEditor.toggleMarkColor(editor, color.value)
                    }}
                >
                    <Paintbrush/>
                </Button>
            ))}
        </div>
    )
}