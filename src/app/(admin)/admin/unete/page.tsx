
import SectionHeader from "@/src/components/ui/SectionHeader";

// -- Icono
import { LayoutGrid } from "lucide-react";

import { UneteManagementView } from "@/src/features/admin/unete/views/unete-managament-view";

export default function UneteAdminPage() {
  return (
    <div className="space-y-10 pb-20">
      <SectionHeader 
      title="Postulaciones RR.HH."
      subtitle="Gestiona el talento humano de ASESCON"
      icon={<LayoutGrid size={32} />}
      variant="flat"
      />
      <UneteManagementView />
    </div>
  );
}
