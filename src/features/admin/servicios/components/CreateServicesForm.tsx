"use client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// Types & Schema
import { Service } from "@/src/types/servicio/servicio";
import {
  servicioSchema,
  type ServicioFormValues,
  type ServicioFormInput,
} from "../schema";
import { createServicioAction, updateServicioAction } from "../action";

// Subcomponentes
import { ServiceHeaderForm } from "./ServiceHeaderForm";
import { ServiceFeatures } from "./ServiceFeatures";
import { ServiceConfigCard } from "./ServiceConfigCard";
import { ImagePicker } from "@/src/features/admin/blog/components/form/ImagePicker"; // Reutilizamos el del blog
import { BlogEditor } from "@/src/features/admin/blog/components/BlogEditor"; // Reutilizamos el editor

interface Props {
  initialData?: Service;
}

export const CreateServicioForm = ({ initialData }: Props) => {
  const isEditing = !!initialData;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ServicioFormInput, unknown, ServicioFormValues>({
    resolver: zodResolver(servicioSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      businessTypes: initialData?.businessTypes || [],
      painPoints: initialData?.painPoints || [],
      isVisible: initialData?.isVisible ?? true,
      order: initialData?.order || 0,
      features: initialData?.features?.map((f) => f.name) || [""],
    },
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.image || null,
  );

  useEffect(() => {
    return () => {
      if (previewUrl && !previewUrl.startsWith("http"))
        URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleEditorChange = (html: string) =>
    setValue("description", html, { shouldValidate: true });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (previewUrl && !previewUrl.startsWith("http"))
        URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: ServicioFormValues) => {
    const formData = new FormData();

    // Mapeo inteligente para NestJS
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(`${key}[]`, item));
      } else {
        formData.append(key, String(value));
      }
    });

    const file = fileInputRef.current?.files?.[0];
    if (file) formData.append("image", file);

    startTransition(async () => {
      if (isEditing && !initialData?.id) {
        toast.error("ID no encontrado");
        return;
      }
      const result = isEditing
        ? await updateServicioAction(initialData.id, formData)
        : await createServicioAction(formData);

      if (result.success) {
        toast.success(
          isEditing ? "¡Servicio Actualizado!" : "¡Servicio Creado!",
        );
        router.push("/admin/servicios");
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(onSubmit)(e)}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20"
    >
      {/* Columna Izquierda: Contenido Principal */}
      <div className="lg:col-span-2 space-y-8">
        <ServiceHeaderForm
          register={register}
          errors={errors}
          disabled={isPending}
        />

        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Descripción detallada
          </label>
          <div className={isPending ? "opacity-50 pointer-events-none" : ""}>
            <BlogEditor
              initialContent={initialData?.description}
              onChange={handleEditorChange}
            />
          </div>
        </div>

        <ServiceFeatures
          register={register}
          errors={errors}
          isPending={isPending}
          control={control}
        />
      </div>

      {/* Columna Derecha: Configuración e Imagen */}
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

        <ServiceConfigCard
          register={register}
          errors={errors}
          isPending={isPending}
        />
      </div>
    </form>
  );
};
