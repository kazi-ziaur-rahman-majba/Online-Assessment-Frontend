import { useEffect, useState, useMemo } from "react";
import dynamic from 'next/dynamic';
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import('react-quill'), { 
    ssr: false,
    loading: () => <div className="h-[200px] bg-gray-50 animate-pulse rounded-xl" />
});

interface TextEditorProps {
    value?: string;
    onChange: (value: string) => void;
}

const TextEditor = ({ value = '', onChange }: TextEditorProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleChange = (val: string) => {
        const plainText = val.replace(/<[^>]*>/g, "").trim();
        const words = plainText.split(/\s+/).filter(word => word !== "");
        if (words.length <= 800) {
            onChange(val);
        }
    };

    const undoChange = function(this: any) {
        this.quill.history.undo();
    };
    const redoChange = function(this: any) {
        this.quill.history.redo();
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                ["undo", "redo"],
                [{ header: [false] }],
                [{ list: "bullet" }],
                ["bold", "italic", "underline"],
            ],
            handlers: {
                "undo": undoChange,
                "redo": redoChange
            }
        },
        history: {
            delay: 1000,
            maxStack: 100,
            userOnly: true
        }
    }), []);

    if (!isMounted) {
        return <div className="h-[200px] bg-gray-50 animate-pulse rounded-xl" />;
    }

    return (
        <div className="w-full quill-custom-editor">
            <label className="text-sm font-medium text-[#475467] mb-2 flex gap-1">
                Type questions here..
                <span className="text-red-500">*</span>
            </label>
            
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <ReactQuill
                    value={value}
                    onChange={handleChange}
                    placeholder="Type questions here.."
                    modules={modules}
                    className="bg-white"
                />
            </div>

            <style jsx global>{`
                .ql-undo:after {
                    content: '↺';
                    font-size: 18px;
                }
                .ql-redo:after {
                    content: '↻';
                    font-size: 18px;
                }
                .quill-custom-editor .ql-toolbar.ql-snow {
                    background-color: #F9FAFB;
                    border: none;
                    border-bottom: 1px solid #F2F4F7;
                    padding: 12px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .quill-custom-editor .ql-container.ql-snow {
                    border: none;
                    min-height: 150px;
                    font-family: 'Inter', sans-serif;
                }
                .quill-custom-editor .ql-editor {
                    font-size: 15px;
                    color: #667085;
                }
                .quill-custom-editor .ql-editor.ql-blank::before {
                    color: #98A2B3;
                    font-style: normal;
                }
                .quill-custom-editor .ql-stroke {
                    stroke: #475467;
                }
                .quill-custom-editor .ql-picker-label {
                    color: #475467;
                    font-weight: 500;
                }
            `}</style>
        </div>
    );
};

export default TextEditor;