import type { Category } from "@/src/types/blog/category";
import { handleResponse } from "@/src/lib/handle-response";
import { getBaseUrl } from "@/src/lib/get-base-url";

// Create
export async function createBlogCategoryAction(
  formData: FormData,
): Promise<Category> {
  const res = await fetch(`${getBaseUrl()}/api/admin/blog/category`, {
    method: "POST",
    body: formData,
  });
  return handleResponse<Category>(res);
}
