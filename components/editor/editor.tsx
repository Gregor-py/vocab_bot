"use client"

import React, {useCallback, useMemo, useState} from 'react'
import {createEditor, Descendant} from 'slate'
import {Editable, RenderElementProps, RenderLeafProps, Slate, withReact} from 'slate-react'
import {cn} from "@/lib/utils";
import {withHistory} from "slate-history";
import {CustomEditor, deserialize, serialize} from './editor-utils';
import {useEditorStore} from "@/components/editor/useEditorStore";

type Props = {
    className?: string,
    setValue?: (value: string) => void,
    initialText?: string
}

export const EditorComponent = ({className, setValue, initialText}: Props) => {
    const initialValue = useMemo(() => {
        return initialText ? deserialize(initialText) : [{ type: 'paragraph', children: [{ text: '' }] }] as Descendant[];
    }, []);

    const [editor] = useState(() => withHistory(withReact(createEditor())))
    const updateCurrentEditor = useEditorStore(state => state.updateCurrentEditor)

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
        if (props.element.type === 'heading') {
            return <HeadingElement {...props} />
        } else {
            return <DefaultElement {...props} />
        }
    }, [])

    const renderLeaf = useCallback((props: RenderLeafProps) => {
        return <Leaf {...props} />
    }, [])

    const handleChange = (value: Descendant[]) => {
        const isAstChange = editor.operations.some((op) => op.type !== 'set_selection');
        if (isAstChange) {
            const content = serialize(value);
            if (setValue) {
                setValue(content)
            }
        }
    }

    return (
        <div className={className}>
            <Slate
                editor={editor}
                initialValue={initialValue}
                onChange={handleChange}
            >
                <Editable
                    className={"focus:outline-none"}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={onKeyDown}
                    onMouseDown={() => {
                        updateCurrentEditor(editor)
                    }}
                />
            </Slate>
        </div>
    )
}

const HeadingElement = (props: RenderElementProps) => {
    return (
        <p className={"text-5xl py-3 leading-[1.29]"} {...props.attributes}>{props.children}</p>
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