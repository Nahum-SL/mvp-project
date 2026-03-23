"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Equal, X, Bell } from "lucide-react";
import { NAV_ITEMS } from "@/src/types/navigation-navbar/navigation";

import GlassNavbar from "./GlasNavbar";

function NavbarCard() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openBell, setOpenBell] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <GlassNavbar>
        <div className="flex items-center h-20 px-6 md:px-10">
          {/* Logo */}
          <Link href="/#home" className="text-2xl text-white font-bold mr-8">
            Asescon
          </Link>

          <div
            className="hidden lg:flex ml-auto
            items-center gap-6 text-white font-medium"
          >
            <Link
              href="/"
              className="hover:bg-blue-900/40 p-4 rounded-2xl transition-colors"
            >
              INICIO
            </Link>
            <Link
              href="/servicio"
              className="hover:bg-blue-900/40 p-4 rounded-2xl transition-colors"
            >
              SERVICIOS
            </Link>
            <Link
              href="/#contacto"
              className="hover:bg-blue-900/40 p-4 rounded-2xl transition-colors"
            >
              CONTACTO
            </Link>
            <Link
              href="/blog"
              className="hover:bg-blue-900/40 p-4 rounded-2xl transition-colors"
            >
              RECURSOS
            </Link>
            <Link
              href="/nosotros"
              className="hover:bg-blue-900/40 p-4 rounded-2xl transition-colors"
            >
              NOSOTROS
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center text-white font-semibold ml-auto gap-4">
            <Link
              href="/unete"
              className="hover:bg-blue-900/40 p-4 rounded-2xl transition-colors"
            >
              UNETE
            </Link>
            <Link
              href="/login"
              className="hover:bg-blue-900/40 p-4 rounded-2xl transition-colors"
            >
              INTRANET
            </Link>
          </div>

          {/* Mobile Notificaciones */}
          <button
            className="lg:hidden p-4 hover:bg-blue-900/40 rounded-2xl text-white stroke-white transition-color"
            onClick={() => {
              setOpenBell((prev) => !prev);
              setOpenMenu(false);
            }}
            aria-label="Toggle Menu"
          >
            {openBell ? <X size={27} /> : <Bell size={27} />}
          </button>

          {/* Mobile Menu de Hamburgesa */}
          <button
            className="lg:hidden p-4 ml-auto hover:bg-blue-900/40 rounded-2xl text-white stroke-white  transition-colors"
            onClick={() => {
              setOpenMenu((prev) => !prev);
              setOpenBell(false);
            }}
            aria-label="Toggle Menu"
          >
            {openMenu ? <X size={30} /> : <Equal size={30} />}
          </button>
        </div>
      </GlassNavbar>

      <AnimatePresence>
        {openMenu && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenMenu(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Panel lateral */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 h-full w-72 bg-slate-900 z-50 shadow-2xl p-6 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="text-white font-bold text-2xl">
                  Asescon
                </Link>
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-3">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenMenu(false)}
                      className={`px-4 py-3 rounded-xl text-[px-15] font-medium transition-all ${
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Navbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <NavbarCard />
    </motion.div>
  );
}
