export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readingTime: string;
  image: string;
  slug: string;
}
