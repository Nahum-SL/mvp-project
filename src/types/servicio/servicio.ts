export interface ServiceFeature {
  id: number;
  name: string;
  serviceId: number;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon?: string | null;
  image?: string;
  
  businessTypes: string[];
  painPoints: string[];

  features: ServiceFeature[];

  isVisible: boolean;
  order: number;

  createdAt: string;
  updatedAt: string;
}
