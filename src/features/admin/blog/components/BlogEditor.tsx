// Estilo de editor
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { motion } from "framer-motion";

export const BlogEditor = ({
  onChange,
}: {
  onChange: (html: string) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Escribe algo increíble para ASESCON... </p>",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none focus:outline-none min-h-[400px] p-6",
      },
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden"
    >
      {/* Barra de herramientas simple */}
      <div className="bg-slate-50 p-4 border-b border-slate-100 flex gap-2">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className="p-2 hover:bg-white rounded-lg font-bold"
        >
          B
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className="p-2 hover:bg-white rounded-lg italic"
        >
          I
        </button>
      </div>

      <EditorContent editor={editor} />
    </motion.div>
  );
};
