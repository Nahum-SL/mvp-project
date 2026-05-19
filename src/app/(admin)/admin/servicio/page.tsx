// src/app/admin/servicios/page.tsx
import Link from "next/link";
import { Plus, Layers } from "lucide-react";
import { getAdminServicios } from "@/src/features/admin/_servicio/action";
import { ServiciosTable } from "@/src/features/admin/_servicio/components/ServiciosTable";
import SectionHeader from "@/src/features/admin/components/SectionHeader";

export default async function AdminServiciosPage() {
  const servicios = await getAdminServicios();

  return (
    <main className="space-y-10 pb-20">
      {/* Header de la sección */}
      <SectionHeader
        title="Portafolio de Servicios"
        subtitle="Gestiona la oferta comercial y el selector inteligente de Asescon."
        icon={<Layers size={32}/>}
        variant="flat"
        actions={
          <Link
            href="/admin/servicio/crear"
            className="bg-slate-900 text-white hover:bg-blue-600 px-8 py-4 rounded-2xl 
            font-extrabold uppercase text-xs tracking-widest transition-all flex items-center }
            gap-2 shadow-xl shadow-blue-100"
          >
            <Plus size={18} /> Nuevo Servicio
          </Link>
        }
      />
      {/* Tabla de Gestión */}
      <section className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <ServiciosTable initialData={servicios} />
      </section>
    </main>
  );
}
