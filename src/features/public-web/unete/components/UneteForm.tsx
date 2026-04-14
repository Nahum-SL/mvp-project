"use client";

import { useTransition, useState, useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  uneteSchema,
  type UneteFormInput,
  type UneteFormValues,
} from "../schema";

import { sendUneteAction } from "../action";

import { FormField } from "./FormField";
import { FileUpload } from "./FileUpload";
import { FormImageSection } from "./FormImageSection";
import { MultiStepForm } from "./MultiStepForm";

interface Props {
  title: string;
  subtitle: string;
  src: string;
  alt: string;
}

export const UneteForm = ({ title, subtitle, src, alt }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const {
    reset,
    control,
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<UneteFormInput, unknown, UneteFormValues>({
    resolver: zodResolver(uneteSchema),
    defaultValues: {
      fullName: "",
      dni: "",
      age: 0,
      email: "",
      phone: "",
      experience: 0,
      position: "",
      cv: undefined,
    },
  });

  const selectedFile = useWatch({ control, name: "cv" });

  const formRef = useRef<HTMLDivElement>(null);

  const isFirstRender = useRef(true);

  useEffect(() => {
    // Solo scrollear si el usuario ya interactuó y cambió de paso (hacia adelante o atrás)
    if (step > 1 || !isFirstRender.current) {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [step]);
  
  const direction = useRef(1);

  const handleNext = async () => {
    direction.current = 1;

    let fields: (keyof UneteFormInput)[] = [];

    if (step === 1) fields = ["fullName", "dni", "age"];
    if (step === 2) fields = ["email", "phone", "experience", "position"];
    if (step === 3) fields = ["cv"];

    const isValid = await trigger(fields);

    if (!isValid) {
      const el = document.querySelector(`[name="${fields[0]}"]`) as HTMLElement;

      el?.focus();
      return;
    }

    setStep((s) => s + 1);
  };

  const handlePrev = () => setStep((prev) => prev - 1);

  const onSubmit = async (data: UneteFormValues) => {
    startTransition(async () => {
      const result = await sendUneteAction(data);

      if (result.success) {
        toast.success(result.message);
        reset();
        setStep(1);
      } else {
        toast.error(result.error);
      }
    });
  };

  const stepTitles = [
    "Datos personales",
    "Información profesional",
    "Adjunta tu CV",
  ];

  // DEFINICIÓN DE STEPS
  const steps = [
    {
      id: 1,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <h3 className="text-lg font-bold text-slate-700">
            {stepTitles[step - 1]}
          </h3>
          <div className="md:col-span-2">
            <FormField
              label="Nombres Completos"
              registration={register("fullName")}
              error={errors.fullName?.message}
            />
          </div>

          <FormField
            label="DNI"
            registration={register("dni")}
            error={errors.dni?.message}
          />

          <FormField
            label="Edad"
            type="number"
            registration={register("age")}
            error={errors.age?.message}
          />
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Email"
            type="email"
            registration={register("email")}
            error={errors.email?.message}
          />

          <FormField
            label="Teléfono"
            registration={register("phone")}
            error={errors.phone?.message}
          />

          <FormField
            label="Años Experiencia"
            type="number"
            registration={register("experience")}
            error={errors.experience?.message}
          />

          <FormField
            label="Puesto de Interés"
            registration={register("position")}
            error={errors.position?.message}
            isSelect
          >
            <option value="">Seleccione...</option>
            <option value="Asistente Contable">Asistente Contable</option>
            <option value="Archivador y Digitador">
              Archivador y Digitador
            </option>
            <option value="Practicantes">Practicantes</option>
          </FormField>
        </div>
      ),
    },
    {
      id: 3,
      content: (
        <FileUpload
          label="Adjunta tu CV (PDF)"
          registration={register("cv")}
          error={
            errors.cv?.message === "string" ? errors.cv.message : undefined
          }
          selectedFileName={selectedFile?.[0]?.name}
        />
      ),
    },
  ];

  return (
    <section id="unete-form" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl text-slate-900">{title}</h2>
              <p className="text-slate-500 mt-5">{subtitle}</p>
            </div>

            <div ref={formRef}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <MultiStepForm
                  step={step}
                  totalSteps={totalSteps}
                  steps={steps}
                  onNext={handleNext}
                  onPrev={handlePrev}
                  isFirstStep={step === 1}
                  isLastStep={step === totalSteps}
                  isSubmitting={isPending}
                />
              </form>
            </div>
          </div>

          <FormImageSection src={src} alt={alt} />
        </div>
      </div>
    </section>
  );
};
