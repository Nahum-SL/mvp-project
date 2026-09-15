// src/features/public/contacto/hooks/use-public-contact-form.ts
"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
  contactoSchema,
  type ContactoFormInput,
  type ContactoFormValues,
} from "../schemas/public-contacto.schema";

import { useSendContact } from "./use-public-contacto-send";

import { buildContactPayload } from "../utils/build-contacto-payload";
import { getContactDefaultValues } from "../utils/get-contacto-form-values";

export function usePublicContactForm() {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const mutation = useSendContact();

  const form = useForm<ContactoFormInput, unknown, ContactoFormValues>({
    resolver: zodResolver(contactoSchema),
    defaultValues: getContactDefaultValues(),
  });

  const onSubmit = async (values: ContactoFormValues) => {
    try {
      const payload = buildContactPayload(values);

      await mutation.mutateAsync(payload);

      toast.success("Solicitud enviada correctamente");

      form.reset();

      setIsSuccessOpen(true);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error enviando solicitud",
      );
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending: mutation.isPending,
    isSuccessOpen,
    closeSuccessModal: () => setIsSuccessOpen(false),
  };
}
