"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import { CharacterCount } from "@tiptap/extension-character-count";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Quote,
  Type,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

interface Props {
  onChange: (html: string) => void;
  initialContent?: string;
}

export const BlogEditor = ({ onChange, initialContent }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {},
        orderedList: {},
        listItem: {},
        hardBreak: { keepMarks: true },
      }),
      TextStyle,
      CharacterCount,
      Placeholder.configure({
        placeholder: "Escribe el cuerpo del artículo aquí...",
      }),
    ],
    content: initialContent || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-slate max-w-none focus:outline-none min-h-[500px] p-10 text-slate-700 leading-relaxed",
          "prose-headings:font-bold prose-headings:text-slate-900",
          "prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl",
          "prose-ul:list-disc prose-ul:pl-6",
          "prose-ol:list-decimal prose-ol:pl-6",
          "prose-li:my-1",
          "prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic",
        ),
      },
    },
  });

  useEffect(() => {
    if (editor && initialContent && editor.isEmpty) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent, editor]);

  if (!editor) return null;

  // Helper para botones activos
  const btnClass = (active: boolean) =>
    cn(
      "p-3 rounded-xl transition-all duration-200",
      active
        ? "bg-blue-600 text-white shadow-lg scale-95 ring-2 ring-blue-300"
        : "hover:bg-white text-slate-400 hover:text-slate-900",
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden"
    >
      {/* TOOLBAR MEJORADA */}
      <div className="bg-slate-50/50 p-4 border-b border-slate-100 flex flex-wrap gap-2 sticky top-0 z-10 backdrop-blur-md">
        {/* Formato de Texto */}
        <div className="flex bg-slate-200/50 p-1 rounded-2xl gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={btnClass(editor.isActive("bold"))}
          >
            <Bold size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={btnClass(editor.isActive("italic"))}
          >
            <Italic size={18} />
          </button>
        </div>

        {/* Encabezados (Tamaños de letra) */}
        <div className="flex bg-slate-200/50 p-1 rounded-2xl gap-1">
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={btnClass(editor.isActive("heading", { level: 1 }))}
          >
            <Heading1 size={18} />
          </button>
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={btnClass(editor.isActive("heading", { level: 2 }))}
          >
            <Heading2 size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={btnClass(editor.isActive("paragraph"))}
          >
            <Type size={18} />
          </button>
        </div>

        {/* Listas y Bloques */}
        <div className="flex bg-slate-200/50 p-1 rounded-2xl gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={btnClass(editor.isActive("bulletList"))}
          >
            <List size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={btnClass(editor.isActive("orderedList"))}
          >
            <ListOrdered size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={btnClass(editor.isActive("blockquote"))}
          >
            <Quote size={18} />
          </button>
        </div>
      </div>

      <EditorContent editor={editor} />

      {/* Contador de palabras simple en el footer del editor */}
      <div className="bg-slate-50 px-8 py-3 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        <span>ASESCON Editor v2.0</span>
        <span>{editor.storage.characterCount?.words?.() || 0} palabras</span>
      </div>
    </motion.div>
  );
};
