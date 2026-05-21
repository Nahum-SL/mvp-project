// src/features/admin/contacto/store/contacto.types.ts
import type {
  Contacto,
  ContactStatus,
} from "@/src/types/contacto/contacto-type";

export interface ContactFilters {
  status?: ContactStatus;
  search?: string;
}

export interface DeleteContactModalState {
  isOpen: boolean;
  contactId: string | null;
  contactName: string;
}

export interface ContactoStore {
  // =========
  // UI STATE
  // =========
  deleteModal: DeleteContactModalState;

  // =========
  // ACTIVE
  // =========
  activeContact: Contacto | null;

  // =========
  // FILTERS
  // =========
  filters: ContactFilters;

  // =========
  // ACTIONS
  // =========
  actions: {
    openDeleteModal: (data: { id: string; name: string }) => void;
    closeDeleteModal: () => void;
    setActiveContact: (contact: Contacto | null) => void;
    setFilters: (filters: Partial<ContactFilters>) => void;
    clearFilters: () => void;
  };
}
