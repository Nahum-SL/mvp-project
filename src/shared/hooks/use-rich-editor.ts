// src/shared/components/editor/hooks/use-rich-editor.ts
"use client";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { CharacterCount } from "@tiptap/extension-character-count";
import { TextStyle } from "@tiptap/extension-text-style";
import { cn } from "@/src/lib/utils";

interface UseRichEditorProps {
  content?: string;
  editable?: boolean;
  placeholder?: string; // 💡 Añadido para que sea dinámico
  onChange?: (value: string) => void;
}

export function useRichEditor({
  content,
  editable = true,
  placeholder = "Escribe el contenido aquí...",
  onChange,
}: UseRichEditorProps) {
  return useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TextStyle,
      CharacterCount,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editable,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-slate max-w-none",
          "focus:outline-none min-h-[500px]",
          "p-10 text-slate-700 leading-relaxed",
          "prose-headings:font-bold",
          "prose-headings:text-slate-900",
        ),
      },
    },
  });
}
