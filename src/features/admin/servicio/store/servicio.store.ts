"use client";
import { create } from "zustand";
import type { ServicioStore,  } from "./servicio.types";

import type { ServiceFilters } from "@/src/types/servicio/servicio-types";

const defaultFilters: ServiceFilters = {
  businessType: undefined,
  painPoint: undefined,
  search: "",
};

export const useServicioStore = create<ServicioStore>((set) => ({
  // =========
  // UI
  // =========
  deleteModal: {
    isOpen: false,
    serviceId: null,
    serviceTitle: "",
  },

  previewDrawer: {
    isOpen: false,
    serviceId: null,
  },

  // =========
  // ACTIVE
  // =========
  activeService: null,

  // =========
  // FILTERS
  // =========
  filters: defaultFilters,

  // =========
  // MODAL ACTIONS
  // =========
  openDeleteModal: ({ id, title }) =>
    set({
      deleteModal: {
        isOpen: true,
        serviceId: id,
        serviceTitle: title,
      },
    }),

  closeDeleteModal: () =>
    set((state) => ({
      deleteModal: {
        ...state.deleteModal,
        isOpen: false,
        serviceId: null,
        serviceTitle: "",
      },
    })),

  // =========
  // DRAWER ACTIONS
  // =========
  openPreviewDrawer: (id) =>
    set({
      previewDrawer: {
        isOpen: true,
        serviceId: id,
      },
    }),

  closePreviewDrawer: () =>
    set({
      previewDrawer: {
        isOpen: false,
        serviceId: null,
      },
    }),

  // =========
  // ACTIVE ACTIONS
  // =========
  setActiveService: (service) =>
    set({
      activeService: service,
    }),

  // =========
  // FILTER ACTIONS
  // =========
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
}));
