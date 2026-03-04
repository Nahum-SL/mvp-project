"use client";
import { useState, useTransition, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, type PostFormInput, type PostFormValues } from "../schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BlogEditor } from "./BlogEditor";
import { PostHeader } from "./form/PostHeader";
import { ImagePicker } from "./form/ImagePicker";
import { PostConfigCard } from "./form/PostConfigCard";
import { Category } from "@/src/types/blog/category";
import { createPostAction, updatePostAction } from "../action";
import { BlogPost } from "@/src/types/blog/blogPost";

interface Props {
  categories: Category[];
  initialData?: BlogPost;
}

export const CreatePostForm = ({ categories, initialData }: Props) => {
  const isEditing = !!initialData;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PostFormInput, unknown, PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title || "",
      excerpt: initialData?.excerpt || "",
      categoryId: initialData?.categoryId || 0,
      published: initialData?.published || false,
      content: initialData?.content || "",
    },
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.image || null,
  );

  useEffect(() => {
    // Función de limpieza explícita
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Sincronizar editor con Hook Form
  const handleEditorChange = (html: string) => {
    setValue("content", html, { shouldValidate: true });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (previewUrl && !previewUrl.startsWith("http"))
        URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // 2. onSubmit recibe PostFormValues (datos ya transformados/coerceados)
  const onSubmit = async (data: PostFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    // El acceso al ref ahora es seguro dentro de la función asíncrona
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      formData.append("image", file);
    }

    startTransition(async () => {
      const result = isEditing
        ? await updatePostAction(initialData.id, formData)
        : await createPostAction(formData);

      if (result.success) {
        toast.success(isEditing ? "¡Actualizado!" : "¡Publicado!");
        router.push("/admin/blog");
      } else {
        toast.error(result.error);
      }
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20"
    >
      <div className="lg:col-span-2 space-y-8">
        {/* Pasamos register y errors a los hijos */}
        <PostHeader register={register} errors={errors} disabled={isPending} />

        <div className={isPending ? "opacity-50 pointer-events-none" : ""}>
          <BlogEditor
            initialContent={initialData?.content}
            onChange={handleEditorChange}
          />
          {errors.content && (
            <p className="text-red-500 text-xs mt-2 font-medium">
              {errors.content.message}
            </p>
          )}
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
        <PostConfigCard
          register={register}
          errors={errors}
          categories={categories}
          isPending={isPending}
        />
      </div>
    </form>
  );
};
