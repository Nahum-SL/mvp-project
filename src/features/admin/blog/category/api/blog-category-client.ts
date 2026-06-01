import type { Category } from "@/src/types/blog/category";
import { handleResponse } from "@/src/lib/handle-response";
import { getBaseUrl } from "@/src/lib/get-base-url";

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${getBaseUrl()}/api/admin/blog/category`);
  return handleResponse<Category[]>(res);
}