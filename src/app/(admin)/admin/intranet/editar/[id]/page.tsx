// app/(admin)/admin/intranet/editar/[id]/page.tsx
import PageHeader from "@/src/features/admin/components/PageHeader";
import { IntranetForm } from "@/src/features/admin/intranet/components/CreateLinkForm";

export default async function EditLinkPage() {
  return (
    <main className="max-w-6xl mx-auto space-y-8">
      <PageHeader
        title="Editar Link"
        subtitle="Cambia el link de navegacion para una nueva URL"
        backHref="/admin/intranet"
      />

      <section>
        <IntranetForm />
      </section>
    </main>
  );
}
