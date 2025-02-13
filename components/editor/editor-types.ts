import {BaseEditor} from 'slate'
import {ReactEditor} from 'slate-react'

export type CustomEditor = BaseEditor & ReactEditor & {
    history: History
    undo: () => void
    redo: () => void
    writeHistory: (stack: 'undos' | 'redos', batch: any) => void
}

export type ParagraphElement = {
    type: 'paragraph'
    children: CustomText[]
}

export type CustomElement = ParagraphElement

export type TextColor = "purple" | "gold" | "green"

export interface FormattedText {
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strike?: boolean;
    color?: TextColor;
}

export type FormatKeys = Exclude<Exclude<keyof FormattedText, 'text'>, "color">

export type CustomText = FormattedText

declare module 'slate' {
    interface CustomTypes {
        Editor: CustomEditor
        Element: CustomElement
        Text: CustomText
    }
}