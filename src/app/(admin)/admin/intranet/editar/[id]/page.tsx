// app/(admin)/admin/intranet/editar/[id]/page.tsx
import { notFound } from "next/navigation";
import { CreateLinkForm } from "@/src/features/admin/intranet/components/CreateLinkForm";
import PageHeader from "@/src/features/admin/components/PageHeader";
import { getLinkById } from "@/src/features/admin/intranet/action";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditLinkPage({ params }: Props) {
  const { id } = await params;
  const linkData = await getLinkById(id);

  if (!linkData) notFound();

  return (
    <main className="max-w-6xl mx-auto space-y-8">
      <PageHeader
        title="Editar Link"
        subtitle="Cambia el link de navegacion para una nueva URL"
        backHref="/admin/intranet"
      />

      {/* Pasamos initialData para que el formulario sepa que es una edición */}
      <CreateLinkForm initialData={linkData} />
    </main>
  );
}
