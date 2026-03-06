// app/(admin)/admin/intranet/nuevo/page.tsx
import { ArrowLeft, PlusCircle } from "lucide-react";
import Link from "next/link";
import { CreateLinkForm } from "@/src/features/admin/intranet/components/CreateLinkForm";

export default function NewLinkPage() { 
  return (
    <main className="max-w-5xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/intranet"
            className="p-3 bg-white rounded-2xl border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-black italic uppercase text-slate-900 leading-none">
              Nuevo Acceso
            </h1>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
              Intranet Corporativa
            </p>
          </div>
        </div>
      </header>

      <section>
        <CreateLinkForm />
      </section>
    </main>
  );
}
