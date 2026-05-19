"use client";

import { useMemo } from "react";
import { usePostFilters } from "../store/post.selectors";
import type { BlogPost } from "@/src/types/blog/blogPost";

interface Props {
  posts: BlogPost[];
}

// Esto es lógica derivada compleja.
export function useFilteredPosts({ posts }: Props) {
  const filters = usePostFilters();

  return useMemo(() => {
    let data = [...posts];

    if (filters.search) {
      data = data.filter((post) =>
        post.title.toLowerCase().includes(filters.search!.toLowerCase()),
      );
    }

    if (filters.categoryId) {
      data = data.filter((post) => post.categoryId === filters.categoryId);
    }

    if (filters.published !== undefined) {
      data = data.filter((post) => post.published === filters.published);
    }

    return data;
  }, [posts, filters]);
}
