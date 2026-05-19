import type { Category } from "@/src/types/blog/category";
import { handleResponse } from "@/src/lib/handle-response";

export async function getCategories(): Promise<Category[]> {
  const res = await fetch("/api/admin/blog/category");
  return handleResponse<Category[]>(res);
}