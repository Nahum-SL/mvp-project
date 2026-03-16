// app/(admin)/admin/intranet/nuevo/page.tsx
import PageHeader from "@/src/features/admin/components/PageHeader";
import { CreateLinkForm } from "@/src/features/admin/intranet/components/CreateLinkForm";

export default function NewLinkPage() {
  return (
    <main className="max-w-6xl mx-auto space-y-8">
      <PageHeader
        title="Crear nuevo Link"
        subtitle="Genera una url de navegacion para los colaboradores de ASESCON"
        backHref="/admin/intranet"
      />

      <section>
        <CreateLinkForm />
      </section>
    </main>
  );
}
