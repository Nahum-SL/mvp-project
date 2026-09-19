import { useState } from "react";
import { ShieldCheck, ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { verify2FAAction } from "../../action";
import { useRouter } from "next/navigation";

interface StepOTPProps {
  email: string;
  onBack: () => void;
  onError: (msg: string | null) => void;
}

export const StepOTP = ({ email, onBack, onError }: StepOTPProps) => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log("🔢 StepOTP render:", email);
  
  const handleVerify = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    onError(null);

    const result = await verify2FAAction(email, otp);

    console.log("RESPUESTA", result);
    if ("error" in result && result.error) {
      onError(result.error);
      setIsLoading(false);
    }

    if ("success" in result && result.success) {
      const role = result.user?.role;
      router.push(
        role === "OWNER" || role === "ADMIN" ? "/admin" : "/intranet",
      );
    }

    if ("success" in result && result.success) {
      const role = result.user?.role;

      router.push(
        role === "OWNER" || role === "ADMIN" ? "/admin" : "/intranet",
      );
    }

    // Refresca
    router.refresh();
  };

  return (
    <motion.div
      key="otp"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <header className="text-center mb-10">
        <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 ring-8 ring-blue-50/50">
          <ShieldCheck size={32} />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Verificación
        </h2>
        <p className="text-slate-500 text-sm mt-2">
          Código enviado a{" "}
          <span className="font-bold text-slate-900">{email}</span>
        </p>
      </header>

      <form onSubmit={handleVerify} className="space-y-5">
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          className="w-full text-center text-3xl font-bold tracking-[1rem] py-5 rounded-2xl border-2 border-slate-100 focus:border-blue-600 focus:ring-0 outline-none bg-slate-50"
          placeholder="000000"
          required
        />
        <button
          type="submit"
          disabled={isLoading || otp.length < 6}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-5 rounded-3xl transition-all uppercase text-[10px] flex items-center justify-center gap-3 shadow-lg"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            "Verificar Identidad"
          )}
        </button>
        <button
          type="button"
          onClick={onBack}
          className="w-full text-[11px] text-slate-400 font-bold uppercase flex items-center justify-center gap-2 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={14} /> Volver al login
        </button>
      </form>
    </motion.div>
  );
};
