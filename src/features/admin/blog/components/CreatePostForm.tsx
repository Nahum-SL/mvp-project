"use client";
import { useState, useTransition, useRef, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BlogEditor } from "./BlogEditor";
import { PostHeader } from "./form/PostHeader";
import { ImagePicker } from "./form/ImagePicker";
import { PostConfigCard } from "./form/PostConfigCard";
import { Category } from "@/src/types/blog/category";
import { createPostAction } from "../action";

export const CreatePostForm = ({ categories }: { categories: Category[] }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    // Función de limpieza explícita
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (content.length < 50)
      return toast.error("El contenido es demasiado corto.");

    const formData = new FormData(e.currentTarget);
    formData.append("content", content);
    // Nota: 'image' ya viene del input file en el FormData gracias al atributo 'name="image"' en ImagePicker

    startTransition(async () => {
      const result = await createPostAction(formData); // <-- Llamada al Server Action

      if (result.success) {
        toast.success("¡Artículo publicado!");
        router.push("/admin/blog");
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20"
    >
      <div className="lg:col-span-2 space-y-8">
        <PostHeader disabled={isPending} />
        <div className={isPending ? "opacity-50 pointer-events-none" : ""}>
          <BlogEditor onChange={setContent} />
        </div>
      </div>

      <div className="space-y-6">
        <ImagePicker
          previewUrl={previewUrl}
          onImageChange={handleImageChange}
          onRemove={() => {
            setPreviewUrl(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
          }}
          disabled={isPending}
          fileInputRef={fileInputRef}
        />
        <PostConfigCard categories={categories} isPending={isPending} />
      </div>
    </form>
  );
};
