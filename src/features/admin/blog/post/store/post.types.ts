import type { BlogPost } from "@/src/types/blog/blogPost";

export interface PostFilters {
  published?: boolean;
  categoryId?: number;
  search: string;

  page: number;
  limit: number;
}

// =========================
// DELETE MODAL
// =========================

export interface DeleteModalState {
  isOpen: boolean;
  postId: number | null;
  postTitle: string;
}

// =========================
// PREVIEW DRAWER
// =========================

export interface PreviewDrawerState {
  isOpen: boolean;
  postId: number | null;
}

// =========================
// STORE
// =========================

export interface PostStore {
  // UI
  deleteModal: DeleteModalState;
  previewDrawer: PreviewDrawerState;

  // Active entity
  activePost: BlogPost | null;

  // Filters
  filters: PostFilters;

  // =========================
  // Modal Actions
  // =========================

  openDeleteModal: (payload: { id: number; title: string }) => void;

  closeDeleteModal: () => void;

  // =========================
  // Drawer Actions
  // =========================

  openPreviewDrawer: (id: number) => void;

  closePreviewDrawer: () => void;

  // =========================
  // Active Post Actions
  // =========================

  setActivePost: (post: BlogPost | null) => void;

  // =========================
  // Filter Actions
  // =========================

  setFilters: (filters: Partial<PostFilters>) => void;

  clearFilters: () => void;
}
