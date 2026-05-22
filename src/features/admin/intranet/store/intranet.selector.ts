import { useShallow } from "zustand/react/shallow";
import { useIntranetStore } from "./intranet.store";

export const useActiveLink = () =>
  useIntranetStore((state) => state.activeLink);

export const useDeleteModal = () =>
  useIntranetStore((state) => state.deleteModal);

// useShallow evita re-renders innecesarios en la tabla o lista principal.
export const useIntranetActions = () =>
  useIntranetStore(
    useShallow((state) => ({
      setActiveLink: state.setActiveLink,

      openDeleteModal: state.openDeleteModal,

      closeDeleteModal: state.closeDeleteModal,
    })),
  );
