import { useUneteStore } from "./unete.store";
import { useShallow } from "zustand/react/shallow";
// ==========================================
// SELECTORES DE ESTADO (Individuales)
// ==========================================

export const useStatusModal = () => 
    useUneteStore((state) => state.statusModal);

// ==========================================
// SELECTORES DE ESTADO (Acciones)
// ==========================================

export const useUneteActions = () =>
  useUneteStore(
    useShallow((state) => ({
      openStatusModal: state.openStatusModal,
      closeStatusModal: state.closeStatusModal,
    }))
  );