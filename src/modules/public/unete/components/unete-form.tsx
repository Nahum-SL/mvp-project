"use client";

import { useRef } from "react";
import { FormProvider } from "react-hook-form";
// Hooks
import { usePublicUneteForm } from "../hooks/use-public-unete-form";
// Utils
import { UNETE_STEP_TITLES } from "../utils/unete-step-titles";
// Subcomponents
import { MultiStepForm } from "./multi-step-form";
import { FormImageSection } from "./form-image-section";
import { StepPersonalData } from "./step-personal-data";
import { StepProfessionalData } from "./step-profesional-data";
import { StepCvUpload } from "./step-cv-upload";

interface Props {
  title: string;
  subtitle: string;
  src: string;
  alt: string;
}

export function UneteForm({ title, subtitle, src, alt }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { form, step, totalSteps, nextStep, prevStep, onSubmit, isSubmitting } =
    usePublicUneteForm();

  const steps = [
    { id: 1, content: <StepPersonalData /> },
    { id: 2, content: <StepProfessionalData /> },
    { id: 3, content: <StepCvUpload /> },
  ];

  return (
    <section id="unete-form" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6" ref={containerRef}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-strt">
          <div className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                {title}
              </h2>
              <p className="text-slate-500 mt-2">{subtitle}</p>

              {/* Indicador del sub-paso actual */}
              <div className="mt-6 inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                {UNETE_STEP_TITLES[step - 1] || "Formulario de Registro"}
              </div>
            </div>

            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <MultiStepForm
                  step={step}
                  totalSteps={totalSteps}
                  steps={steps}
                  onNext={nextStep}
                  onPrev={prevStep}
                  isFirstStep={step === 1}
                  isLastStep={step === totalSteps}
                  isSubmitting={isSubmitting}
                />
              </form>
            </FormProvider>
          </div>

          <FormImageSection src={src} alt={alt} />
        </div>
      </div>
    </section>
  );
}
