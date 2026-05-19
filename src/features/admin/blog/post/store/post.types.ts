import type { BlogPost } from "@/src/types/blog/blogPost";

export interface PostFilters {
  published?: boolean;
  categoryId?: number;
  search?: string;
}

export interface DeleteModalState {
  isOpen: boolean;
  postId: number | null;
  postTitle: string;
}

export interface PostStore {
  // =========
  // UI STATE
  // =========
  deleteModal: DeleteModalState;

  // =========
  // ACTIVE
  // =========
  activePost: BlogPost | null;

  // =========
  // FILTERS
  // =========
  filters: PostFilters;

  // =========
  // MODAL ACTIONS
  // =========
  openDeleteModal: (data: { id: number; title: string }) => void;

  closeDeleteModal: () => void;

  // =========
  // ACTIVE ACTIONS
  // =========
  setActivePost: (post: BlogPost | null) => void;

  // =========
  // FILTER ACTIONS
  // =========
  setFilters: (filters: Partial<PostFilters>) => void;

  clearFilters: () => void;
}
