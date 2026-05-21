"use client";

import { X } from "lucide-react";

import {
  useActiveContact,
  useContactActions,
} from "../store/contacto.selector";

import { ContactStatusFormView } from "./ContactStatusView";

export function ContactDrawer() {
  const activeContact = useActiveContact();
  const { setActiveContact } = useContactActions();

  if (!activeContact) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md h-full bg-white shadow-xl p-6">
        <div className="flex items-center justify-between pb-4 border-b">
          <div>
            <h3 className="text-lg font-semibold">
              Gestionar Contacto
            </h3>

            <p className="text-sm text-gray-500">
              {activeContact.name}
            </p>
          </div>

          <button onClick={() => setActiveContact(null)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <ContactStatusFormView />
      </div>
    </div>
  );
}