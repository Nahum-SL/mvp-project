import { Suspense } from "react";

export default async function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex-1">
        {/* 3. Envolvemos el children en Suspense para satisfacer a Next.js 15 */}
        <Suspense fallback={<AdminSkeleton />}>{children}</Suspense>
      </main>
    </>
  );
}

// Un pequeño componente de carga para que no se vea vacío
function AdminSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-slate-200 rounded w-1/4"></div>
      <div className="h-64 bg-slate-200 rounded"></div>
    </div>
  );
}
