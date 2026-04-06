import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { loginSchema, type LoginFormValues } from "../../schema";
import { loginAction } from "../../action";
import { AuthInput } from "../AuthInput";
import { useRouter } from "next/navigation";

interface StepLoginProps {
  onSuccess: (email: string) => void;
  onError: (msg: string | null) => void;
}

export const StepLogin = ({ onSuccess, onError }: StepLoginProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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
    onError(null);
    const result = await loginAction(data);

    if ("error" in result && result.error) {
      onError(result.error);
      setIsLoading(false);
    } else if ("requires2FA" in result && result.requires2FA) {
      onSuccess(result.email);
    } else if ("success" in result && result.success) {
      const role = result.user?.role;
      router.push(
        role === "OWNER" || role === "ADMIN" ? "/admin" : "/intranet",
      );
      router.refresh();
    }
  };

  return (
    <motion.div
      key="login-step"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
      className="flex flex-col h-full"
    >
      <header className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tighter">
          ASESCON
        </h2>
        <p className="text-slate-400 text-[10px] mt-2 uppercase tracking-[0.2em] font-bold">
          Portal Administrativo
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 flex-1">
        <div className="space-y-4">
          <AuthInput
            label="Correo Corporativo"
            icon={Mail}
            type="email"
            register={register("email")}
            error={errors.email?.message}
            disabled={isLoading}
          />
          <AuthInput
            label="Contraseña"
            icon={Lock}
            type={showPassword ? "text" : "password"}
            register={register("password")}
            error={errors.password?.message}
            disabled={isLoading}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 -mr-2 text-slate-400 hover:text-indigo-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-extrabold py-5 rounded-4xl transition-all uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-indigo-900/10 active:scale-[0.98]"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            "Verificar Identidad"
          )}
        </button>
      </form>

      {/* El link fuera del form para que no interfiera con el submit, 
          pero dentro del motion.div para animarse al salir */}
      <div className="mt-8 pt-6 border-t border-slate-50">
        <Link
          href="/"
          className="group flex items-center justify-center gap-2 text-slate-400 hover:text-slate-900 transition-all text-[10px] uppercase font-bold tracking-widest"
        >
          <span className="w-5 h-px bg-slate-200 group-hover:bg-slate-900 transition-all" />
          Volver al Inicio
          <span className="w-5 h-px bg-slate-200 group-hover:bg-slate-900 transition-all" />
        </Link>
      </div>
    </motion.div>
  );
};
