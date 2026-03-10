// src/features/auth/login/components/LoginForm.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/src/lib/utils";

import { loginSchema, type LoginFormValues } from "../schema";
import { loginAction } from "../action";
import { AuthInput } from "./AuthInput";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const logoutSuccess = searchParams.get("logout") === "success";
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    const result = await loginAction(data);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      const userRole = result.user?.role;
      router.push(userRole === "ADMIN" ? "/admin" : "/intranet");
      router.refresh();
    }
  };

  return (
    <div className="w-full">
      <header className="text-center mb-10">
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
          ASESCON
        </h2>
        <p className="text-slate-400 text-xs mt-3 font-medium uppercase tracking-widest">
          Portal de acceso administrativo
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <AnimatePresence mode="wait">
          {(logoutSuccess || error) && (
            <motion.div
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
              <p className="text-[10px] font-black uppercase">
                {error || "Sesión cerrada de forma segura."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-4">
          <AuthInput
            label="Correo Electrónico"
            icon={Mail}
            type="email"
            placeholder="ejemplo@asescon.pe"
            register={register("email")}
            error={errors.email?.message}
            disabled={isLoading}
          />

          <AuthInput
            label="Contraseña"
            icon={Lock}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            register={register("password")}
            error={errors.password?.message}
            disabled={isLoading}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-slate-900 hover:bg-blue-700 text-white font-black py-5 rounded-3xl transition-all duration-300 uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98]"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            "Ingresar al Sistema"
          )}
        </button>

        <footer className="flex flex-col gap-3 text-center">
          <p className="text-[13px] text-slate-400 font-medium italic">
            Si olvidaste tu acceso, contacta con soporte técnico.
          </p>
          <Link
            href="/#home"
            className="text-[13px] text-slate-800 hover:text-blue-600 font-bold italic transition-colors"
          >
            Volver a la Página Principal
          </Link>
        </footer>
      </form>
    </div>
  );
};
