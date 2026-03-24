// src/app/(admin)/admin/unete/page.tsx
import { Suspense } from "react";
import { getCandidatos } from "@/src/features/admin/unete/action";
import { CandidatosTable } from "@/src/features/admin/unete/components/CandidatosTable";
import { TableSkeleton } from "@/src/components/skeletons/TableSkeleton";

export default function UneteAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">
          Postulaciones <span className="text-blue-600">RR.HH.</span>
        </h1>
        <p className="text-slate-500 text-sm font-medium">
          Gestiona el talento humano de ASESCON.
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        {/* El Skeleton aparece mientras se cargan los datos */}
        <Suspense fallback={<TableSkeleton rows={5} />}>
          <CandidatosList />
        </Suspense>
      </div>
    </div>
  );
}
// 
async function CandidatosList() {
  const candidatos = await getCandidatos();
  return <CandidatosTable data={candidatos} />;
}
