import { BlogPost } from "./blogPost";


export interface Category {
  id: number;
  name: string;
  posts: BlogPost;

  createdAt: string;
  updateAt: string;
}

