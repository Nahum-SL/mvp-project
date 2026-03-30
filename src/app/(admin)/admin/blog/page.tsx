// Acciones
import { getAdminPost } from "@/src/features/admin/blog/action";
// Lista
import { AdminPostList } from "@/src/features/admin/blog/components/AdminPostList";
// Diseño de carga
import { PostListSkeleton } from "@/src/features/admin/blog/components/PostListSkeleton";
import { Suspense } from "react";
// Header
import SectionHeader from "@/src/features/admin/components/SectionHeader";
import { LayoutGrid, Plus } from "lucide-react";
import Link from "next/link";

export default async function AdminBlogPage() {
  const posts = await getAdminPost();

  return (
    <div className="space-y-10 pb-20">
      <SectionHeader
        title="Gestion de Blog"
        subtitle="Administra los artículos de ASESCON."
        icon={<LayoutGrid size={32} />}
        variant="flat"
        actions={
          <Link
            href="/admin/blog/categoria"
            className="bg-slate-900 text-white hover:bg-blue-600 px-8 py-4 rounded-2xl 
            font-extrabold uppercase text-xs tracking-widest transition-all flex items-center }
            gap-2 shadow-xl shadow-blue-100"
          >
            <Plus size={18} />
            Nuevo Categoria
          </Link>
        }
        actions2={
          <Link
            href="/admin/blog/crear"
            className="bg-slate-900 text-white hover:bg-blue-600 px-8 py-4 rounded-2xl 
            font-extrabold uppercase text-xs tracking-widest transition-all flex items-center }
            gap-2 shadow-xl shadow-blue-100"
          >
            <Plus size={18} />
            Nuevo Blog
          </Link>
        }
      />

      <Suspense fallback={<PostListSkeleton />}>
        <AdminPostList posts={posts} />
      </Suspense>
    </div>
  );
}
