// src/features/admin/contacto/components/LeadsTable.tsx
"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Inbox, Search } from "lucide-react";
import { LeadRow } from "./LeadRow";
import { STATUS_CONFIG } from "../constante";
// Acciones
import { updateContactStatusAction } from "../action";
import { ContactoDrawer } from "./ContactoDrawer";
// Types
import { Contacto } from "../types";
import { ContactStatus } from "../types";

interface Props {
  leads: Contacto[];
}

export const LeadsTable = ({ leads }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedLead, setSelectedLead] = useState<Contacto | null>(null);

  const handleUpdateStatus = async (id: string, status: ContactStatus) => {
    const result = await updateContactStatusAction(id, status);
    if (result.success) {
      // Actualizamos el estado local para que el Drawer refleje el cambio de inmediato
      if (selectedLead) setSelectedLead({ ...selectedLead, status });
    }
  };

  // Filtrado lógico con useMemo para optimizar rendimiento
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.telefono.includes(searchTerm);

      const matchesStatus =
        statusFilter === "ALL" || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, searchTerm, statusFilter]);

  if (leads.length === 0) {
    return (
      <div
        className="bg-white rounded-[2.5rem] p-20 flex flex-col 
      items-center justify-center border-2 border-dashed border-slate-100"
      >
        <div
          className="w-20 h-20 bg-slate-50 rounded-full flex 
        items-center justify-center mb-6 text-slate-200"
        >
          <Inbox size={40} />
        </div>
        <h3 className="text-xl font-extrabold text-slate-300 uppercase">
          Bandeja Vacía
        </h3>
        <p className="text-slate-400 text-sm">
          No se han recibido solicitudes de contacto aún.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Barra de Herramientas / Filtros */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/50 p-2 rounded-4xl border border-slate-100 shadow-sm backdrop-blur-md">
        <div className="relative flex-1 w-full group">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Buscar por nombre, email o teléfono..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white rounded-2xl border-none ring-1 ring-slate-100 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm font-medium text-slate-600 transition-all italic placeholder:text-slate-300"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 px-2">
          <button
            onClick={() => setStatusFilter("ALL")}
            className={`px-5 py-3 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all ${
              statusFilter === "ALL"
                ? "bg-slate-900 text-white shadow-lg"
                : "bg-white text-slate-400 hover:bg-slate-50"
            }`}
          >
            Todos
          </button>
          {Object.entries(STATUS_CONFIG).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setStatusFilter(key)}
              className={`px-5 py-3 rounded-xl text-[10px] font-extrabold uppercase tracking-widest whitespace-nowrap transition-all ${
                statusFilter === key
                  ? `${config.color.split(" ")[1]} ${config.color.split(" ")[0]} shadow-md ring-2 ring-offset-2 ring-current`
                  : "bg-white text-slate-400 hover:bg-slate-50"
              }`}
            >
              {config.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla Principal */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400 italic">
                  Cliente
                </th>
                <th className="px-6 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400 italic">
                  Contacto
                </th>
                <th className="px-6 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400 italic">
                  Mensaje
                </th>
                <th className="px-6 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400 italic">
                  Estado
                </th>
                <th className="px-6 py-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400 italic text-right">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody className="relative min-h-50">
              <AnimatePresence mode="popLayout">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <LeadRow
                      key={lead.id}
                      lead={lead}
                      onOpen={() => setSelectedLead(lead)}
                    />
                  ))
                ) : (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-40"
                  >
                    <td
                      colSpan={5}
                      className="text-center text-slate-400 italic text-sm"
                    >
                      No hay resultados para {searchTerm}
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
      <ContactoDrawer
        contacto={selectedLead}
        onClose={() => setSelectedLead(null)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};
