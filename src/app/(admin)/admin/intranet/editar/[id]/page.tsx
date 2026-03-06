// app/(admin)/admin/intranet/editar/[id]/page.tsx
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ArrowLeft, Edit3 } from "lucide-react";
import Link from "next/link";
import { CreateLinkForm } from "@/src/features/admin/intranet/components/CreateLinkForm";

interface Props {
  params: Promise<{ id: string }>;
}

async function getLinkById(id: string) {
  const API_URL = process.env.NEST_API_URL || "http://localhost:3001";
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;

  // Llamamos al endpoint que configuramos en el IntranetController de NestJS
  // Usamos el ID directamente como lo definimos: @Get('admin/all') o @Get(':id')
  const res = await fetch(`${API_URL}/intranet/admin/link/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store", // Importante: siempre traer data fresca al editar
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function EditLinkPage({ params }: Props) {
  const { id } = await params;
  const linkData = await getLinkById(id);

  if (!linkData) notFound();

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
              Editar Acceso
            </h1>
            <p className="text-blue-600 text-xs font-black uppercase tracking-widest mt-1">
              ID: #{id}
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
          <Edit3 size={14} />
          <span className="text-[10px] font-black uppercase italic">
            Modo Edición
          </span>
        </div>
      </header>

      <section>
        {/* Pasamos initialData para que el formulario sepa que es una edición */}
        <CreateLinkForm initialData={linkData} />
      </section>
    </main>
  );
}
