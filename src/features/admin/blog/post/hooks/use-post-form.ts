"use client";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
  postSchema,
  type PostFormInput,
  type PostFormValues,
} from "../schemas/blog-post-schema";

import { useCreatePost, useUpdatePost } from "./use-blog-mutation";
import { useImagePreview } from "@/src/shared/hooks/form/use-image-preview";
import { useAutoSlug } from "@/src/shared/hooks/form/use-auto-slug";

import type { BlogPost } from "@/src/types/blog/blogPost";

interface UsePostFormProps {
  initialData?: BlogPost;
}

export function usePostForm({ initialData }: UsePostFormProps) {
  // Editing State
  const isEditing = !!initialData;
  // Router
  const router = useRouter();
  // Mutations
  const createMutation = useCreatePost();
  const updateMutation = useUpdatePost();
  // RHF
  const form = useForm<PostFormInput, unknown, PostFormValues>({
    resolver: zodResolver(postSchema),

    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      excerpt: initialData?.excerpt || "",
      categoryId: initialData?.categoryId || 0,
      published: initialData?.published || false,
      content: initialData?.content || "",
    },
  });

  // Hooks especializados
  const { previewUrl, handleImageChange, removeImage } = useImagePreview({
    initialImage: initialData?.image,
  });

  const { markAsManual } = useAutoSlug({
    control: form.control,
    setValue: form.setValue,
    fieldTitle: "title",
    fieldSlug: "slug",
    disabled: isEditing,
  });

  // Submit
  const onSubmit = async (values: PostFormValues) => {
    const formData = new FormData();
    
    for (const [key, value] of Object.entries(values)) {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    }
    // Mutation
    try {
      if (isEditing && initialData?.id) {
        await updateMutation.mutateAsync({
          id: initialData.id,
          data: formData,
        });

        toast.success("¡Actualizado!");
      } else {
        await createMutation.mutateAsync(formData);

        toast.success("¡Publicado!");
      }
      router.push("/admin/blog");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error inesperado");
    }
  };

  return {
    form,
    previewUrl,
    handleImageChange,
    removeImage,
    markAsManual,
    onSubmit,
    isPending: createMutation.isPending || updateMutation.isPending,
  };
}
