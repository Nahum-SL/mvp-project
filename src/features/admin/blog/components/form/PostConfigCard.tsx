// src/features/admin/blog/components/form/PostConfigCard.tsx
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { PostFormInput } from "../../schema";
import { Category } from "@/src/types/blog/category";
import { cn } from "@/src/lib/utils";
//
interface Props {
  register: UseFormRegister<PostFormInput>;
  errors: FieldErrors<PostFormInput>;
  categories: Category[];
  isPending: boolean;
}

// src/features/admin/blog/components/form/PostConfigCard.tsx
export const PostConfigCard = ({
  register,
  errors,
  categories,
  isPending,
}: Props) => (
  <aside className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-8 sticky top-6">
    <section>
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 block">
        Clasificación
      </label>
      <select
        {...register("categoryId")}
        disabled={isPending}
        className={cn(
          "w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 font-bold text-slate-700 disabled:opacity-50 appearance-none",
          errors.categoryId && "ring-2 ring-red-500",
        )}
      >
        <option value={0}>Seleccionar categoría...</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      {errors.categoryId && (
        <p className="text-red-500 text-[10px] mt-2 font-bold uppercase">
          {errors.categoryId.message}
        </p>
      )}
    </section>

    <div
      className={cn(
        "flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-colors",
        isPending && "opacity-50",
      )}
    >
      <input
        {...register("published")}
        type="checkbox"
        id="pub"
        disabled={isPending}
        className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
      />
      <label
        htmlFor="pub"
        className="text-sm font-bold text-slate-600 cursor-pointer select-none"
      >
        Publicar ahora
      </label>
    </div>

    <button
      type="submit"
      disabled={isPending}
      className={cn(
        "w-full py-5 rounded-4xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 shadow-xl",
        isPending
          ? "bg-slate-100 text-slate-400 shadow-none"
          : "bg-slate-900 text-white hover:bg-blue-600 shadow-blue-200 active:scale-95",
      )}
    >
      {isPending ? (
        <Loader2 className="animate-spin" size={18} />
      ) : (
        <Save size={18} />
      )}
      {isPending ? "Procesando..." : "Guardar Artículo"}
    </button>
    <Link
      href="/admin/blog"
      className="w-full bg-white text-slate-500 font-bold py-4 
      rounded-3xl border border-slate-200 
      hover:bg-slate-50  hover:border-sky-500 hover:text-sky-500
      transition-all flex items-center justify-center gap-3 
      uppercase text-xs tracking-widest text-center"
    >
      <ArrowLeft size={16} /> Cancelar
    </Link>
  </aside>
);
