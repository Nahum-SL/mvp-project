"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Equal, X } from "lucide-react";
import { NAV_ITEMS } from "@/src/types/navigation-navbar/navigation";

import GlassNavbar from "./GlasNavbar";

function NavbarCard() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <>
      <GlassNavbar>
        <div className="flex items-center h-20 px-6 md:px-10">
          {/* Logo */}
          <Link href="/" className="text-2xl font-extrabold text-white mr-8">
            asescon
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

            {/* Blog y Herramientas */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown(true)}
              onMouseLeave={() => setOpenDropdown(false)}
            >
              <button
                className="flex items-center gap-2 cursor-pointer hover:bg-blue-900/40 p-4 
                rounded-2xl transition-all duration-200 text-whiteE"
                aria-expanded={openDropdown}
              >
                RECURSOS
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${openDropdown ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Animado */}
              <AnimatePresence>
                {openDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }} // Empieza invisible y 10px arriba
                    animate={{ opacity: 1, y: 0 }} // Baja a su posición original
                    exit={{ opacity: 0, y: -10 }} // Sube y desaparece al salir
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="w-80 grid grid-cols-1 gap-1 p-2 absolute top-full left-0 z-50 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl"
                  >
                    <Link
                      href="/blog"
                      className="flex flex-col px-4 py-3 hover:bg-slate-800 transition-colors rounded-xl"
                    >
                      <span className="text-sm font-semibold text-white">
                        Blog
                      </span>
                      <span className="text-xs text-slate-400">
                        Artículos y contenido educativo
                      </span>
                    </Link>

                    <Link
                      href="/herramientas"
                      className="flex flex-col px-4 py-3 hover:bg-slate-800 transition-colors rounded-xl"
                    >
                      <span className="text-sm font-semibold text-white">
                        Herramientas
                      </span>
                      <span className="text-xs text-slate-400">
                        Calculadoras y utilidades
                      </span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
              href="/intranet"
              className="hover:bg-blue-900/40 p-4 rounded-2xl transition-colors"
            >
              INTRANET
            </Link>
          </div>

          {/* Mobile Menu de Hamburgesa */}
          <button
            className="lg:hidden p-4 ml-auto hover:bg-blue-900/40 rounded-2xl text-white stroke-white  transition-colors"
            onClick={() => {
              setOpenMenu((prev) => !prev);
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
                  const isActive = item.href ? pathname === item.href : false;
                  const isOpen = openItem === item.name;

                  // ITEM CON SUBMENÚ
                  if (item.children) {
                    return (
                      <div key={item.href || item.name} className="flex flex-col">
                        <button
                          onClick={() => setOpenItem(isOpen ? null : item.name)}
                          className="flex items-center justify-between px-4 py-3 rounded-xl 
                        text-slate-400 hover:bg-slate-800 hover:text-white transition-all group"
                        >
                          <span>{item.name}</span>

                          <ChevronDown
                            className={`w-5 h-5 transition-all duration-300 ${
                              isOpen
                                ? "rotate-180 text-white"
                                : "text-slate-500 group-hover:text-white"
                            }`}
                          />
                        </button>

                        {/* Submenú */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="ml-4 pl-2 flex flex-col overflow-hidden border-l border-slate-800"
                            >
                              {item.children.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => setOpenMenu(false)}
                                  className="px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  // ITEM NORMAL
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenMenu(false)}
                      className={`px-4 py-3 rounded-xl font-medium transition-all ${
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
