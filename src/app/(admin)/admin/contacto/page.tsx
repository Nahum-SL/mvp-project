// app/(admin)/admin/contacto/page.tsx
import SectionHeader from "@/src/features/admin/components/SectionHeader";
import { Book } from "lucide-react";

export default async function AdminContactoPage() {

  return (
    <main className="space-y-10 pb-20">
      <SectionHeader 
      title="Gestion de leads"
      subtitle="Solicitudes de asesoría y nuevos clientes"
      icon={<Book />}
      variant="flat"
      />

    </main>
  );
}
