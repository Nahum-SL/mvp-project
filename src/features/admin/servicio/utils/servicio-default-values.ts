import type { Service } from "@/src/types/servicio/servicio-types";
import type { ServicioFormInput } from "../schemas/servicio.schema";

interface Props {
  initialData?: Service;
}

export function getServicioDefaultValues({
  initialData,
}: Props): ServicioFormInput {
  return {
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",

    // Icon
    icon: initialData?.icon || "LinkIcon",

    // Arrays
    businessTypes: initialData?.businessTypes || [],
    painPoints: initialData?.painPoints || [],

    // Features
    features: initialData?.features?.map((feature) => feature.name) || [""],

    // Config
    isVisible: initialData?.isVisible ?? true,
    order: initialData?.order ?? 0,

    // File
    image: undefined,
  };
}
