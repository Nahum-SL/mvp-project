// src/app/admin/servicios/page.tsx
import Link from "next/link";
import { Plus, LayoutGrid } from "lucide-react";
import { getAdminServicios } from "@/src/features/admin/servicios/action";
import { ServiciosTable } from "@/src/features/admin/servicios/components/ServiciosTable";

export default async function AdminServiciosPage() {
  const servicios = await getAdminServicios();

  return (
    <main className="space-y-10 pb-20">
      {/* Header de la sección */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 flex items-center gap-3">
            <LayoutGrid className="text-blue-600" size={32} />
            Portafolio de Servicios
          </h1>
          <p className="text-slate-500 font-medium">
            Gestiona la oferta comercial y el selector inteligente de Asescon.
          </p>
        </div>

        <Link
          href="/admin/servicios/crear"
          className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl shadow-blue-100"
        >
          <Plus size={18} />
          Nuevo Servicio
        </Link>
      </header>

      {/* Tabla de Gestión */}
      <section className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <ServiciosTable initialData={servicios} />
      </section>
    </main>
  );
}
