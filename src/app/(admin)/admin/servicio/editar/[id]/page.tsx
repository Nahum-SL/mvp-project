import { CreateServicioForm } from "@/src/features/admin/servicio/components/CreateServicesForm";
import { getServicioById } from "@/src/features/admin/servicio/action";
import { notFound } from "next/navigation";
import PageHeader from "@/src/features/admin/components/PageHeader";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditarServicioPage({ params }: Props) {
  const { id } = await params;
  const servicio = await getServicioById(Number(id));

  if (!servicio) notFound();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <PageHeader
        title="Editar Servicio"
        subtitle="Reformula el servicio comercial para el selector inteligente"
        backHref="/admin/servicio"
      />
      <CreateServicioForm initialData={servicio} />
    </div>
  );
}
