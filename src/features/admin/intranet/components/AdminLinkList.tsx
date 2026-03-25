// features/admin/intranet/components/AdminLinkList.tsx
"use client";

import { AnimatePresence } from "framer-motion";
import { Plus, Link2Off } from "lucide-react";
import Link from "next/link";
import { LinkRow } from "./LinkRow";

interface IntranetLink {
  id: number;
  title: string;
  description: string;
  url: string;
  icon: string | null;
  order: number;
  isVisible: boolean;
}

interface Props {
  links: IntranetLink[];
}

export const AdminLinkList = ({ links }: Props) => {
  if (links.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
        <div className="p-6 bg-slate-50 rounded-full mb-4">
          <Link2Off size={40} className="text-slate-300" />
        </div>
        <h3 className="text-xl font-extrabold italic text-slate-400 uppercase tracking-widest">
          No hay accesos creados
        </h3>
        <p className="text-slate-400 text-sm mb-8">
          Empieza agregando el primero para la intranet.
        </p>
        <Link
          href="/admin/intranet/nuevo"
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-extrabold uppercase text-xs tracking-[0.2em] hover:bg-blue-700 transition-all flex items-center gap-3"
        >
          <Plus size={18} /> Crear Link
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50">
            <th className="px-8 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400 italic">
              Orden
            </th>
            <th className="px-8 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400 italic">
              Acceso
            </th>
            <th className="px-8 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400 italic">
              Estado
            </th>
            <th className="px-8 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400 italic text-right">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          <AnimatePresence mode="popLayout">
            {links.map((link) => (
              <LinkRow key={link.id} link={link} />
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};
