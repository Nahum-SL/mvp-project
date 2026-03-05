// Exportado a --> src/types/intranet.ts
export interface Intranet {
  id: number;
  title: string;
  description: string;
  src: string;
  url?: string;
}

export interface IntranetLink {
  id: number;
  title: string;
  description: string;
  url: string;
  icon?: string;
  order: number;
  isVisible: boolean;

  createdAt: string;
  updateAt: string;
}
  