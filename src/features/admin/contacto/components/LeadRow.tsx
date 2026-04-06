// src/features/admin/contacto/components/LeadRow.tsx
"use client";

import { useTransition, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Calendar, Phone, Mail, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import { cn } from "@/src/lib/utils";
import {
  updateContactStatusAction,
  deleteContactAction,
  updateContactAction,
} from "../action";
import { ContactStatusEnum } from "../schema";
import { z } from "zod";
import { STATUS_CONFIG } from "../constante";
import { Contacto } from "../types";
import { ContactoFormValues } from "../schema";

import { DeleteContactModal } from "./DeleteContacModal";
import { EditContactModal } from "./EditContacModal";

type ContactStatus = z.infer<typeof ContactStatusEnum>;

interface Props {
  lead: Contacto;
  onOpen: () => void;
}

export const LeadRow = ({ lead, onOpen }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const config = STATUS_CONFIG[lead.status];
  const StatusIcon = config.icon;

  const handleStatusChange = async (newStatus: ContactStatus) => {
    startTransition(async () => {
      const res = await updateContactStatusAction(lead.id, newStatus);
      if (res.success) toast.success("Estado actualizado");
      else toast.error(res.error);
    });
  };

  const onSaveEdit = async (data: ContactoFormValues) => {
    startTransition(async () => {
      // Necesitaremos crear esta acción en action.ts si no existe,
      // o usar una genérica de actualización.
      const res = await updateContactAction(lead.id, data);

      if (res.success) {
        toast.success("Datos actualizados correctamente");
        setShowEdit(false);
      } else {
        toast.error(res.error);
      }
    });
  };

  const handleDelete = async () => {
    if (!confirm("¿Eliminar este prospecto definitivamente?")) return;
    const res = await deleteContactAction(lead.id);
    if (res.success) toast.success("Prospecto eliminado");
    else toast.error(res.error);
  };

  const onConfirmDelete = async () => {
    startTransition(async () => {
      const res = await deleteContactAction(lead.id);
      if (res.success) {
        toast.success("Prospecto eliminado");
        setShowDelete(false);
      }
    });
  };

  return (
    <>
      <motion.tr
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, x: -20 }}
        onClick={onOpen}
        className="group hover:bg-slate-50/50 cursor-pointer transition-colors border-b border-slate-50 last:border-none"
      >
        <td className="px-6 py-5">
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 uppercase text-sm tracking-tight">
              {lead.name}
            </span>
            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-1">
              <Calendar size={10} /> Recibido:{" "}
              {format(new Date(lead.createdAt), "dd MMM, yyyy", { locale: es })}
            </span>
          </div>
        </td>

        <td className="px-6 py-5">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
              <Mail size={12} className="text-blue-500" /> {lead.email}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
              <Phone size={12} className="text-emerald-500" /> {lead.telefono}
            </div>
          </div>
        </td>

        <td className="px-6 py-5 max-w-50">
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {lead.comentario || "Sin comentarios adicionales."}
          </p>
        </td>

        <td className="px-6 py-5">
          <div className="relative inline-block group/select">
            <button
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[10px] font-extrabold uppercase tracking-widest transition-all",
                config.color,
                isPending && "opacity-50 pointer-events-none",
              )}
            >
              {isPending ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <StatusIcon size={12} />
              )}
              {config.label}
            </button>

            {/* Menu desplegable simple al hacer hover o click */}
            <div className="absolute top-full left-0 mt-2 w-40 bg-white shadow-xl rounded-2xl border border-slate-100 py-2 hidden group-hover/select:block z-50 animate-in fade-in slide-in-from-top-2">
              {Object.entries(STATUS_CONFIG).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => handleStatusChange(key as ContactStatus)}
                  className="w-full text-left px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                >
                  {value.label}
                </button>
              ))}
            </div>
          </div>
        </td>

        <td className="px-6 py-5 text-right">
          <button
            onClick={handleDelete}
            className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
          >
            <Trash2 size={18} />
          </button>
        </td>
      </motion.tr>

      <DeleteContactModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={onConfirmDelete}
        isPending={isPending}
        name={lead.name}
      />

      <EditContactModal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        lead={lead}
        onSave={onSaveEdit}
        isPending={isPending}
      />
    </>
  );
};
