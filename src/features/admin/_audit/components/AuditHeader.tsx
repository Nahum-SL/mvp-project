// src/features/admin/audit/components/AuditHeader.tsx
"use client";
import { useState } from "react";
import { Database } from "lucide-react";
import { OptimizationModal } from "./OptimizationModal"; // El nuevo modal
import SectionHeader from "../../components/SectionHeader";

export const AuditHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-10 pb-20">
      <SectionHeader
        title="Auditoría del Sistema"
        subtitle="Monitoreo de seguridad y mantenimiento preventivo."
        icon={<Database size={32} />}
        variant="flat"
        actions={
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-emerald-500 
            text-white px-6 py-3 rounded-2xl text-[10px] font-bold 
            uppercase tracking-widest transition-all shadow-lg shadow-indigo-900/10 active:scale-95"
          >
            <Database size={16} />
            Optimizar Base de Datos
          </button>
        }
      />

      <OptimizationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
