import PageHeader from "@/src/features/admin/components/PageHeader";
import { PostForm } from "@/src/features/admin/blog/post/components/PostForm";
import { getPostById } from "@/src/features/admin/blog/post/api/post.query";

interface Props {
  params: Promise<{id: string}>;
}

export default async function EditPostPage({ params }: Props) {  
  const { id } = await params;
  const postId = parseInt(id);

  // Validación de seguridad por si intentan inyectar "/blog/abc" en la URL
  if (Number.isNaN(postId)) {
    throw new Error("ID invalido.");
  }

  const post = await getPostById(postId);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <PageHeader
        title="Editar blog"
        subtitle="Modificando el articulo que aparecera publicamente"
        backHref="/admin/blog"
      />
      <PostForm initialData={post} />
    </div>
  );
}
