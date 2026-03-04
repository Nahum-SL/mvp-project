import { notFound } from "next/navigation";

import { CreatePostForm } from "@/src/features/admin/blog/components/CreatePostForm";
import { getPostByIdAction, getCategories } from "@/src/features/admin/blog/action";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Paralelizamos las peticiones para máxima velocidad
  const [post, categories] = await Promise.all([
    getPostByIdAction(id),
    getCategories(),
  ]);

  if (!post) notFound();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-black italic uppercase">
          Editar <span className="text-blue-600">Artículo</span>
        </h1>
        <p className="text-slate-500">Modificando: {post.title}</p>
      </header>

      <CreatePostForm categories={categories} initialData={post} />
    </div>
  );
}
