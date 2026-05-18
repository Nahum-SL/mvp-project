"use client";

import { Editor } from "@tiptap/react";

import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Type,
  List,
  ListOrdered,
  Quote,
} from "lucide-react";

import { EditorToolbarButton } from "./EditorToolBarButton";

interface Props {
  editor: Editor;
}

export function EditorToolbar({ editor }: Props) {
  return (
    <div className="bg-slate-50/50 p-4 border-b border-slate-100 flex flex-wrap gap-2">
      <div className="flex bg-slate-200/50 p-1 rounded-2xl gap-1">
        <EditorToolbarButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={18} />
        </EditorToolbarButton>
      </div>
    </div>
  );
}
