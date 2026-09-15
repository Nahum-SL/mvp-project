// features/admin/intranet/components/form/LinkConfigCard.tsx
import { FormCard } from "@/src/components/ui/form/FormCard";
import { FormInput } from "@/src/components/ui/form/FormInput";
import { FormSelect } from "@/src/components/ui/form/FormSelect";
import { Link2, ListOrdered, Eye } from "lucide-react";

interface Props {
  isPending: boolean;
  isEditing?: boolean;
}

export const LinkConfigCard = ({ isPending }: Props) => {
  return (
    <FormCard>
      {/* Campo URL */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Link2 size={16} className="text-blue-400" />
          <span className="text-xs font-extrabold uppercase tracking-[0.2em]">
            Destino
          </span>
        </div>
        <FormInput
          name="url"
          placeholder="https://..."
          disabled={isPending}
          className="bg-white/10 border-none text-white placeholder:text-white/30 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Grid de Orden y Estado */}
      <div className="grid grid-cols-2 gap-4">
        {/* Campo Orden */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ListOrdered size={16} className="text-blue-400" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest">
              Orden
            </span>
          </div>
          <FormInput
            name="order"
            type="number"
            disabled={isPending}
            className="bg-white/10 border-none text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Campo Visibilidad */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Eye size={16} className="text-blue-400" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest">
              Estado
            </span>
          </div>
          <FormSelect
            name="isVisible"
            disabled={isPending}
            className="bg-white/10 border-none text-white focus:ring-2 focus:ring-blue-500"
            options={[
              { value: "true", label: "Visible" },
              { value: "false", label: "Oculto" },
            ]}
          />
        </div>

      </div>
    </FormCard>
  );
};
