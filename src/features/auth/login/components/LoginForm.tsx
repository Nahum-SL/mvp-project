"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginSchema, type LoginFormValues } from "../schema";
import { loginAction } from "../action";
import { Loader2, Lock, Mail } from "lucide-react";

export const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      // Logica de redireccion por Rol (ADMIN, COLABORADOR, CLIENTE)
      const userRole = result.user?.role;

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
    <div className="w-full max-w-md mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-6"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter">
            ASESCON<span className="text-blue-600 not-italic">.</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2 font-light">
            Acceso exclusivo para personal autorizado
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-xs font-bold rounded-lg animate-shake">
            {error}
          </div>
        )}

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
                type="password"
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-300"
              />
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
          className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-5 rounded-2xl transition-all duration-300 uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 group"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              Ingresar al Sistema
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </>
          )}
        </button>

        <p className="text-center text-[10px] text-slate-400 font-medium italic">
          Si olvidaste tu acceso, contacta con soporte técnico.
        </p>
      </form>
    </div>
  );
};
