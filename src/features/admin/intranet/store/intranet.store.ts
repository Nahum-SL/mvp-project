// features/admin/intranet/store/intranet.store.ts
import { create } from "zustand";

import type { DeleteModalState, IntranetStore } from "./intranet.types";

const initialDeleteModal: DeleteModalState = {
  isOpen: false,
  id: null,
  title: "",
};

export const useIntranetStore = create<IntranetStore>((set) => ({
  // =====================
  // PREVIEW DRAWER
  // =====================
  previewDrawer: {
    isOpen: false,
    linkId: null,
  },

  openPreviewDrawer: (id) =>
    set({
      previewDrawer: {
        isOpen: true,
        linkId: id,
      },
    }),

  closePreviewDrawer: () =>
    set({
      previewDrawer: {
        isOpen: false,
        linkId: null,
      },
    }),

  // =====================
  // DELETE MODAL
  // =====================
  deleteModal: initialDeleteModal,

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
      deleteModal: initialDeleteModal,
    }),
}));
