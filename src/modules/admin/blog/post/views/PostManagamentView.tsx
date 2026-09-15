// features/admin/blog/post/views/PostManagementView.tsx
"use client";

import { useAdminPosts } from "../hooks/use-post-queries";
import { PostTable } from "../table/PostTable";
import { PostPreviewDrawer } from "../drawers/PostPreviewDrawers";
import { DeletePostModal } from "../modals/DeletePostModal";

export function PostManagementView() {
  const { data, isLoading } = useAdminPosts();

  return (
    <div className="space-y-6 container mx-auto px-4 py-6 max-w-7xl">
      {/* Tabla Central */}
      <main className="w-full">
        <PostTable posts={data?.data || []} isLoading={isLoading} />
      </main>

      {/* Overlays Pasivos Operacionales */}
      <PostPreviewDrawer />
      <DeletePostModal />
    </div>
  );
}
