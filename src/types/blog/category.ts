import { BlogPost } from "./blog";

export interface Category {
  id: number;
  name: string;
  posts: BlogPost[];

  createdAt: string;
  updateAt: string;
}


// Crear Categoria
export interface CreateCategory {
  name: string;
  posts: BlogPost[];
}

// Actualizar Categoria
export interface UpdateCategoryInput {
  prop: CreateCategory[];
}