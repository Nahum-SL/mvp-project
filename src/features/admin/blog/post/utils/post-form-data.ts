import type { PostFormValues } from "../schemas/blog-post-schema";

export function buildPostFormData(values: PostFormValues) {
  const formData = new FormData();

  formData.append("title", values.title.trim());
  formData.append("slug", values.slug.trim());
  formData.append("excerpt", values.excerpt.trim());
  formData.append("categoryId", String(values.categoryId));
  formData.append("published", String(values.published));
  formData.append("content", values.content.trim());

  if (values.image) {
    formData.append("image", values.image);
  }

  return formData;
}
