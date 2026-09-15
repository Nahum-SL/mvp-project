// Header
import SectionHeader from "@/src/components/ui/SectionHeader";
import { LayoutGrid, Plus } from "lucide-react";
import { PostManagementView } from "@/src/modules/admin/blog/post/views/PostManagamentView";
import Link from "next/link";

export default async function AdminBlogPage() {
  return (
    <div className="space-y-10 pb-20">
      <SectionHeader
        title="Gestion de Blog"
        subtitle="Administra los artículos de ASESCON."
        icon={<LayoutGrid size={32} />}
        variant="flat"
        actions={
          <Link
            href="/admin/blog/crear"
            className="bg-slate-900 text-white hover:bg-blue-600 px-8 py-4 rounded-2xl 
          font-extrabold uppercase text-xs tracking-widest transition-all flex items-center }
          gap-2 shadow-xl shadow-blue-100"
          >
            <Plus size={18} />
            Blog
          </Link>
        }
        actions2={
          <Link
            href="/admin/blog/categoria"
            className="bg-white text-sky-600 hover:bg-sky-600  hover:text-white px-8 py-4 rounded-2xl 
            font-extrabold uppercase text-xs tracking-widest transition-all flex items-center }
            gap-2 shadow-xl shadow-blue-100"
          >
            <Plus size={18} />
            Categoria
          </Link>
        }
      />
      <PostManagementView />
    </div>
  );
}
