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

export interface IntranetLinks {
  id: number;
  title: string;
  description: string;
  url: string;
  icon: string;
}


// =======================
// Payloads para mutaciones
// =======================

export interface IntranetLinkPayload {
  title: string;
  description: string;
  url: string;
  icon?: string;
  order?: number;
  isVisible?: boolean;
}

export interface UpdateIntranetLinkPayload {
  title?: string;
  description?: string;
  url?: string;
  icon?: string;
  order?: number;
  isVisible?: boolean;
}