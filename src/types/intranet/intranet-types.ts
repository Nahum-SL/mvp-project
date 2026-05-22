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

// =======================
// Payloads para mutaciones
// =======================

export interface CreateIntranetLinkPayload {
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