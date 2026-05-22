import type { IntranetLink } from "@/src/types/intranet/intranet-types";
import type { IntranetLinkFormInput } from "../schemas/intranet.schema";

interface Props {
  initialData?: IntranetLink;
}

export function getIntranetDefaultValues({
  initialData,
}: Props): IntranetLinkFormInput {
  return {
    title: initialData?.title || "",
    description: initialData?.description || "",
    url: initialData?.url || "",
    icon: initialData?.icon || "",
    order: initialData?.order ?? 0,
    isVisible: initialData?.isVisible ?? true,
  };
}
