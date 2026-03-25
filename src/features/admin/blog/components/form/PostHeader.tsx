// src/features/admin/blog/components/form/PostHeader.tsx
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { PostFormInput } from "../../schema";
import { cn } from "@/src/lib/utils";

interface PostHeaderProps {
  register: UseFormRegister<PostFormInput>;
  errors: FieldErrors<PostFormInput>;
  disabled?: boolean;
}

export const PostHeader = ({ register, errors, disabled }: PostHeaderProps) => (
  <div className="space-y-4">
    <input
      {...register("title")}
      name="title"
      disabled={disabled}
      placeholder="Título impactante del post..."
      className={cn(
        `w-full bg-transparent text-4xl font-extrabold focus:outline-none 
      border-b-2 border-slate-100 focus:border-blue-600 transition-all pb-4 
      placeholder:text-slate-300 disabled:opacity-50`,
        errors.title && "border-red-500",
      )}
      required
    />
    {errors.title && (
      <span className="text-red-500">{errors.title.message}</span>
    )}
    <textarea
      {...register("excerpt")}
      name="excerpt"
      disabled={disabled}
      placeholder="Resumen ejecutivo para SEO..."
      className=
      {cn(`w-full p-6 bg-slate-50 rounded-4xl] focus:outline-none 
      focus:ring-2 focus:ring-blue-100 resize-none text-slate-600 
      border border-transparent focus:border-blue-200 transition-all 
      disabled:opacity-50`,
      errors.excerpt && "border-red-500"
    )}
      rows={3}
      required
    />
    {errors.excerpt && (
      <span className="text-red-500">{errors.excerpt.message}</span>
    )}
  </div>
);
