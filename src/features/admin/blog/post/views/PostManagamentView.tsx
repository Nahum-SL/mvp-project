// features/admin/blog/post/views/PostManagementView.tsx
"use client";
import Link from "next/link";

import { useAdminPosts } from "../hooks/use-post-queries";
import { useFilteredPosts } from "../hooks/use-filtered-posts";
import { PostTable } from "../table/PostTable";
import { PostPreviewDrawer } from "../drawers/PostPreviewDrawers";
import { DeletePostModal } from "../modals/DeletePostModal";
import { FileText, Plus } from "lucide-react";

export function PostManagementView() {
  const { data: serverPosts = [], isLoading } = useAdminPosts();

  // Custom hook que procesa filtros en memoria (Zustand + useMemo)
  const posts = useFilteredPosts({ posts: serverPosts });
    
  return (
    <div className="space-y-6 container mx-auto px-4 py-6 max-w-7xl">

      {/* Tabla Central */}
      <main className="w-full">
        <PostTable posts={posts} isLoading={isLoading} />
      </main>

      {/* Overlays Pasivos Operacionales */}
      <PostPreviewDrawer />
      <DeletePostModal />
    </div>
  );
}
