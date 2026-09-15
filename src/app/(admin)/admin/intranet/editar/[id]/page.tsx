// app/(admin)/admin/intranet/editar/[id]/page.tsx
import PageHeader from "@/src/modules/admin/components/PageHeader";
import { IntranetForm } from "@/src/modules/admin/intranet/components/IntranetForm";
import { getIntranetLinkById } from "@/src/modules/admin/intranet/api/intranet.query";

interface Props {
  params: Promise<{ id: string }>; // Asegura que el ID se reciba como una promesa resuelta
}

export default async function EditLinkPage({ params }: Props) {
  const { id } = await params;
  const linkId = parseInt(id);
  // Validación de seguridad por si intentan inyectar "/intranet/abc" en la URL
  if (Number.isNaN(linkId)) {
    throw new Error("ID invalido.");
  }

  const link = await getIntranetLinkById(linkId);

  return (
    <main className="max-w-6xl mx-auto space-y-8">
      <PageHeader
        title="Editar Link"
        subtitle="Cambia el link de navegacion para una nueva URL"
        backHref="/admin/intranet"
      />

      <section>
        <IntranetForm initialData={link} />
      </section>
    </main>
  );
}
