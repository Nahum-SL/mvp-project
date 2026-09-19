"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  intranetSchema,
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
    resolver: zodResolver(intranetSchema),

    defaultValues: getIntranetDefaultValues({
      initialData,
    }),
  });

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
  };
}
