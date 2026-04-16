"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Equal, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/src/types/navigation-navbar/navigation";
import { NavbarAccordion } from "./NavbarAccordion";

export function NavbarMobile({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <>
      <button
        className="lg:hidden ml-auto p-4 text-white"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={28} /> : <Equal size={28} />}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: "-100%", opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0.8 }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed top-0 left-0 w-72 h-full bg-slate-900 z-999 p-6
              shadow-[0_0_60px_rgba(0,0,0,0.8)]"
            >
              <Link
                href="/"
                className="text-white text-2xl font-bold mb-8 block"
              >
                Asescon
              </Link>

              <NavbarAccordion
                items={NAV_ITEMS}
                pathname={pathname}
                close={() => setOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
