import { create } from "zustand";
import type { StatusModalState, UneteStore } from "./unete.types";

const initialStatusModal: StatusModalState = {
  isOpen: false,
  applicationId: null,
  currentStatus: null,
};

export const useUneteStore = create<UneteStore>((set) => ({
  statusModal: initialStatusModal,

  openStatusModal: (payload) =>
    set({
      statusModal: {
        isOpen: true,
        applicationId: payload.id,
        currentStatus: payload.status,
      },
    }),

  closeStatusModal: () =>
    set({
      statusModal: initialStatusModal,
    }),
}));
