"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { NavItem } from "./type";
import { hasChildren } from "./type";

export function NavbarAccordion({
  items,
  pathname,
  close,
}: {
  items: NavItem[];
  pathname: string;
  close: () => void;
}) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <nav className="flex flex-col gap-2">
      {items.map((item) => {
        const isOpen = openItem === item.name;
        const isActive = !hasChildren(item) && pathname === item.href;

        if (hasChildren(item)) {
          return (
            <div key={item.name}>
              {/* Trigger */}
              <button
                onClick={() => setOpenItem(isOpen ? null : item.name)}
                className="flex justify-between items-center w-full px-4 py-3 rounded-xl 
                text-slate-400 hover:bg-slate-800 hover:text-white transition-all group"
              >
                <span className="font-medium">{item.name}</span>

                <ChevronDown
                  className={`w-5 h-5 transition-all duration-300 ${
                    isOpen
                      ? "rotate-180 text-white"
                      : "text-slate-500 group-hover:text-white"
                  }`}
                />
              </button>

              {/* Submenu */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{
                      duration: 0.25,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="ml-4 pl-3 border-l border-slate-800 overflow-hidden"
                  >
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={{
                        hidden: {},
                        visible: {
                          transition: {
                            staggerChildren: 0.05,
                          },
                        },
                      }}
                      className="flex flex-col gap-1"
                    >
                      {item.children.map((sub) => (
                        <motion.div
                          key={sub.href}
                          variants={{
                            hidden: { opacity: 0, x: -6 },
                            visible: { opacity: 1, x: 0 },
                          }}
                        >
                          <Link
                            href={sub.href}
                            onClick={close}
                            className="block px-4 py-2 text-sm text-slate-400 
                            hover:text-white hover:bg-slate-800 rounded-lg transition"
                          >
                            {sub.name}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={close}
            className={`px-4 py-3 rounded-xl transition-all ${
              isActive
                ? "bg-sky-500/20 text-sky-300"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
