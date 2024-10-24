"use client"

import { EditorComponent } from "@/components/editor/editor"
import {EditorButtons} from "@/components/editor/editor-buttons";
import React from "react";
import {useEditorStore} from "@/components/editor/useEditorStore";

const Main = () => {
    const currentEditor = useEditorStore(state => state.currentEditor)

    return <div>
        {currentEditor && <EditorButtons editor={currentEditor} />}
        <EditorComponent />
        <EditorComponent />
    </div>
}

export default Main;