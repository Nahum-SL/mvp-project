// src/types/api/paginated-response.ts

export interface PaginationMeta {
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
