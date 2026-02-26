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

  categoryId: number;
  category: Category;
  date: string;

  createAt: string;
  updateAt: string;

  author: {
    name: string;
    role: string;
    avatar: string;
  };
}