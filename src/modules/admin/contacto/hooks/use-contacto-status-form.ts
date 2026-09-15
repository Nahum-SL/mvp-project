// src/features/admin/contacto/hooks/use-contacto-status-form.ts
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  useActiveContact,
  useContactActions,
} from "../store/contacto.selector";
import { useUpdateContactStatus } from "./use-contacto-mutation";
import {
  contactStatusSchema,
  type ContactStatusInput,
  type ContactStatusValues,
} from "../schemas/contacto.schema";

export function useContactStatusForm() {
  const activeContact = useActiveContact();
  const { setActiveContact } = useContactActions();
  const mutation = useUpdateContactStatus();

  const form = useForm<ContactStatusInput, unknown, ContactStatusValues>({
    resolver: zodResolver(contactStatusSchema),
    defaultValues: {
      status: activeContact?.status || "PENDING",
    },
  });

  // Sincronización reactiva: cada vez que cambie el contacto activo en Zustand,
  // actualizamos los valores internos del formulario de manera limpia.
  useEffect(() => {
    if (activeContact) {
      form.reset({
        status: activeContact.status,
      });
    }
  }, [activeContact, form]);

  const onSubmit = async (values: ContactStatusValues) => {
    if (!activeContact?.id) {
      toast.error("Contacto inválido");
      return;
    }

    try {
      await mutation.mutateAsync({
        id: activeContact.id,
        payload: {
          status: values.status,
        },
      });

      toast.success("¡Estado de contacto actualizado!");
      setActiveContact(null); // Cerramos el flujo visual
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
