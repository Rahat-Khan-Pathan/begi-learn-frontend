import React, { Dispatch, SetStateAction, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "ckeditor5-custom-build/build/ckeditor";
import "ckeditor5-custom-build/sample/styles.css";
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
                editor={window['ClassicEditor']}
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
