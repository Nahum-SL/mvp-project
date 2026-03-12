import { CreateServicioForm } from "@/src/features/admin/servicios/components/CreateServicesForm";
import { getAdminServicioById } from "@/src/features/admin/servicios/action";
import { notFound } from "next/navigation";

export default async function EditarServicioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const servicio = await getAdminServicioById(Number(id));

  if (!servicio) notFound();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900">
          Editar Servicio
        </h1>
        <p className="text-slate-500 font-medium font-mono text-sm uppercase">
          ID: #{id}
        </p>
      </div>

      <CreateServicioForm initialData={servicio} />
    </div>
  );
}
