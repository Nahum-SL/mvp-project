// src/features/admin/contacto/constants.ts
import { Clock, CheckCircle2, XCircle, LucideIcon } from "lucide-react";
import { z } from "zod";
import { ContactStatusEnum } from "./schema";

type ContactStatus = z.infer<typeof ContactStatusEnum>;

interface StatusStyle {
  label: string;
  color: string;
  icon: LucideIcon;
}

export const STATUS_CONFIG: Record<ContactStatus, StatusStyle> = {
  PENDING: {
    label: "Pendiente",
    color: "bg-amber-50 text-amber-600 border-amber-100",
    icon: Clock,
  },
  CONFIRMED: {
    label: "Confirmado",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    icon: CheckCircle2,
  },
  CANCELLED: {
    label: "Cancelado",
    color: "bg-red-50 text-red-600 border-red-100",
    icon: XCircle,
  },
  COMPLETED: {
    label: "Completado",
    color: "bg-blue-50 text-blue-600 border-blue-100",
    icon: CheckCircle2,
  },
};
