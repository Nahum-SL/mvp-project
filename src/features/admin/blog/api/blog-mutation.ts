import { BlogPost } from "@/src/types/blog/blogPost";

// Create
export async function createPostAction(formData: FormData): Promise<BlogPost> {
  const res = await fetch("/api/admin/blog/post", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);

    throw new Error(error?.message ?? "Error creando post");
  }

  return res.json();
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

  if (!res.ok) {
    const error = await res.json().catch(() => null);

    throw new Error(error?.message ?? "Error actualizando post");
  }

  return res.json();
}

// Delete
export async function deletePostAction(id: number): Promise<void> {
  const res = await fetch(`/api/admin/blog/post/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);

    throw new Error(error?.message ?? "Error eliminando post");
  }
}
