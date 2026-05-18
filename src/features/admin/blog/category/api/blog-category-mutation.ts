import type { Category } from "@/src/types/blog/category";

// Create
export async function createBlogCategoryAction(formData: FormData): Promise<Category> {
  const res = await fetch("/api/admin/blog/category", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);

    throw new Error(error?.message ?? "Error creando categoria");
  }

  return res.json();
}