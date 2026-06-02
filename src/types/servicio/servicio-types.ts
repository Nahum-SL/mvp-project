// Importamos los tipos de ID para los filtros
import { type BusinessTypeID, type PainPointID } from "./constants";

// Definimos la estructura de una característica de servicio
export interface ServiceFeature {
  id: number;
  name: string;
  serviceId: number;
}
//
// Definimos la estructura exacta de tus filtros
export interface ServiceFilters {
  businessType?: BusinessTypeID;
  painPoint?: PainPointID;
  search: string;
}

export interface ScoredServiceQuery {
  businessType: BusinessTypeID;
  painPoint: PainPointID;
  search: string;
}

// La interfaz principal para un servicio, con todos los campos necesarios
export interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon?: string | null;
  image: string;

  businessTypes: BusinessTypeID[];
  painPoints: PainPointID[];

  features: ServiceFeature[];

  isVisible: boolean;
  order: number;

  createdAt: string;
  updatedAt: string;
}

// ==================
// PAYLOAD Para mutations
// ==================

export interface CreateServiceFeaturePayload {
  name: string;
}

export interface CreateServicePayload {
  title: string;
  slug: string;
  description: string;
  icon?: string | null;
  image: string;

  businessTypes: BusinessTypeID[];
  painPoints: PainPointID[];

  features: CreateServiceFeaturePayload[];

  isVisible: boolean;
  order: number;
}

export interface UpdateServicePayload {
  title?: string;
  slug?: string;
  description?: string;
  icon?: string | null;
  image?: string;

  businessTypes?: BusinessTypeID[];
  painPoints?: PainPointID[];

  features?: CreateServiceFeaturePayload[];

  isVisible?: boolean;
  order?: number;
}
