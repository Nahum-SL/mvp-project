"use client";

import { useEffect } from "react";
import { useController, useFormContext } from "react-hook-form";
import { EditorContent } from "@tiptap/react";

import { FormError } from "@/src/components/ui/form/FormError";

import { useBlogEditor } from "../../hooks/use-editor-blog";
import { EditorToolbar } from "./EditorToolbar";

import type { PostFormInput } from "../../schemas/blog-post-schema";
import type { Path } from "react-hook-form";

interface Props {
  name: Path<PostFormInput>;
  disabled?: boolean;
}

export function BlogEditor({ name, disabled }: Props) {
  // Pasamos los tipos al hook context para heredar el tipado del esquema
  const { control } = useFormContext<PostFormInput>();

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  // 1. Corregido: Forzamos la transformación a string o pasamos undefined limpiamente
  const editor = useBlogEditor({
    content: value ? String(value) : undefined,
    editable: !disabled,
    onChange,
  });

  // Sync editable state
  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!disabled);
  }, [disabled, editor]);

  // Sync external content changes
  useEffect(() => {
    if (!editor) return;

    const currentHTML = editor.getHTML();
    // Validamos que el valor exista y sea diferente para evitar bucles infinitos
    if (value && value !== currentHTML) {
      // 2. Corregido: Tiptap espera una interfaz de opciones en lugar de un booleano directo
      editor.commands.setContent(String(value), { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl h-150 animate-pulse flex items-center justify-center text-slate-400">
        Cargando editor...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden">
      <EditorToolbar editor={editor} />

      <EditorContent editor={editor} />

      <div className="bg-slate-50 px-8 py-3 border-t flex justify-between items-center text-xs font-medium text-slate-500">
        <span>{editor.storage.characterCount.words()} palabras</span>
        <span>{editor.storage.characterCount.characters()} caracteres</span>
      </div>

      <FormError message={error?.message} />
    </div>
  );
}