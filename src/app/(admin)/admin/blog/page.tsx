import Image from "next/image";
import Link from "next/link";
import { Plus, BookOpen, Calendar, User as UserIcon } from "lucide-react";
import { getAdminPost } from "@/src/features/admin/blog/action";
import { BlogPost } from "@/src/types/blog/blogPost";

export default async function AdminBlogPage() {
  const posts = await getAdminPost();
  console.log("POSTS RECIBIDOS:", JSON.stringify(posts, null, 2));
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
            Gestión de <span className="text-blue-600">Blog</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Administra los artículos y noticias de ASESCON.
          </p>
        </div>

        {/* Prueba de botones */}
        <Link
          href="/admin/blog/nuevo"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-100"
        >
          <Plus size={20} />
          Nuevo Artículo
        </Link>
        <Link
          href="/admin/blog/categoria"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-100"
        >
          <Plus size={20} />
          Nueva Categoria
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-20 text-center">
          <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="text-slate-300" size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            No hay artículos aún
          </h3>
          <p className="text-slate-500 mb-6">
            Comienza redactando contenido de valor para tus clientes.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post: BlogPost) => (
            <div
              key={post.id}
              className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center gap-6 hover:shadow-md transition-shadow"
            >
              {/* Miniatura */}
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                    Sin imagen
                  </div>
                )}
              </div>

              {/* Contenido */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                    {post.category?.name || "General"}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${post.published ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"}`}
                  >
                    {post.published ? "Publicado" : "Borrador"}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 truncate text-lg">
                  {post.title}
                </h3>
                <div className="flex items-center gap-4 text-slate-400 text-sm mt-1">
                  <span className="flex items-center gap-1.5">
                    <UserIcon size={14} /> {post.author?.name}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />{" "}
                    {new Date(post.createAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex gap-2">
                <Link
                  href={`/admin/blog/editar/${post.id}`}
                  className="p-2 hover:bg-slate-50 text-slate-400 hover:text-blue-600 rounded-lg transition-colors"
                >
                  Editar
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
