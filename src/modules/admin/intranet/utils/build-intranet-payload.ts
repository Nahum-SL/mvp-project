import type { IntranetLinkValues } from "../schemas/intranet.schema";

export function buildIntranetPayload(values: IntranetLinkValues) {
  return {
    title: values.title.trim(),
    description: values.description.trim(),
    // Normalización ligera
    url: values.url.trim(),
    icon: values.icon.trim(),
    // Ya vienen tipados desde zod
    order: values.order,
    isVisible: values.isVisible,
  };
}

export type IntranetPayload = ReturnType<typeof buildIntranetPayload>;
