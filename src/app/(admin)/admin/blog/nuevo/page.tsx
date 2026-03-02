import { CreatePostForm } from "@/src/features/admin/blog/components/CreatePostForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewPostPage() {

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/blog"
          className="p-3 bg-white rounded-full border border-slate-100 text-slate-400 hover:text-blue-600 transition-all"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">
            Crear nuevo <span className="text-blue-600">Artículo</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Redacta contenido de valor para los clientes de ASESCON.
          </p>
        </div>
      </div>

      <CreatePostForm categories={categories} />
    </div>
  );
}
