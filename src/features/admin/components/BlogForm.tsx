/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, PostFormInput, PostFormValues } from "../../blog/components/schema";

export const BlogForm = ({ categories }: { categories: any[] }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormInput, unknown, PostFormValues>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data: PostFormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("excerpt", data.excerpt);
    formData.append("content", data.content);
    formData.append("categoryId", data.categoryId.toString());
    formData.append("published", String(data.published));
    formData.append("image", data.image[0]); // El archivo físico

    // Aquí llamarías a tu API de NestJS
    // const res = await fetch('/api/v1/posts', { method: 'POST', body: formData });
    console.log("Enviando a NestJS...", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-4xl bg-white p-8 rounded-3xl border border-slate-200"
    >
      <div className="grid grid-cols-1 gap-6">
        {/* Título */}
        <div>
          <label className="block text-xs font-bold uppercase mb-2">
            Título del Post
          </label>
          <input
            {...register("title")}
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Categoría y Publicado */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase mb-2">
              Categoría
            </label>
            <select
              {...register("categoryId")}
              className="w-full p-3 rounded-xl border border-slate-200 outline-none"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 pt-8">
            <input
              type="checkbox"
              {...register("published")}
              className="w-5 h-5"
            />
            <span className="text-sm font-medium">
              ¿Publicar inmediatamente?
            </span>
          </div>
        </div>

        {/* Imagen */}
        <div>
          <label className="block text-xs font-bold uppercase mb-2">
            Imagen de Portada
          </label>
          <input
            type="file"
            {...register("image")}
            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Contenido */}
        <div>
          <label className="block text-xs font-bold uppercase mb-2">
            Contenido (HTML permitido)
          </label>
          <textarea
            {...register("content")}
            rows={10}
            className="w-full p-4 rounded-xl border border-slate-200 outline-none font-mono text-sm"
          />
        </div>

        <button
          type="submit"
          className="bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition-all uppercase tracking-widest text-xs"
        >
          Guardar Artículo
        </button>
      </div>
    </form>
  );
};
