"use client";

import { LogOut } from "lucide-react";
import { logoutAction } from "@/src/features/auth/login/logout-action";
import { motion } from "framer-motion";

export const LogoutButton = () => {
  return (
    <motion.button
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => logoutAction()}
      className="flex items-center gap-3 w-full p-4 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-colors group"
    >
      <div className="p-2 bg-slate-100 group-hover:bg-rose-100 rounded-lg transition-colors">
        <LogOut size={20} />
      </div>
      <span className="font-bold text-sm uppercase tracking-tight cursor-pointer">
        Cerrar Sesión
      </span>
    </motion.button>
  );
};
