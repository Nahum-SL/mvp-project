"use client";

import { create } from "zustand";

import type { PostStore, PostFilters } from "./post.types";

const defaultFilters: PostFilters = {
  published: undefined,
  categoryId: undefined,
  search: "",
};

export const usePostStore = create<PostStore>((set) => ({
  // =========================
  // UI
  // =========================

  deleteModal: {
    isOpen: false,
    postId: null,
    postTitle: "",
  },

  previewDrawer: {
    isOpen: false,
    postId: null,
  },

  // =========================
  // ACTIVE ENTITY
  // =========================

  activePost: null,

  // =========================
  // FILTERS
  // =========================

  filters: defaultFilters,

  // =========================
  // DELETE MODAL ACTIONS
  // =========================

  openDeleteModal: ({ id, title }) =>
    set({
      deleteModal: {
        isOpen: true,
        postId: id,
        postTitle: title,
      },
    }),

  closeDeleteModal: () =>
    set({
      deleteModal: {
        isOpen: false,
        postId: null,
        postTitle: "",
      },
    }),

  // =========================
  // PREVIEW DRAWER ACTIONS
  // =========================

  openPreviewDrawer: (id) =>
    set({
      previewDrawer: {
        isOpen: true,
        postId: id,
      },
    }),

  closePreviewDrawer: () =>
    set({
      previewDrawer: {
        isOpen: false,
        postId: null,
      },
    }),

  // =========================
  // ACTIVE POST ACTIONS
  // =========================

  setActivePost: (post) =>
    set({
      activePost: post,
    }),

  // =========================
  // FILTER ACTIONS
  // =========================

  setFilters: (newFilters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    })),

  clearFilters: () =>
    set({
      filters: defaultFilters,
    }),
}));
