export interface DeleteModalState {
  isOpen: boolean;
  id: number | null;
  title: string;
}

// PreviewDrawer --> Para controlar este Drawer de previsualización sin alterar las URL
export interface IntranetStore {
  previewDrawer: {
    isOpen: boolean;
    linkId: number | null;
  };
  openPreviewDrawer: (id: number) => void;
  closePreviewDrawer: () => void;

  deleteModal: DeleteModalState;

  openDeleteModal: (payload: { id: number; title: string }) => void;

  closeDeleteModal: () => void;
}
