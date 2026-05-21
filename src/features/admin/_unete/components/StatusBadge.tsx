"use client";

import { motion } from "framer-motion";
import { badgeVariant } from "@/src/lib/animations";
import { JobAppStatus } from "../types";

const statusStyles: Record<JobAppStatus, string> = {
  [JobAppStatus.PENDIENTE]: "bg-amber-100 text-amber-700 border-amber-200",
  [JobAppStatus.REVISADO]: "bg-blue-100 text-blue-700 border-blue-200",
  [JobAppStatus.RECHAZADO]: "bg-rose-100 text-rose-700 border-rose-200",
};

export const StatusBadge = ({ status }: { status: JobAppStatus }) => {
  return (
    <motion.span
      layout
      variants={badgeVariant}
      initial="initial"
      animate="animate"
      transition={{ layout: { duration: 0.25 } }}
      className={`px-3 py-1 rounded-full text-xs font-bold border ${statusStyles[status]}`}
    >
      {status}
    </motion.span>
  );
};
