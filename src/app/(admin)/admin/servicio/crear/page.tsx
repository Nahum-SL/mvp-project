import PageHeader from "@/src/modules/admin/components/PageHeader";
import { ServiceForm } from "@/src/modules/admin/servicio/components/ServiceForm";

export default function NuevoServicioPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <PageHeader 
      title="Crear Nuevo Servicio"
      subtitle="Configura la oferta comercial para el selector inteligente."
       backHref="/admin/servicio"
      />
      <ServiceForm />
    </div>
  );
}
