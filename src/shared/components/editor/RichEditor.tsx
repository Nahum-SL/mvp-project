// src/shared/components/editor/RichEditor.tsx
"use client";

import { useEffect } from "react";
import { useController, useFormContext } from "react-hook-form";
import { EditorContent } from "@tiptap/react";
import { FormError } from "@/src/components/ui/form/FormError"; // Ajusta la ruta exacta de tu input/error global

import { useRichEditor } from "../../hooks/use-rich-editor";
import { EditorToolbar } from "./EditorToolbar";

import type { FieldValues, Path } from "react-hook-form";

// <T extends FieldValues> permite recibir la estructura de cualquier formulario
interface Props<T extends FieldValues> {
  name: Path<T>;
  disabled?: boolean;
  placeholder?: string;
}

export function RichEditor<T extends FieldValues>({
  name,
  disabled,
  placeholder,
}: Props<T>) {
  // Al no pasarle tipos al useFormContext, hereda el contexto genérico del padre de forma segura
  const { control } = useFormContext<T>();

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const editor = useRichEditor({
    content: value ? String(value) : undefined,
    editable: !disabled,
    placeholder,
    onChange,
  });

  // Sincronizar estado editable
  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!disabled);
  }, [disabled, editor]);

  // Sincronizar cambios externos
  useEffect(() => {
    if (!editor) return;

    const currentHTML = editor.getHTML();
    if (value && value !== currentHTML) {
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
