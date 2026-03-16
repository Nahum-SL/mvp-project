import { CreateServicioForm } from "@/src/features/admin/servicios/components/CreateServicesForm";
import { getAdminServicioById } from "@/src/features/admin/servicios/action";
import { notFound } from "next/navigation";
import PageHeader from "@/src/features/admin/components/PageHeader";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditarServicioPage({ params }: Props) {
  const { id } = await params;
  const servicio = await getAdminServicioById(Number(id));

  if (!servicio) notFound();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <PageHeader
        title="Editar Servicio"
        subtitle="Reformula el servicio comercial para el selector inteligente"
        backHref="/admin/servicios"
      />
      <CreateServicioForm initialData={servicio} />
    </div>
  );
}
