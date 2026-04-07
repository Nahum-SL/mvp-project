// Importamos los tipos de ID para los filtros
import { type BusinessTypeID, type PainPointID } from "./constants";


// Definimos la estructura de una característica de servicio
export interface ServiceFeature {
  id: number;
  name: string;
  serviceId: number;
}

// Definimos la estructura exacta de tus filtros
export interface ServiceFilters {
  businessType?: BusinessTypeID;
  painPoint?: PainPointID;
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
