import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { PostFormInput } from "../../schemas/blog-schema";
import { cn, slugify } from "@/src/lib/utils";

interface PostHeaderProps {
  register: UseFormRegister<PostFormInput>;
  errors: FieldErrors<PostFormInput>;
  setValue: UseFormSetValue<PostFormInput>;
  disabled?: boolean;
  onSlugManualEdit: () => void;
}

export const PostHeaderForm = ({
  register,
  errors,
  setValue,
  disabled,
  onSlugManualEdit,
}: PostHeaderProps) => (
  <div className="space-y-6">
    {/* TITLE */}
    <input
      {...register("title")}
      disabled={disabled}
      placeholder="Título impactante del post..."
      className={cn(
        `w-full bg-transparent text-3xl md:text-4xl font-extrabold 
        border-b-2 border-slate-200 focus:border-blue-600 
        pb-4 outline-none transition-all`,
        errors.title && "border-red-500",
      )}
    />

    {/* SLUG */}
    <div className="space-y-2">
      <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
        URL del artículo
      </label>

      <div
        className="flex items-center bg-slate-50 rounded-2xl px-4 py-3 border border-amber-300
      focus-within:ring-2 focus-within:ring-blue-100"
      >
        <span className="text-slate-400 text-sm mr-2 hidden md:block">
          /blog/
        </span>
        <input
          {...register("slug", {
            onChange: (e) => {
              onSlugManualEdit(); // 🔥 clave
              const formatted = slugify(e.target.value);
              setValue("slug", formatted);
            },
          })}
          disabled={disabled}
          className="w-full bg-transparent outline-none text-sm font-semibold text-slate-700 font-mono"
          placeholder="mi-articulo"
        />
      </div>

      {errors.slug && (
        <span className="text-red-500 text-xs">{errors.slug.message}</span>
      )}
    </div>

    {/* EXCERPT */}
    <textarea
      {...register("excerpt")}
      disabled={disabled}
      placeholder="Resumen ejecutivo para SEO..."
      className={cn(
        `w-full p-6 bg-slate-50 rounded-3xl focus:outline-none 
        focus:ring-2 focus:ring-blue-100 resize-none text-slate-600`,
        errors.excerpt && "border-red-500",
      )}
      rows={3}
    />
  </div>
);
