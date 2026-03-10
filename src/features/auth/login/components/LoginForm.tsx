"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginSchema, type LoginFormValues } from "../schema";
import { loginAction } from "../action";
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  Lock,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export const LoginForm = () => {
  const searchParmas = useSearchParams();
  const logoutSuccess = searchParmas.get("logout") === "success";

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mostrar Contraseña
  const [showPassword, setShowPassword] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    // Limpiar errores al cambiar los campos
    reset();
  }, [reset]);

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    const result = await loginAction(data);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      // Logica de redireccion por Rol (ADMIN, COLABORADOR, CLIENTE)
      const userRole = result.user?.role;

      setIsLoading(false);
      // Redirige a src/app/(auth)/admin/page.tsx
      if (userRole === "ADMIN") {
        router.push("/admin");
      } else {
        // Redirigir a la intranet o dashboard tras éxito
        router.push("/intranet");
      }

      router.refresh(); // Forzar actualización de cookies en el cliente
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-slate-900 italic tracking-tighter">
          ASESCON<span className="text-blue-600 not-italic">.</span>
        </h2>
        <p className="text-slate-400 text-xs mt-3 font-medium uppercase tracking-widest">
          Portal de acceso administrativo
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <AnimatePresence mode="wait">
          {/* MENSAJE DE ÉXITO AL CERRAR SESIÓN */}
          {logoutSuccess && !error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-3 text-emerald-600"
            >
              <CheckCircle2 size={18} />
              <p className="text-[10px] font-black uppercase tracking-tight">
                Sesión cerrada de forma segura. ¡Hasta pronto!
              </p>
            </motion.div>
          )}

          {/* MENSAJE DE ERROR */}
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600"
            >
              <AlertCircle size={18} />
              <p className="text-[10px] font-black uppercase tracking-tight">
                {error}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                {...register("email")}
                type="email"
                placeholder="ejemplo@asescon.pe"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-300"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold italic uppercase">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">
              Contraseña
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-300"
              />

              {/* Ver contraseña toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold italic uppercase">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-slate-900 hover:bg-blue-700 text-white font-black py-5 rounded-3xl
           transition-all duration-300 uppercase tracking-[0.2em] text-[10px] flex items-center 
           justify-center gap-3 disabled:opacity-50 group"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            "Ingresar al Sistema"
          )}
        </button>

        <p className="text-center text-[13px] text-slate-400 font-medium italic">
          Si olvidaste tu acceso, contacta con soporte tégicnico.
        </p>

        <Link
          href="/#home"
          className="text-center text-[13px] text-slate-800 hover:text-cyan-600 font-medium italic"
        >
          Volver a la Página Principal
        </Link>
      </form>
    </div>
  );
};
