"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User as UserIcon, Trash2, Edit3 } from "lucide-react";
import { BlogPost } from "@/src/types/blog/blogPost";
import { DeletePostModal } from "./DeletePostModal"; // El que creamos antes

export const AdminPostList = ({ posts }: { posts: BlogPost[] }) => {
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    title: string;
  } | null>(null);

  return (
    <div className="grid grid-cols-1 gap-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center gap-6 hover:shadow-md transition-shadow group"
        >
          {/* Miniatura */}
          <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="64px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 text-[10px] uppercase font-bold">
                Sin foto
              </div>
            )}
          </div>

          {/* Contenido */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                {post.category?.name || "General"}
              </span>
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${post.published ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"}`}
              >
                {post.published ? "Publicado" : "Borrador"}
              </span>
            </div>
            <h3 className="font-bold text-slate-900 truncate text-lg group-hover:text-blue-600 transition-colors">
              {post.title}
            </h3>
            <div className="flex items-center gap-4 text-slate-400 text-sm mt-1">
              <span className="flex items-center gap-1.5">
                <UserIcon size={14} /> {post.author?.name}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex gap-2">
            <Link
              href={`/admin/blog/editar/${post.id}`}
              className="p-3 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
            >
              <Edit3 size={18} />
            </Link>
            <button
              onClick={() =>
                setDeleteTarget({ id: Number(post.id), title: post.title })
              }
              className="p-3 bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}

      <DeletePostModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        postId={deleteTarget?.id || 0}
        postTitle={deleteTarget?.title || ""}
      />
    </div>
  );
};
