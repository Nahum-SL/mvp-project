import { LoginForm } from "@/src/features/auth/login/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50">
      {/* Lado Izquierdo: Formulario */}
      <div className="flex items-center justify-center p-8">
        <LoginForm />
      </div>

      {/* Lado Derecho: Branding / Imagen */}
      <div className="hidden lg:flex bg-slate-900 relative overflow-hidden items-center justify-center p-20">
        <div className="absolute inset-0 opacity-40">
          {/* Aquí podrías poner un patrón geométrico o una foto de oficina minimalista */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-md">
          <blockquote className="text-3xl font-light text-white italic leading-tight">
            La excelencia en la gestión contable comienza con una organización
            impecable.
          </blockquote>
          <div className="mt-8 h-1 w-20 bg-blue-500" />
          <p className="mt-4 text-slate-400 font-medium uppercase tracking-widest text-xs">
            Asescon Internal Systems v2.0
          </p>
        </div>
      </div>
    </main>
  );
}
