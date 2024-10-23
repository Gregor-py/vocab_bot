"use client"

import React, {useCallback, useState} from 'react'
import {createEditor, Descendant, Editor, Element, Transforms} from 'slate'
import {Editable, RenderElementProps, RenderLeafProps, Slate, withReact} from 'slate-react'
import {
    CustomEditor as CustomEditorType,
    FormatKeys,
    HeadingElement as HeadingElementType,
    ParagraphElement, TextColor
} from "@/components/editor/editor-types";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

const initialValue: Descendant[] = [
    {
        type: 'heading',
        children: [{text: 'A line of text in a paragraph.'}],
    },
    {
        type: 'paragraph',
        children: [{text: 'A line of text in a paragraph.'}],
    },
    {
        type: 'paragraph',
        children: [{text: 'A line of text in a paragraph.'}],
    },
    {
        type: 'paragraph',
        children: [{text: 'A line of text in a paragraph.'}],
    },
    {
        type: 'paragraph',
        children: [{text: 'A line of text in a paragraph.'}],
    },
]

const CustomEditor = {
    checkMarkFormat(editor: CustomEditorType, format: FormatKeys) {
        const marks = Editor.marks(editor)
        return marks ? marks[format] === true : false
    },

    toggleMarkFormat(editor: CustomEditorType, format: FormatKeys) {
        const isActive = CustomEditor.checkMarkFormat(editor, format)
        if (isActive) {
            Editor.removeMark(editor, format)
        } else {
            Editor.addMark(editor, format, true)
        }
    },

    checkMarkColor(editor: CustomEditorType, color: TextColor) {
        const marks = Editor.marks(editor)
        return marks?.color === color
    },

    toggleMarkColor(editor: CustomEditorType, color: TextColor) {
        const isActive = CustomEditor.checkMarkColor(editor, color)
        if (isActive) {
            Editor.removeMark(editor, 'color')
        } else {
            Editor.addMark(editor, 'color', color)
        }
    },

    isHeadingBlockActive(editor: CustomEditorType) {
        const [match] = Editor.nodes(editor, {
            match: (node) =>  Element.isElement(node) && node.type === 'heading'
        })

        console.log(match)

        return !!match
    },

    toggleHeadingType(editor: CustomEditorType) {
        const isActive = CustomEditor.isHeadingBlockActive(editor)
        Transforms.setNodes(
            editor,
            { type: isActive ? undefined : 'heading' },
        )
    },
}

export const EditorComponent = () => {
    const [editor] = useState(() => withReact(createEditor()))

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (!event.ctrlKey) {
            return
        }

        event.preventDefault()

        if (event.ctrlKey && event.key === 'b') {
            CustomEditor.toggleMarkFormat(editor, "bold")
        }

        if (event.ctrlKey && event.key === 'i') {
            CustomEditor.toggleMarkFormat(editor, "italic")
        }

        if (event.ctrlKey && event.key === 'u') {
            CustomEditor.toggleMarkFormat(editor, "underline")
        }
    }

    const renderElement = useCallback((props: RenderElementProps) => {
        switch (props.element.type) {
            case 'heading':
                return <HeadingElement {...props} />
            default:
                return <DefaultElement {...props} />
        }
    }, [])

    const renderLeaf = useCallback((props: RenderLeafProps) => {
        return <Leaf {...props} />
    }, [])

    return (
        <Slate editor={editor} initialValue={initialValue}>
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

            <Editable
                className={"p-5 text-lg"}
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={onKeyDown}
            />
        </Slate>
    )
}

const HeadingElement = (props: RenderElementProps) => {
    return (
        <p className={"text-5xl py-3"} {...props.attributes}>{props.children}</p>
    )
}

const DefaultElement = (props: RenderElementProps) => {
    return <p {...props.attributes}>{props.children}</p>
}

const Leaf = (props: RenderLeafProps) => {
    return (
        <span
            {...props.attributes}
            className={cn(
                props.leaf.bold ? 'font-bold' : 'font-normal',
                props.leaf.italic && 'italic',
                props.leaf.strike && "line-through",
                props.leaf.underline && "underline",
                props.leaf.color === "purple" && "bg-purple-400",
                props.leaf.color === "gold" && "bg-yellow-500",
                props.leaf.color === "green" && "bg-green-700",
            )}
        >
      {props.children}
    </span>
    )
}