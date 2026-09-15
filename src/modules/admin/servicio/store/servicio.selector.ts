import { useShallow } from "zustand/react/shallow";
import { useServicioStore } from "./servicio.store";

// FILTERS
export const useServicioFilters = () =>
  useServicioStore((state) => state.filters);

// DELETE MODAL
export const useDeleteServicioModal = () =>
  useServicioStore((state) => state.deleteModal);

// PREVIEW DRAWER
export const usePreviewDrawer = () =>
  useServicioStore((state) => state.previewDrawer);

// ACTIVE
export const useActiveService = () =>
  useServicioStore((state) => state.activeService);

// ACTIONS
export const useServicioActions = () =>
  useServicioStore(
    useShallow((state) => ({
      openDeleteModal: state.openDeleteModal,
      closeDeleteModal: state.closeDeleteModal,

      openPreviewDrawer: state.openPreviewDrawer,
      closePreviewDrawer: state.closePreviewDrawer,

      setActiveService: state.setActiveService,

      setFilters: state.setFilters,
      clearFilters: state.clearFilters,
    })),
  );
