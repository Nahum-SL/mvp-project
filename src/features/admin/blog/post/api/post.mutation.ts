
import { BlogPost } from "@/src/types/blog/blogPost";
import { handleResponse } from "@/src/lib/handle-response";

// Create
export async function createPostAction(formData: FormData): Promise<BlogPost> {
  const res = await fetch("/api/admin/blog/post", {
    method: "POST",
    body: formData,
  });
  return handleResponse<BlogPost>(res);
}

// Update
export async function updatePostAction(
  id: number,
  formData: FormData,
): Promise<BlogPost> {
  const res = await fetch(`/api/admin/blog/post/${id}`, {
    method: "PATCH",
    body: formData,
  });
  return handleResponse<BlogPost>(res);
}

// Delete
export async function deletePostAction(id: number): Promise<void> {
  const res = await fetch(`/api/admin/blog/post/${id}`, {
    method: "DELETE",
  });
  return handleResponse<void>(res);
}
