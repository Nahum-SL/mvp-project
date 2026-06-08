"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface Step {
  id: number;
  content: ReactNode;
}

interface Props {
  step: number;
  totalSteps: number;
  steps: Step[];
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isSubmitting?: boolean;
}

export const MultiStepForm = ({
  step,
  totalSteps,
  steps,
  onNext,
  onPrev,
  isFirstStep,
  isLastStep,
  isSubmitting,
}: Props) => {
  const currentStep = steps.find((s) => s.id === step);

  return (
    <div className="space-y-10">
      {/* 🔥 STEPPER PRO */}
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const stepNumber = i + 1;
          const isActive = step === stepNumber;
          const isCompleted = step > stepNumber;

          return (
            <div key={stepNumber} className="flex-1 flex items-center">
              {/* CIRCLE */}
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isCompleted
                    ? "#2563eb"
                    : isActive
                      ? "#3b82f6"
                      : "#e2e8f0",
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md"
              >
                {isCompleted ? (
                  <Check size={18} />
                ) : (
                  <span className="text-sm">{stepNumber}</span>
                )}
              </motion.div>

              {/* LINE */}
              {stepNumber !== totalSteps && (
                <div className="flex-1 h-0.5 mx-2 bg-slate-200 relative overflow-hidden">
                  <motion.div
                    initial={false}
                    animate={{
                      width: step > stepNumber ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-blue-500"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CONTENT ANIMATION */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1], // 🔥 easing pro
          }}
        >
          {currentStep?.content}
        </motion.div>
      </AnimatePresence>

      {/* 🔥 BUTTONS */}
      <div className="flex justify-between pt-6">
        {!isFirstStep ? (
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            type="button"
            onClick={onPrev}
            disabled={isSubmitting}
            className="px-6 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 transition-all font-medium cursor-pointer"
          >
            Atrás
          </motion.button>
        ) : (
          <div />
        )}

        {!isLastStep ? (
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onNext();
            }}
            className="ml-auto px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-md cursor-pointer"
          >
            Siguiente
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            disabled={isSubmitting}
            className="ml-auto px-6 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 shadow-lg disabled:bg-slate-400"
          >
            {isSubmitting ? "Enviando..." : "Enviar Postulación"}
          </motion.button>
        )}
      </div>
    </div>
  );
};
