import type { IntranetLink } from "@/src/types/intranet/intranet-types";

export interface DeleteModalState {
  isOpen: boolean;
  id: number | null;
  title: string;
}

export interface IntranetStore {
  activeLink: IntranetLink | null;

  deleteModal: DeleteModalState;

  setActiveLink: (link: IntranetLink | null) => void;

  openDeleteModal: (payload: { id: number; title: string }) => void;

  closeDeleteModal: () => void;
}
