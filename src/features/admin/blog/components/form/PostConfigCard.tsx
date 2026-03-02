// src/features/admin/blog/components/form/PostConfigCard.tsx
import { Loader2, Save } from "lucide-react";
import { Category } from "@/src/types/blog/category";

export const PostConfigCard = ({
  categories,
  isPending,
}: {
  categories: Category[];
  isPending: boolean;
}) => (
  <aside className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-8 sticky top-6">
    <section>
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 block">
        Clasificación
      </label>
      <select
        name="categoryId"
        disabled={isPending}
        className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 font-bold text-slate-700 disabled:opacity-50"
        required
      >
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </section>

    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
      <input
        type="checkbox"
        name="published"
        id="pub"
        disabled={isPending}
        className="w-5 h-5 rounded border-slate-300 text-blue-600"
      />
      <label
        htmlFor="pub"
        className="text-sm font-bold text-slate-600 cursor-pointer"
      >
        Publicar ahora
      </label>
    </div>

    <button
      type="submit"
      disabled={isPending}
      className={`w-full py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 shadow-xl ${isPending ? "bg-slate-100 text-slate-400" : "bg-slate-900 text-white hover:bg-blue-600 shadow-blue-200"}`}
    >
      {isPending ? (
        <Loader2 className="animate-spin" size={18} />
      ) : (
        <Save size={18} />
      )}
      {isPending ? "Procesando..." : "Publicar Artículo"}
    </button>
  </aside>
);
