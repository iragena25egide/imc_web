"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

export default function RichTextEditor({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  return (
    <div className="bg-white text-slate-800 h-full flex flex-col">
      <style dangerouslySetInnerHTML={{__html: `
        .ql-editor img {
          max-width: 300px !important;
          height: auto !important;
          border-radius: 8px;
          margin: 10px;
          display: inline-block;
        }
      `}} />
      <ReactQuill theme="snow" value={value} onChange={onChange} modules={modules} className="flex-1 flex flex-col" />
    </div>
  );
}
