"use client";
import { FormProvider } from "react-hook-form";
// Componentes del formulario
import { RichEditor } from "@/src/shared/components/editor/RichEditor";
// Subcomponentes del formulario (title, excerpt)
import { PostHeaderForm } from "./form/PostHeaderForm";
// Componente para subir imagen (preview + input)
import { ImagePicker } from "@/src/shared/components/form/ImagePicker";
import { PostConfigCard } from "./form/PostConfigCard";
// Tipos
import { BlogPost } from "@/src/types/blog/blogPost";
// hooks
import { usePostForm } from "../hooks/use-post-form";
import { useCategories } from "../../category/hooks/use-blog-category-queries";
// Schema
import type { PostFormInput } from "../schemas/blog-post-schema";
// Componentes Atomicos

interface Props {
  initialData?: BlogPost;
}

export const PostForm = ({ initialData }: Props) => {
  const {
    form,
    previewUrl,
    isPending,
    handleImageChange,
    onSubmit,
    markAsManual,
    removeImage,
    isEditing,
  } = usePostForm({ initialData });

  const { data: categoryOptions = [] } = useCategories();

  const imageValue = form.watch("image");

  console.log("🖼️ RHF IMAGE:", imageValue);
  console.log(
    "🖼️ RHF IMAGE instanceof File:",
    imageValue instanceof File
  );

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(
          (data) => {
            console.log("✅ FORMULARIO VÁLIDO");
            console.log(data);

            onSubmit(data);
          },
          (errors) => {
            console.log("❌ FORMULARIO INVÁLIDO");
            console.log(errors);
          },
        )}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20"
      >
        <div className="lg:col-span-2 space-y-8">
          {/* Pasamos register y errors a los hijos */}
          <PostHeaderForm
            disabled={isPending}
            onSlugManualEdit={markAsManual}
          />

          <div className={isPending ? "opacity-50 pointer-events-none" : ""}>
            <RichEditor<PostFormInput>
              name="content"
              disabled={isPending}
              placeholder="Escribe el cuerpo del articulo del post aqui .."
            />
          </div>
        </div>

        <div className="space-y-6">
          <ImagePicker<PostFormInput>
            name="image"
            previewUrl={previewUrl}
            onImageChange={handleImageChange}
            onRemove={removeImage}
            disabled={isPending}
          />

          <PostConfigCard
            categories={categoryOptions}
            isPending={isPending}
            isEditing={isEditing}
          />
        </div>
      </form>
    </FormProvider>
  );
};
