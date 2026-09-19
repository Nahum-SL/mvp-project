// app/(admin)/admin/contacto/page.tsx
// Header Component
import SectionHeader from "@/src/components/ui/SectionHeader";
// Icono
import { Book } from "lucide-react";
// View
import { ContactAdminView } from "@/src/modules/admin/contacto/views/contact-admin-view";

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
