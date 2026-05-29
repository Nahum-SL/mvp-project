import PageHeader from "@/src/features/admin/components/PageHeader";
import { ServiceForm } from "@/src/features/admin/servicio/components/ServiceForm";
import { getAdminServiceById } from "@/src/features/admin/servicio/api/servicio.query";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditarServicioPage({ params }: Props) {
  const { id } = await params;
  const service = await getAdminServiceById(Number(id));
  
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <PageHeader
        title="Editar Servicio"
        subtitle="Reformula el servicio comercial para el selector inteligente"
        backHref="/admin/servicio"
      />
      <ServiceForm initialData={service} />
    </div>
  );
}
