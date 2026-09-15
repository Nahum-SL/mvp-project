import type { Service, ServiceFilters } from "@/src/types/servicio/servicio-types";

export interface DeleteServicioModal {
  isOpen: boolean;
  serviceId: number | null;
  serviceTitle: string;
}

export interface PreviewDrawer {
  isOpen: boolean;
  serviceId: number | null;
}

export interface ServicioStore {
  // =========
  // UI
  // =========
  deleteModal: DeleteServicioModal;
  previewDrawer: PreviewDrawer;

  // =========
  // ACTIVE
  // =========
  activeService: Service | null;

  // =========
  // FILTERS
  // =========
  filters: ServiceFilters;

  // =========
  // MODAL ACTIONS
  // =========
  openDeleteModal: (props: { id: number; title: string }) => void;

  closeDeleteModal: () => void;

  // =========
  // DRAWER ACTIONS
  // =========
  openPreviewDrawer: (id: number) => void;

  closePreviewDrawer: () => void;

  // =========
  // ACTIVE ACTIONS
  // =========
  setActiveService: (service: Service | null) => void;

  // =========
  // FILTER ACTIONS
  // =========
  setFilters: (filters: Partial<ServiceFilters>) => void;

  clearFilters: () => void;
}
