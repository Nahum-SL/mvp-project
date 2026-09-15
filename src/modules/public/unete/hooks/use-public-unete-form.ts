"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  uneteSchema,
  step1Schema,
  step2Schema,
  type UneteFormInput,
  type UneteFormValues,
} from "../schemas/unete-public.schema";
// hooks
import { useSendJobUnete } from "./use-public-unete-send";
// utils
import { buildUneteFormData } from "../utils/build-unete-formdata";

export function usePublicUneteForm() {
  const [step, setStep] = useState(1);

  const mutation = useSendJobUnete();

  const form = useForm<UneteFormInput, unknown, UneteFormValues>({
    resolver: zodResolver(uneteSchema),
    defaultValues: {
      fullName: "",
      dni: "",
      age: 18,
      email: "",
      phone: "",
      experience: 0,
      position: "",
      cv: undefined,
    },
  });

  const selectedFile = useWatch({
    control: form.control,
    name: "cv",
  });

  const totalSteps = 3;

  const isFirstStep = step === 1;
  const isLastStep = step === totalSteps;

  const nextStep = async () => {
    let fields: (keyof UneteFormInput)[] = [];

    if (step === 1) {
      fields = Object.keys(step1Schema.shape) as (keyof UneteFormInput)[];
    }

    if (step === 2) {
      fields = Object.keys(step2Schema.shape) as (keyof UneteFormInput)[];
    }

    if (step === 3) {
      fields = ["cv"];
    }

    const isValid = await form.trigger(fields);
    if (!isValid) return false;
    setStep((prev) => Math.min(prev + 1, totalSteps));
    return true;
  };
  // Función para ir al paso anterior
  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };
  // Función para resetear el formulario y volver al primer paso
  const resetForm = () => {
    form.reset();
    setStep(1);
  };

  const onSubmit = async (data: UneteFormValues) => {
    const formData = buildUneteFormData(data);

    mutation.mutate(formData, {
      onSuccess: () => {
        toast.success(
          "Tu postulación fue enviada correctamente. Nos pondremos en contacto contigo.",
        );

        form.reset();
        setStep(1);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  return {
    form,
    step,
    totalSteps,
    isFirstStep,
    isLastStep,
    selectedFile,
    nextStep,
    prevStep,
    onSubmit,
    isSubmitting: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    resetForm,
  };
}
