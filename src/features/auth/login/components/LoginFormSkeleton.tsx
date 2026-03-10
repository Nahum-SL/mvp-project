// src/features/auth/login/components/LoginFormSkeleton.tsx
export const LoginFormSkeleton = () => (
  <div className="w-full max-w-md animate-pulse">
    {/* Skeleton del Logo/Header */}
    <div className="text-center mb-10 space-y-3">
      <div className="h-10 w-48 bg-slate-200 rounded-2xl mx-auto" />
      <div className="h-3 w-32 bg-slate-100 rounded-full mx-auto" />
    </div>

    {/* Skeleton de los Inputs */}
    <div className="space-y-6">
      {[1, 2].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-3 w-24 bg-slate-100 rounded-full ml-1" />
          <div className="h-14 w-full bg-slate-50 border border-slate-100 rounded-2xl" />
        </div>
      ))}

      {/* Skeleton del Botón */}
      <div className="h-16 w-full bg-slate-200 rounded-3xl mt-8" />
      
      {/* Skeleton de los links inferiores */}
      <div className="space-y-3 mt-6">
        <div className="h-3 w-64 bg-slate-50 rounded-full mx-auto" />
        <div className="h-3 w-40 bg-slate-50 rounded-full mx-auto" />
      </div>
    </div>
  </div>
);