// app/(admin)/admin/contacto/page.tsx
import SectionHeader from "@/src/components/ui/SectionHeader";
import { Book } from "lucide-react";
import { ContactAdminView } from "@/src/features/admin/contacto/views/contact-admin-view";

export default async function AdminContactoPage() {

  return (
    <main className="space-y-10 pb-20">
      <SectionHeader 
      title="Gestion de leads"
      subtitle="Solicitudes de asesoría y nuevos clientes"
      icon={<Book />}
      variant="flat"
      />
      <ContactAdminView />
    </main>
  );
}
