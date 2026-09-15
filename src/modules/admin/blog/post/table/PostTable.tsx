// features/admin/blog/post/table/PostTable.tsx
"use client";

import type { BlogPost } from "@/src/types/blog/blogPost";
import { PostRow } from "./PostRow";
import { Table } from "@/src/components/ui/table/Table";
import { LoadingState } from "@/src/components/ui/states/LoadingState";
import { EmptyState } from "@/src/components/ui/states/EmptyState";
import { FileText } from "lucide-react";
import { AnimatePresence } from "framer-motion";

interface Props {
  posts: BlogPost[];
  isLoading: boolean;
}

export function PostTable({ posts, isLoading }: Props) {
  const headers = [
    "Artículo informativo",
    "Categoría",
    "Estado",
    "Publicación",
    "Acciones",
  ];

  return (
    <Table
      headers={headers}
      isLoading={isLoading}
      isEmpty={posts.length === 0}
      loadingComponent={
        <LoadingState message="Recuperando biblioteca de artículos..." />
      }
      emptyComponent={
        <EmptyState
          icon={FileText}
          title="No hay publicaciones"
          description="Comienza a redactar tu primer artículo de valor para el blog corporativo."
        />
      }
    >
      <AnimatePresence mode="popLayout">
        {posts.map((post) => (
          <PostRow key={post.id} post={post} />
        ))}
      </AnimatePresence>
    </Table>
  );
}
