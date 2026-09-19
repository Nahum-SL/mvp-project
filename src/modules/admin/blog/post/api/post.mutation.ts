'use server';

import { serverApiClient } from "@/src/lib/api/server-api-client";
import { ApiResponse } from "@/src/shared";
import { BlogPost } from "@/src/types/blog/blogPost";

// Create
export async function createPost(formData: FormData): Promise<BlogPost> {
  const res = await serverApiClient<ApiResponse<BlogPost>>(`/post`, {
    method: "POST",
    body: formData,
  });
  return res.data;
}

// Update
export async function updatePost(
  id: number,
  formData: FormData,
): Promise<BlogPost> {
  const res = await serverApiClient<ApiResponse<BlogPost>>(`/post/${id}`, {
    method: "PATCH",
    body: formData,
  });
  return res.data;
}

// Delete
export async function deletePost(id: number): Promise<void> {
  const res = await serverApiClient<ApiResponse<void>>(`/post/${id}`, {
    method: "DELETE",
  });
  return res.data;
}
