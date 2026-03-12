import { CreateServicioForm } from "@/src/features/admin/servicios/components/CreateServicesForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NuevoServicioPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Link
        href="/admin/servicios"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors font-bold text-xs uppercase tracking-widest"
      >
        <ChevronLeft size={16} /> Volver al listado
      </Link>

      <div className="space-y-2">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900">
          Crear Nuevo Servicio
        </h1>
        <p className="text-slate-500 font-medium">
          Configura la oferta comercial para el selector inteligente.
        </p>
      </div>

      <CreateServicioForm />
    </div>
  );
}
