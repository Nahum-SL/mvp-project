"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { NavItemWithChildren } from "./type";

export function NavbarDropdown({
  item,
}: {
  item: NavItemWithChildren;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-2 p-4 rounded-2xl hover:bg-blue-900/40 transition-all">
        {item.name.toUpperCase()}

        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-80 p-2 
            bg-slate-900/95 backdrop-blur-md rounded-2xl 
            border border-white/10 shadow-2xl"
          >
            {item.children.map((sub) => (
              <Link
                key={sub.href}
                href={sub.href}
                className="flex flex-col px-4 py-3 hover:bg-slate-800 rounded-xl transition"
              >
                <span className="text-sm font-semibold text-white">
                  {sub.name}
                </span>

                {sub.description && (
                  <span className="text-xs text-slate-400">
                    {sub.description}
                  </span>
                )}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
