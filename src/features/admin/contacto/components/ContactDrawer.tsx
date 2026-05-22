"use client";
import {
  useActiveContact,
  useContactActions,
} from "../store/contacto.selector";
import { Drawer } from "@/src/components/ui/drawer/Drawer";
import { ContactStatusFormView } from "./ContactStatusView";

// ====================
// USAR en el ContactAdminPage
// ====================
export function ContactDrawer() {
  const activeContact = useActiveContact();
  const { setActiveContact } = useContactActions();
  return (
    <Drawer
      isOpen={!!activeContact}
      onClose={() => setActiveContact(null)}
      title="Gestionar Contacto"
      subtitle={activeContact?.name}
    >
      <ContactStatusFormView />
    </Drawer>
  );
}
