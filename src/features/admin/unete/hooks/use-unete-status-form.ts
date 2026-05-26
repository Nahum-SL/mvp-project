"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  uneteStatusSchema,
  type UneteStatusInput,
  type UneteStatusValues,
} from "../schemas/unete.schema";

import { useStatusModal, useUneteActions } from "../store/unete.selector";

import { useUpdateJobAppStatus } from "./use-unete-mutation";

export function useUneteStatusForm() {
  const statusModal = useStatusModal();

  const { closeStatusModal } = useUneteActions();

  const mutation = useUpdateJobAppStatus();

  const form = useForm<UneteStatusInput, unknown, UneteStatusValues>({
    resolver: zodResolver(uneteStatusSchema),

    defaultValues: {
      status: statusModal.currentStatus ?? "PENDIENTE",
    },
  });

  useEffect(() => {
    form.reset({
      status: statusModal.currentStatus ?? "PENDIENTE",
    });
  }, [statusModal.currentStatus, form]);

  const onSubmit = async (values: UneteStatusValues) => {
    if (!statusModal.applicationId) {
      toast.error("Postulación inválida");
      return;
    }

    try {
      await mutation.mutateAsync({
        id: statusModal.applicationId,

        payload: {
          status: values.status,
        },
      });

      toast.success("Estado actualizado");

      closeStatusModal();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error inesperado");
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending: mutation.isPending,
  };
}
