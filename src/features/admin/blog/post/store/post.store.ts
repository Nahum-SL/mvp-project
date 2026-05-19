"use client";

import { create } from "zustand";

import type { PostStore, PostFilters } from "./post.types";

const defaultFilters: PostFilters = {
  published: undefined,
  categoryId: undefined,
  search: "",
};

export const usePostStore = create<PostStore>((set) => ({
  // =========
  // UI
  // =========
  deleteModal: {
    isOpen: false,
    postId: null,
    postTitle: "",
  },

  // =========
  // ACTIVE
  // =========
  activePost: null,

  // =========
  // FILTERS
  // =========
  filters: defaultFilters,

  // =========
  // MODAL ACTIONS
  // =========
  openDeleteModal: ({ id, title }) =>
    set({
      deleteModal: {
        isOpen: true,
        postId: id,
        postTitle: title,
      },
    }),

  closeDeleteModal: () =>
    set((state) => ({
      deleteModal: {
        ...state.deleteModal,
        isOpen: false,
        postId: null,
        postTitle: "",
      },
    })),

  // =========
  // ACTIVE ACTIONS
  // =========
  setActivePost: (post) =>
    set({
      activePost: post,
    }),

  // =========
  // FILTER ACTIONS
  // =========
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
