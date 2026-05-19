import { usePostStore } from "./post.store";

// FILTRAR ACCESO DE ESTADO
export const usePostFilters = () =>
  usePostStore((state) => state.filters);

// ELIMINAR
export const useDeleteModal = () =>
  usePostStore((state) => state.deleteModal);

// OBTENER POST
export const useActivePost = () =>
  usePostStore((state) => state.activePost);

// ACCIONES PARA EL POST
export const usePostActions = () =>
  usePostStore((s) => ({
    openDeleteModal: s.openDeleteModal,
    closeDeleteModal: s.closeDeleteModal,
    setFilters: s.setFilters,
  }));
// ====================
// CAMBIOS
// ====================

// ===== ANTES =====  
// import { usePostStore } from "./post.store";

// export const usePostFilters = () =>
//   usePostStore((state) => state.filters);

// export const useDeleteModal = () =>
//   usePostStore((state) => state.deleteModal);

// export const useActivePost = () =>
//   usePostStore((state) => state.activePost);

// ===== DESPUES =====
// const modal = useDeleteModal();