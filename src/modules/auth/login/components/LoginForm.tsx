"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
// Framer Motion
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
// Icons
import { AlertCircle, CheckCircle2 } from "lucide-react";
// Steps
import { StepLogin } from "./form/StepLogin";
import { StepOTP } from "./form/StepOTP";
// Utils
import { cn } from "@/src/lib/utils";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const logoutSuccess = searchParams.get("logout") === "success";

  const [step, setStep] = useState<"login" | "2fa">("login");
  const [adminEmail, setAdminEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="w-full">
      {/* Alertas Globales */}
      <div className="mb-6 h-12">
        <AnimatePresence mode="wait">
          {(logoutSuccess || error) && (
            <motion.div
              key={error ? "error" : "logout"}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cn(
                "p-4 rounded-2xl flex items-center gap-3 border",
                error
                  ? "bg-red-50 border-red-100 text-red-600"
                  : "bg-emerald-50 border-emerald-100 text-emerald-600",
              )}
            >
              {error ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
              <p className="text-[10px] font-extrabold uppercase leading-none">
                {error || "Sesión cerrada de forma segura."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="min-h-100 flex flex-col">
        <AnimatePresence mode="wait">
          {step === "login" ? (
            <StepLogin
              key="step-1"
              onSuccess={(email) => {
                setAdminEmail(email);
                setStep("2fa");
              }}
              onError={setError}
            />
          ) : (
            <StepOTP
              key="step-2"
              email={adminEmail}
              onBack={() => {
                setStep("login");
                setError(null);
              }}
              onError={setError}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
