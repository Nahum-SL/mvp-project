import { useShallow } from "zustand/react/shallow";

import { usePostStore } from "./post.store";

// =========================
// STATE
// =========================

export const usePostFilters = () =>
  usePostStore((state) => state.filters);

export const useDeleteModal = () =>
  usePostStore((state) => state.deleteModal);

export const usePreviewDrawer = () =>
  usePostStore((state) => state.previewDrawer);

export const useActivePost = () =>
  usePostStore((state) => state.activePost);

// =========================
// ACTIONS
// =========================

export const usePostActions = () =>
  usePostStore(
    useShallow((state) => ({
      // Delete Modal
      openDeleteModal: state.openDeleteModal,
      closeDeleteModal: state.closeDeleteModal,

      // Preview Drawer
      openPreviewDrawer: state.openPreviewDrawer,
      closePreviewDrawer: state.closePreviewDrawer,

      // Active
      setActivePost: state.setActivePost,

      // Filters
      setFilters: state.setFilters,
      clearFilters: state.clearFilters,
    })),
  );