// features/admin/intranet/store/intranet.selector.ts
import { useShallow } from "zustand/react/shallow";
import { useIntranetStore } from "./intranet.store";

// ==========================================
// SELECTORES DE ESTADO (Individuales)
// ==========================================

// Escucha únicamente los cambios del modal de borrado
export const useDeleteModal = () =>
  useIntranetStore((state) => state.deleteModal);

// Escucha únicamente los cambios del panel de previsualización
export const usePreviewDrawer = () =>
  useIntranetStore((state) => state.previewDrawer);

export const usePreviewDrawerOpen = () =>
  useIntranetStore((s) => s.previewDrawer.isOpen);

export const usePreviewDrawerLinkId = () =>
  useIntranetStore((s) => s.previewDrawer.linkId);

// ==========================================
// SELECTOR DE ACCIONES (Agrupado con useShallow)
// ==========================================

/**
 * Agrupa todas las funciones disparadoras del store.
 * Al usar useShallow, tus componentes pueden extraer solo lo que necesitan
 * sin provocar renderizados accidentales en cascada.
 */
export const useIntranetActions = () =>
  useIntranetStore(
    useShallow((state) => ({

      openPreviewDrawer: state.openPreviewDrawer,
      closePreviewDrawer: state.closePreviewDrawer,

      openDeleteModal: state.openDeleteModal,
      closeDeleteModal: state.closeDeleteModal,
    })),
  );

// Recomendación importante a futuro Más adelante separa
// state selectors
// de: action selectors

// como ya empezaste a hacer.
// Eso evita rerenders accidentales.
// Tu patrón actual ya va hacia eso.