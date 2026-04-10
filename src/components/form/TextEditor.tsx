import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface TextEditorProps {
    value?: string;
    onChange: (value: string) => void;
}

const TextEditor = ({ value = '', onChange }: TextEditorProps) => {
    const [wordCount, setWordCount] = useState(0);

    useEffect(() => {
        const text = value.replace(/<[^>]*>/g, "").trim();
        const words = text.split(/\s+/).filter(word => word !== "");
        setWordCount(words.length);
    }, [value]);

    const handleChange = (val: string) => {
        const plainText = val.replace(/<[^>]*>/g, "").trim();
        const words = plainText.split(/\s+/).filter(word => word !== "");
        if (words.length <= 800) {
            onChange(val);
        }
    };
    

    return (
        <div className="w-full hover:cursor-pointer hover:border-[var(--primary-color)]">
            <label className="text-sm font-medium text-[#212b36] flex gap-1">
                Description
                <span className="text-red-500">*</span>
            </label>
            <ReactQuill
                value={value}
                onChange={handleChange}
                modules={{
                    toolbar: [
                        [{ header: [2, 3, 4, false] }],
                        ["bold", "italic", "underline", "blockquote"],
                        [{ color: [] }, { background: [] }],
                        [{ font: [] }],
                        [{ align: [] }],
                        ["clean"],
                        ['link', 'image', 'video'],
                        ['underline', 'strike', 'blockquote', 'code-block'],
                        ['list', 'bullet', 'ordered'],
                        ['indent', 'outdent'],
                        ['formula', 'video'],
                        ['color', 'background', 'clear'],
                        ['font', 'size', 'height'],
                        ['direction', 'align'],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["blockquote", "code-block"],
                        [{ align: [] }],
                        ["clean"],
                    ],
                }}
                className="mt-1"
            />
        </div>
    );
};

export default TextEditor;
