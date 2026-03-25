// features/admin/intranet/components/form/LinkConfigCard.tsx
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { IntranetLinkFormInput } from "../../schema";
import { Link2, ListOrdered, Eye } from "lucide-react";

interface Props {
  register: UseFormRegister<IntranetLinkFormInput>;
  errors: FieldErrors<IntranetLinkFormInput>;
  isPending: boolean;
}

export const LinkConfigCard = ({ register, errors, isPending }: Props) => {
  return (
    <div className="p-6 bg-slate-900 rounded-4xl text-white space-y-6 shadow-xl">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Link2 size={16} className="text-blue-400" />
          <h3 className="text-xs font-extrabold uppercase tracking-[0.2em]">
            Destino
          </h3>
        </div>
        <input
          {...register("url")}
          placeholder="https://..."
          disabled={isPending}
          className="w-full bg-white/10 border-none rounded-xl 
          px-4 py-3 text-sm font-medium 
          focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {errors.url && (
          <p className="text-red-400 text-[10px] font-bold uppercase">
            {errors.url.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ListOrdered size={16} className="text-blue-400" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest">
              Orden
            </span>
          </div>
          <input
            {...register("order")}
            disabled={isPending}
            type="number"
            className="w-full bg-white/10 border-none rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Eye size={16} className="text-blue-400" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest">
              Estado
            </span>
          </div>
          <select
            {...register("isVisible")}
            disabled={isPending}
            className="w-full bg-white/10 border-none rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
          >
            <option value="true" className="text-slate-900">
              Visible
            </option>
            <option value="false" className="text-slate-900">
              Oculto
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};
