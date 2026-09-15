
import { BlogPost } from "@/src/types/blog/blogPost";
import { handleResponse } from "@/src/lib/handle-response";
import { API_URL } from "@/src/lib/api-url";

// Create
export async function createPost(formData: FormData): Promise<BlogPost> {
  const res = await fetch(`${API_URL}/post`, {
    method: "POST",
    body: formData,
  });
  return handleResponse<BlogPost>(res);
}

// Update
export async function updatePost(
  id: number,
  formData: FormData,
): Promise<BlogPost> {
const res = await fetch(`${API_URL}/post/${id}`, {
    method: "PATCH",
    body: formData,
  });
  return handleResponse<BlogPost>(res);
}

// Delete
export async function deletePost(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/post/${id}`, {
    method: "DELETE",
  });
  return handleResponse<void>(res);
}
