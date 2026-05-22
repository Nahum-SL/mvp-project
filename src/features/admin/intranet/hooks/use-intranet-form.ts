"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  intranetLinkSchema,
  type IntranetLinkFormInput,
  type IntranetLinkValues,
} from "../schemas/intranet.schema";

import {
  useCreateIntranetLink,
  useUpdateIntranetLink,
} from "./use-intranet-mutation";

import { buildIntranetPayload } from "../utils/build-intranet-payload";
import { getIntranetDefaultValues } from "../utils/get-intranet-default-values";

import type { IntranetLink } from "@/src/types/intranet/intranet-types";
import type { IconName } from "@/src/lib/icons";

interface Props {
  initialData?: IntranetLink;
}

export function useIntranetForm({ initialData }: Props) {
  const router = useRouter();

  const isEditing = !!initialData;

  // ======================
  // FORM
  // ======================

  const form = useForm<IntranetLinkFormInput, unknown, IntranetLinkValues>({
    resolver: zodResolver(intranetLinkSchema),

    defaultValues: getIntranetDefaultValues({
      initialData,
    }),
  });

  // ======================
  // ICON STATE
  // ======================

  const [selectedIcon, setSelectedIcon] = useState<IconName>(
    (initialData?.icon as IconName) || "LinkIcon",
  );

  // Sincroniza RHF + estado visual
  const handleIconChange = (iconName: IconName) => {
    setSelectedIcon(iconName);

    form.setValue("icon", iconName, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // ======================
  // MUTATIONS
  // ======================

  const createMutation = useCreateIntranetLink();
  const updateMutation = useUpdateIntranetLink();

  const isPending = createMutation.isPending || updateMutation.isPending;

  // ======================
  // SUBMIT
  // ======================

  const onSubmit = async (values: IntranetLinkValues) => {
    const payload = buildIntranetPayload(values);

    try {
      if (isEditing && initialData) {
        await updateMutation.mutateAsync({
          id: initialData.id,
          payload,
        });

        toast.success("Link actualizado");
      } else {
        await createMutation.mutateAsync(payload);

        toast.success("Link creado");
      }

      router.push("/admin/intranet");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error procesando la solicitud",
      );
    }
  };

  return {
    form,
    onSubmit,
    isPending,
    isEditing,

    // ICON PICKER
    selectedIcon,
    handleIconChange,
  };
}
