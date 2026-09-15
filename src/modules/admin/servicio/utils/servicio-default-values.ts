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

    // Arrays de Checkboxes
    businessTypes: initialData?.businessTypes || [],
    painPoints: initialData?.painPoints || [],

    // 🔥 FEATURES LIMPIO Y SIN ERRORES DE TIPADO
    features:
      initialData?.features && initialData.features.length > 0
        ? initialData.features.map((feature) => ({
            name: feature.name, // Coincide perfectamente con el contrato y con Zod
          }))
        : [
            {
              name: "", // Inicializador limpio para cuando creas un servicio nuevo
            },
          ],

    // Config
    isVisible: initialData?.isVisible ?? true,
    order: initialData?.order ?? 0,

    // File / Image
    image: initialData?.image || undefined,
  };
}
