"use client"

import React, {useCallback, useMemo, useState} from 'react'
import {createEditor, Descendant, Editor, Element, Transforms, Text} from 'slate'
import {Editable, RenderElementProps, RenderLeafProps, Slate, withReact} from 'slate-react'
import {
    CustomEditor as CustomEditorType,
    FormatKeys,
    TextColor,
    ParagraphElement as ParagraphElementType,
    HeadingElement as HeadingElementType
} from "@/components/editor/editor-types";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {withHistory} from "slate-history";

const escapeHtml = (string: string) => {
    const htmlEscapes: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    };

    return string.replace(/[&<>"']/g, (match) => htmlEscapes[match]);
};

const serialize = (nodes: Descendant[]): string => {
    return nodes.map((node) => serializeNode(node)).join('');
};

const serializeNode = (node: Descendant): string => {
    if (Text.isText(node)) {
        let text = escapeHtml(node.text);
        const {bold, italic, underline, strike, color} = node;
        let html = text;

        if (bold) {
            html = `<strong>${html}</strong>`;
        }
        if (italic) {
            html = `<em>${html}</em>`;
        }
        if (underline) {
            html = `<u>${html}</u>`;
        }
        if (strike) {
            html = `<del>${html}</del>`;
        }
        if (color) {
            let style = ""

            if (color === "purple") {
                style = `background-color: rgb(192 132 252)`
            } else if (color==="gold") {
                style = ` background-color: rgb(234 179 8)`
            } else if (color === "green") {
                style = `background-color: rgb(21 128 61)`
            }

            html = `<span style="${style}" data-color="${color}">${html}</span>`;
        }

        return html;
    } else {
        const children = node.children.map((n) => serializeNode(n)).join('');
        switch (node.type) {
            case 'paragraph':
                return `<p>${children}</p>`;
            case 'heading':
                return `<h1>${children}</h1>`;
            default:
                return children;
        }
    }
};

const deserialize = (html: string): Descendant[] => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const body = doc.body;
    const nodes = Array.from(body.childNodes).map(deserializeNode);
    return nodes.length > 0 ? nodes : [{type: 'paragraph', children: [{text: ''}]}];
};

const deserializeNode = (node: Node): Descendant => {
    if (node.nodeType === Node.TEXT_NODE) {
        return { text: node.textContent || '' };
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        let children = Array.from(element.childNodes).map(deserializeNode);

        // Ensure that elements have at least one child
        if (children.length === 0) {
            children = [{ text: '' }];
        }

        switch (element.tagName) {
            case 'P':
                return { type: 'paragraph', children } as ParagraphElementType;
            case 'H1':
                return { type: 'heading', children } as HeadingElementType;
            case 'STRONG':
                children = applyMarkToChildren(children, 'bold');
                return mergeChildren(children);
            case 'EM':
                children = applyMarkToChildren(children, 'italic');
                return mergeChildren(children);
            case 'U':
                children = applyMarkToChildren(children, 'underline');
                return mergeChildren(children);
            case 'DEL':
                children = applyMarkToChildren(children, 'strike');
                return mergeChildren(children);
            case 'SPAN':
                const color = element.getAttribute('data-color') as TextColor;
                if (color) {
                    children = applyMarkToChildren(children, 'color', color);
                }
                return mergeChildren(children);
            default:
                // For unknown elements, wrap children in a paragraph
                return { type: 'paragraph', children } as ParagraphElementType;
        }
    } else {
        // Return an empty text node for any other node types
        return { text: '' };
    }
};

const applyMarkToChildren = (children: Descendant[], mark: string, value: any = true): Descendant[] => {
    return children.map((child) => {
        if (Text.isText(child)) {
            return {...child, [mark]: value};
        } else {
            return child;
        }
    });
};

const mergeChildren = (children: Descendant[]): Descendant => {
    return children[0]
};


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
            match: (node) => Element.isElement(node) && node.type === 'heading'
        })

        console.log(match)

        return !!match
    },

    toggleHeadingType(editor: CustomEditorType) {
        const isActive = CustomEditor.isHeadingBlockActive(editor)
        Transforms.setNodes(
            editor,
            {type: isActive ? undefined : 'heading'},
        )
    },
}

export const EditorComponent = () => {
    const initialValue = useMemo(() => {
        const html = localStorage.getItem('content');
        return html ? deserialize(html) : [{ type: 'paragraph', children: [{ text: '' }] }] as Descendant[];
    }, []);

    const [editor] = useState(() => withHistory(withReact(createEditor())))

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
        <Slate
            editor={editor}
            initialValue={initialValue}
            onChange={(value) => {
                const isAstChange = editor.operations.some((op) => op.type !== 'set_selection');
                if (isAstChange) {
                    const content = serialize(value);
                    localStorage.setItem('content', content);
                    localStorage.setItem("content_json", JSON.stringify(value))
                }
            }}
        >
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