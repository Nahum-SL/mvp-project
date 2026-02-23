// Exportado --> src/types/about-us.ts
export interface History {
  id: number;
  text: string;
  number: number;
}

export interface AboutUs {
  title: string;
  description: string;
  history: History[];
}