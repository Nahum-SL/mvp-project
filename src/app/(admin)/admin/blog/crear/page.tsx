// Tu página quedaría así de limpia:
import PageHeader from "@/src/features/admin/components/PageHeader"; // Importas el genérico
import { PostForm } from "@/src/features/admin/blog/post/components/PostForm";

export default async function NewPostPage() {

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <PageHeader
        title="Crear nuevo Artículo"
        subtitle="Redacta contenido de valor para los clientes de ASESCON."
        backHref="/admin/blog"
      />
      <PostForm categories={[]} />
    </div>
  );
}
