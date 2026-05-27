"use client";

import { useMemo } from "react";

import { usePostFilters } from "../store/post.selectors";
import { filterPosts } from "../utils/filter-post";

import type { BlogPost } from "@/src/types/blog/blogPost";

interface Props {
  posts: BlogPost[];
}

export function useFilteredPosts({ posts }: Props) {
  const filters = usePostFilters();

  return useMemo(() => filterPosts(posts, filters), [posts, filters]);
}
