'use server';
import { serverApiClient } from "@/src/lib/api/server-api-client";
import { ApiResponse, PaginatedResponse } from "@/src/shared";
import type { Category } from "@/src/types/blog/category";

// Create
export async function createBlogCategoryAction(
  formData: FormData,
): Promise<PaginatedResponse<Category>> {
  const res = await serverApiClient<ApiResponse<PaginatedResponse<Category>>>("/blog/category", {
    method: "POST",
    body: formData,
  });
  return res.data;
}
