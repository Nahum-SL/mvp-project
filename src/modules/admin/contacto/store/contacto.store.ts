// src/features/admin/contacto/store/contacto.store.ts
"use client";

import { create } from "zustand";
import type { ContactoStore, ContactFilters } from "./contacto.types";

const defaultFilters: ContactFilters = {
  status: undefined,
  search: "",
};

export const useContactoStore = create<ContactoStore>((set) => ({
  // =========
  // UI STATE
  // =========
  deleteModal: {
    isOpen: false,
    contactId: null,
    contactName: "",
  },

  // =========
  // ACTIVE
  // =========
  activeContact: null,

  // =========
  // FILTERS
  // =========
  filters: defaultFilters,

  // =========
  // ACTIONS
  // =========
  actions: {
    openDeleteModal: ({ id, name }) =>
      set({
        deleteModal: {
          isOpen: true,
          contactId: id,
          contactName: name,
        },
      }),

    closeDeleteModal: () =>
      set((state) => ({
        deleteModal: {
          ...state.deleteModal,
          isOpen: false,
          contactId: null,
          contactName: "",
        },
      })),

    setActiveContact: (contact) =>
      set({
        activeContact: contact,
      }),

    setFilters: (newFilters) =>
      set((state) => ({
        filters: {
          ...state.filters,
          ...newFilters,
        },
      })),

    clearFilters: () =>
      set({
        filters: defaultFilters,
      }),
  },
}));
