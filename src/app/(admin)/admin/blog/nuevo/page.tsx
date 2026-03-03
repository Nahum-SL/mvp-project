import { CreatePostForm } from "@/src/features/admin/blog/components/CreatePostForm";
import { getCategories } from "@/src/features/admin/blog/action";
import CardForm from "@/src/features/admin/blog/components/CardForm";

export default async function NewPostPage() {
  // Obtenemos las categorías. Si getCategories falla, nos devuelve []
  const categories = await getCategories();
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <CardForm />
      <CreatePostForm categories={categories} />
    </div>
  );
}
