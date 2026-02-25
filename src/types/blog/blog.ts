import { Category } from "./category";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  published: boolean;
  readingTime: string;

  autorId: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };

  categoryId: number;
  category: Category[];
  date: string;

  createdAt: string;
  updateAt: string;
}

// Crear Blog post
export interface CreateBlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  published: boolean;
  readingTime: string;

  autorId: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };

  categoryId: number;
  category: Category[];
  date: string;
}

// Actualizar Blog Post
export interface UpdateBlogPost {
  prop: CreateBlogPost[];
}