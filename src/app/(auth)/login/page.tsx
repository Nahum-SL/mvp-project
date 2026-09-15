// app/(auth)/login/page.tsx
import { Suspense } from "react";
import { LoginBranding } from "@/src/modules/auth/login/components/LoginBranding";
import { LoginFormContainer } from "@/src/modules/auth/login/components/LoginFormContainer";
import { LoginFormSkeleton } from "@/src/modules/auth/login/components/LoginFormSkeleton";

export default function LoginPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white lg:bg-slate-50">
      {/* Lado Izquierdo: Formulario */}
      <div className="flex items-center justify-center p-8 md:p-16 lg:p-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 lg:hidden" />

        {/* Aquí aplicamos el Suspense que mencionamos antes */}
        <Suspense fallback={<LoginFormSkeleton />}>
          <LoginFormContainer />
        </Suspense>
      </div>

      {/* Lado Derecho: Branding (Renderizado en servidor) */}
      <LoginBranding />
    </main>
  );
}
