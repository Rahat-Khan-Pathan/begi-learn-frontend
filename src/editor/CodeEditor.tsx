import React, {
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";
import { Editor, loader, OnMount } from "@monaco-editor/react";
import * as monacoEditor from "monaco-editor";
interface IProps {
    code: string;
    setCode: Dispatch<SetStateAction<string>>;
    language: string;
    setLanguage: Dispatch<SetStateAction<string>>;
    readOnly: boolean;
}
const CodeEditor = ({ code, setCode, language, setLanguage, readOnly }: IProps) => {
    const [theme, setTheme] = useState("vs-dark");
    const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(
        null
    );
    const handleEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;
    };
    const options: monacoEditor.editor.IStandaloneEditorConstructionOptions = {
        acceptSuggestionOnCommitCharacter: true,
        acceptSuggestionOnEnter: "on",
        accessibilitySupport: "auto",
        autoIndent: "full",
        automaticLayout: true,
        codeLens: true,
        colorDecorators: true,
        contextmenu: true,
        cursorBlinking: "blink",
        cursorSmoothCaretAnimation: "off",
        cursorStyle: "line",
        disableLayerHinting: false,
        disableMonospaceOptimizations: false,
        dragAndDrop: false,
        fixedOverflowWidgets: false,
        folding: true,
        foldingStrategy: "auto",
        fontLigatures: false,
        formatOnPaste: false,
        formatOnType: false,
        hideCursorInOverviewRuler: false,
        links: true,
        mouseWheelZoom: false,
        multiCursorMergeOverlapping: true,
        multiCursorModifier: "alt",
        overviewRulerBorder: true,
        overviewRulerLanes: 2,
        quickSuggestions: true,
        quickSuggestionsDelay: 100,
        readOnly: readOnly,
        renderControlCharacters: false,
        renderFinalNewline: "on",
        renderLineHighlight: "all",
        renderWhitespace: "none",
        revealHorizontalRightPadding: 30,
        roundedSelection: true,
        rulers: [],
        scrollBeyondLastColumn: 5,
        scrollBeyondLastLine: true,
        selectOnLineNumbers: true,
        selectionClipboard: true,
        selectionHighlight: true,
        showFoldingControls: "mouseover",
        smoothScrolling: false,
        suggestOnTriggerCharacters: true,
        wordBasedSuggestions: "allDocuments",
        wordSeparators: "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
        wordWrap: "off",
        wordWrapBreakAfterCharacters: "\t})]?|&,;",
        wordWrapBreakBeforeCharacters: "{([+",
        wordWrapColumn: 80,
        wrappingIndent: "none",
        fontSize: 18,
    };

    useEffect(() => {
        switch (language) {
            case "c":
                setCode(`#include<stdio.h>
int main()
{
    // Write code here

    return 0;
}`);
                break;
            case "cpp":
                setCode(`#include<bits/stdc++.h>
using namespace std;
int main()
{
    // Write code here

    return 0;
}`);
                break;
            case "python":
                setCode(`# Write code here
`);
                break;
            case "java":
                setCode(`public class Main {
    public static void main(String[] args) {
        // Write code here

    }
}`);
                break;
            case "go":
                setCode(`package main
import "fmt"
func main() {
    // Write code here

    // fmt.Println("Hello, World!")
}`);
                break;
            case "javascript":
                setCode(`// Write code here
`);
                break;
            default:
                setCode(`// Write code here
`);
        }
    }, [language]);
    return (
        <div className="w-full">
            <select
                disabled={readOnly}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="select select-bordered select-sm mb-2 w-[25%] lg:w-[15%]"
            >
                <option>c</option>
                <option>cpp</option>
                <option>python</option>
                <option>java</option>
                <option>go</option>
            </select>
            <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="select select-bordered select-sm mb-2 ms-2 w-[35%] lg:w-[15%]"
            >
                <option>vs</option>
                <option>vs-dark</option>
            </select>
            <div style={{ borderRadius: "15px", overflow: "auto" }}>
                <Editor
                    height="75vh"
                    language={language}
                    value={code}
                    theme={theme}
                    onMount={handleEditorDidMount}
                    onChange={(value) => setCode(value)}
                    options={options}
                />
            </div>
        </div>
    );
};

export default CodeEditor;
