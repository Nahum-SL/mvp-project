import type {
  Service,
  ServiceFilters,
} from "@/src/types/servicio/servicio-types";

interface Props {
  services: Service[];
  filters: ServiceFilters;
}

export function filterServicios({ services, filters }: Props) {
  let data = [...services];

  if (filters.search) {
    const search = filters.search.toLowerCase();

    data = data.filter((service) =>
      service.title.toLowerCase().includes(search),
    );
  }

  if (filters.businessType) {
    data = data.filter((service) =>
      service.businessTypes.includes(filters.businessType!),
    );
  }

  if (filters.painPoint) {
    data = data.filter((service) =>
      service.painPoints.includes(filters.painPoint!),
    );
  }

  return data;
}
