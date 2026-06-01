import { CategoryForm } from "@/src/features/admin/blog/category/components/CategoryForm";
import SectionHeader from "@/src/components/ui/SectionHeader";
import { LayoutGrid } from "lucide-react";

export default function AdmCreateCategory() {
    return (
      <div>
        <SectionHeader
          title="Crear Categoria"
          subtitle="Agrega una nueva categoria para los artículos de ASESCON."
          icon={<LayoutGrid size={32} />}
          variant="flat"
        />
        <CategoryForm />
      </div>
    )
}