import {Descendant, Editor, Element, Text, Transforms} from "slate";
import {
    CustomEditor as CustomEditorType, FormatKeys,
    HeadingElement as HeadingElementType,
    ParagraphElement as ParagraphElementType,
    TextColor
} from "@/components/editor/editor-types";

export const escapeHtml = (string: string) => {
    const htmlEscapes: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    };

    return string.replace(/[&<>"']/g, (match) => htmlEscapes[match]);
};

export const serialize = (nodes: Descendant[]): string => {
    return nodes.map((node) => serializeNode(node)).join('');
};

export const serializeNode = (node: Descendant): string => {
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

export const deserialize = (html: string): Descendant[] => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const body = doc.body;
    const nodes = Array.from(body.childNodes).map(deserializeNode);
    return nodes.length > 0 ? nodes : [{type: 'paragraph', children: [{text: ''}]}];
};

export const deserializeNode = (node: Node): Descendant => {
    if (node.nodeType === Node.TEXT_NODE) {
        return { text: node.textContent || '' };
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        let children = Array.from(element.childNodes).map(deserializeNode);

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
                return { type: 'paragraph', children } as ParagraphElementType;
        }
    } else {
        return { text: '' };
    }
};

export const applyMarkToChildren = (children: Descendant[], mark: string, value: any = true): Descendant[] => {
    return children.map((child) => {
        if (Text.isText(child)) {
            return {...child, [mark]: value};
        } else {
            return child;
        }
    });
};

export const mergeChildren = (children: Descendant[]): Descendant => {
    return children[0]
};


export const CustomEditor = {
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