import { CreatePostForm } from "@/src/features/admin/blog/components/CreatePostForm";
import { getCategories } from "@/src/features/admin/blog/action";
import CardForm from "@/src/features/admin/blog/components/CardForm";
import { Suspense } from "react";

export default async function NewPostPage() {
  const categories = await getCategories();
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <Suspense fallback={"Cargando.."} >
        <CardForm />
        <CreatePostForm categories={categories}/>
      </Suspense>
    </div>
  );
}

