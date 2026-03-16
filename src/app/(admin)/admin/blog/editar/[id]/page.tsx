import { notFound } from "next/navigation";
import { CreatePostForm } from "@/src/features/admin/blog/components/CreatePostForm";
import { getPostByIdAction, getCategories } from "@/src/features/admin/blog/action";
import PageHeader from "@/src/features/admin/components/PageHeader";

interface Props {
  params: Promise<{id: number}>
}

export default async function EditPostPage({params}: Props) {
  const { id } = await params;

  // Paralelizamos las peticiones para máxima velocidad
  const [post, categories] = await Promise.all([
    getPostByIdAction(id),
    getCategories(),
  ]);

  if (!post) notFound();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <PageHeader 
      title="Editar blog"
      subtitle="Modificando el articulo que aparecera publicamente"
      backHref="/admin/blog"
      />

      <CreatePostForm categories={categories} initialData={post} />
    </div>
  );
}
