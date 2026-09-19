'use server';
// Manejo HTTP con el servidor backend
import { serverApiClient } from "@/src/lib/api/server-api-client";
import { ApiResponse } from "@/src/shared";
// Types
import type { Category } from "@/src/types/blog/category";


export async function getCategories(): Promise<Category[]> {
  const res = await serverApiClient<ApiResponse<Category[]>>("/blog/category");
  return res.data;
}