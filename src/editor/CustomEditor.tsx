
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic/build/ckeditor"
import "../../ckeditor5/sample/styles.css";

interface IProps {
    text: string;
    setText: Dispatch<SetStateAction<string>>;
    error: boolean;
    setError: Dispatch<SetStateAction<boolean>>;
}
const CustomEditor = ({ text, setText, error, setError }: IProps) => {
    return (
        <div style={{border: error ? "1px solid red" : ""}}>
            <CKEditor
                editor={ClassicEditor}
                data={text}
                onChange={(_, editor) => {
                    const data = editor.getData();
                    setText(data);
                    if(data) {
                        setError(false);
                    }
                }}
            />
        </div>
    );
};

export default CustomEditor;
