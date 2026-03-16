// Tu página quedaría así de limpia:
import { CreatePostForm } from "@/src/features/admin/blog/components/CreatePostForm";
import { getCategories } from "@/src/features/admin/blog/action";
import PageHeader from "@/src/features/admin/components/PageHeader"; // Importas el genérico
import { Suspense } from "react";

export default async function NewPostPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <PageHeader
        title="Crear nuevo Artículo"
        subtitle="Redacta contenido de valor para los clientes de ASESCON."
        backHref="/admin/blog"
      />

      <Suspense fallback={"Cargando.."}>
        <CreatePostForm categories={categories} />
      </Suspense>
    </div>
  );
}
