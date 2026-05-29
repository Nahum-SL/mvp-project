import PageHeader from "@/src/features/admin/components/PageHeader";


export default async function EditarServicioPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <PageHeader
        title="Editar Servicio"
        subtitle="Reformula el servicio comercial para el selector inteligente"
        backHref="/admin/servicio"
      />
    </div>
  );
}
