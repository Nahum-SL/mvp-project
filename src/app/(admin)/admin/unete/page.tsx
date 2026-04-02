// src/app/(admin)/admin/unete/page.tsx

// --- Skeleton de carga
import { TableSkeleton } from "@/src/components/skeletons/TableSkeleton";
import { Suspense } from "react";

// --- Componentes
import { CandidatosTable } from "@/src/features/admin/unete/components/CandidatosTable";
import SectionHeader from "@/src/features/admin/components/SectionHeader";

// -- Icono
import { LayoutGrid } from "lucide-react";

// --- Acciones
import { getCandidatos } from "@/src/features/admin/unete/action";

export default function UneteAdminPage() {
  return (
    <div className="space-y-10 pb-20">
      <SectionHeader 
      title="Postulaciones RR.HH."
      subtitle="Gestiona el talento humano de ASESCON"
      icon={<LayoutGrid size={32} />}
      variant="flat"
      />

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        {/* El Skeleton aparece mientras se cargan los datos */}
        <Suspense fallback={<TableSkeleton rows={5} />}>
          <CandidatosList />
        </Suspense>
      </div>
    </div>
  );
}
// Se obtiene la lista de candidatos y se renderiza la tabla. 
// El Suspense muestra el skeleton mientras se cargan los datos.
async function CandidatosList() {
  const candidatos = await getCandidatos();
  return <CandidatosTable data={candidatos} />;
}
