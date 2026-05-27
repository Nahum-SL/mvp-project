import PageHeader from "@/src/features/admin/components/PageHeader";

export default async function EditPostPage() {

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <PageHeader 
      title="Editar blog"
      subtitle="Modificando el articulo que aparecera publicamente"
      backHref="/admin/blog"
      />

    </div>
  );
}
