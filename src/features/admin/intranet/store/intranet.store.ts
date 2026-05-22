import { create } from "zustand";

import type { IntranetStore } from "./intranet.type";

export const useIntranetStore = create<IntranetStore>((set) => ({
  activeLink: null,

  deleteModal: {
    isOpen: false,
    id: null,
    title: "",
  },

  setActiveLink: (link) =>
    set({
      activeLink: link,
    }),

  openDeleteModal: ({ id, title }) =>
    set({
      deleteModal: {
        isOpen: true,
        id,
        title,
      },
    }),

  closeDeleteModal: () =>
    set({
      deleteModal: {
        isOpen: false,
        id: null,
        title: "",
      },
    }),
}));
