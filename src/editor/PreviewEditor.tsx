import React, { useEffect } from "react";
import katex from 'katex';
import 'katex/dist/katex.min.css';

const PreviewEditor = ({ text, id }: { text: string, id: string }) => {
    useEffect(() => {
        const latexRegex = /\$([^$]+)\$/g;
        const el = document.getElementById(id);
        if(!el) return;
        const newText = text.replace(latexRegex, (match, p1) => {
            return katex.renderToString(p1, {
              throwOnError: false
            });
          });
        if(text !== newText) el.innerHTML = newText;
    }, [text]);
    return (
        <div
            className="ck-content"
            id={id}
            lang="en"
            dir="ltr"
            role="textbox"
            dangerouslySetInnerHTML={{ __html: text }}
        ></div>
    );
};

export default PreviewEditor;
