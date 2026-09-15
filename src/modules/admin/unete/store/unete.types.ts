import type { JobAppStatus } from "@/src/types/unete/unete-types";

export interface StatusModalState {
  isOpen: boolean;
  applicationId: string | null;
  currentStatus: JobAppStatus | null;
}

export interface UneteStore {
  statusModal: StatusModalState;

  openStatusModal: (payload: { id: string; status: JobAppStatus }) => void;

  closeStatusModal: () => void;
}
