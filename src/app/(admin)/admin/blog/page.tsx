import { Plus } from "lucide-react";
import Link from "next/link";
import { getAdminPost } from "@/src/features/admin/blog/action";
import { AdminPostList } from "@/src/features/admin/blog/components/AdminPostList";

export default async function AdminBlogPage() {
  const posts = await getAdminPost();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
            Gestión de <span className="text-blue-600">Blog</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Administra los artículos de ASESCON.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin/blog/categoria"
            className="hidden md:flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-6 py-3 rounded-xl font-bold transition-all"
          >
            Categorías
          </Link>
          <Link
            href="/admin/blog/nuevo"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-100"
          >
            <Plus size={20} /> Nuevo Artículo
          </Link>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center p-20 border-2 border-dashed rounded-[3rem]">
          ...
        </div>
      ) : (
        <AdminPostList posts={posts} />
      )}
    </div>
  );
}
