import type { Category } from "@/src/types/blog/category";
import { handleResponse } from "@/src/lib/handle-response";

// Create
export async function createBlogCategoryAction(
  formData: FormData,
): Promise<Category> {
  const res = await fetch("/api/admin/blog/category", {
    method: "POST",
    body: formData,
  });
  return handleResponse<Category>(res);
}
