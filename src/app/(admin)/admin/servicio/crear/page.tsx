import { CreateServicioForm } from "@/src/features/admin/servicio/components/CreateServicesForm";
import PageHeader from "@/src/features/admin/components/PageHeader";

export default function NuevoServicioPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <PageHeader 
      title="Crear Nuevo Servicio"
      subtitle="Configura la oferta comercial para el selector inteligente."
       backHref="/admin/servicio"
      />
      <CreateServicioForm />
    </div>
  );
}
