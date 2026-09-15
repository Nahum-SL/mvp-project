import type { BlogPost } from "@/src/types/blog/blogPost";
import type { PostFormInput } from "../schemas/blog-post-schema";

interface Props {
  initialData?: BlogPost;
}

export function getPostDefaultValues({ initialData }: Props): PostFormInput {
  return {
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    categoryId: initialData?.categoryId || 0,
    published: initialData?.published || false,
    content: initialData?.content || "",
    image: undefined,
  };
}
