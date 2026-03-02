  import { BlogPost } from "./blogPost";


  export interface Category {
    id: number;
    name: string;
    slug: string;
    posts: BlogPost[];

    createdAt: string;
    updateAt: string;
  }

