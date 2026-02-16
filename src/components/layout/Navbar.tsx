"use client";

import Link from "next/link";
import { useState } from "react";
import { Equal, X, Bell } from "lucide-react";
import { motion } from "framer-motion";

import GlassNavbar from "../../shared/ui/navbar/GlasNavbar";

function NavbarCard() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openBell, setOpenBell] = useState(false);

  return (
    <GlassNavbar>
      <div className="flex items-center h-20 px-6 md:px-10">
        {/* Logo */}
        <Link href="/" className="text-2xl text-white font-bold mr-8">
          Asescon
        </Link>

        <div
          className="hidden lg:flex
         items-center gap-4 text-white font-medium"
        >
          <Link
            href="/"
            className="hover:bg-blue-900/40 p-3 rounded-2xl transition-colors"
          >
            INICIO
          </Link>
          <Link
            href="/nosotros"
            className="hover:bg-blue-900/40 p-3 rounded-2xl transition-colors"
          >
            NOSOTROS
          </Link>
          <Link
            href="/servicios"
            className="hover:bg-blue-900/40 p-3 rounded-2xl transition-colors"
          >
            SERVICIOS
          </Link>
          <Link
            href="/contacto"
            className="hover:bg-blue-900/40 p-3 rounded-2xl transition-colors"
          >
            CONTACTO
          </Link>
          <Link
            href="/blog"
            className="hover:bg-blue-900/40 p-3 rounded-2xl transition-colors"
          >
            BLOG
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center text-white font-semibold ml-auto gap-4">
          <Link
            href="/intranet"
            className="hover:bg-blue-900/40 p-3 rounded-2xl transition-colors"
          >
            INTRANET
          </Link>
          <Link
            href="/intranet"
            className="hover:bg-blue-900/40 p-3 rounded-2xl transition-colors"
          >
            UNETE
          </Link>
        </div>

        {/* Mobile Notificaciones */}
        <button
          className="lg:hidden p-3 hover:bg-blue-900/40 rounded-2xl text-white stroke-white transition-color"
          onClick={() => setOpenBell(!openBell)}
          aria-label="Toggle Menu"
        >
          {openBell ? <X size={24} /> : <Bell size={24} />}
        </button>

        {/* Mobile Menu de Hamburgesa */}
        <button
          className="lg:hidden p-3 ml-auto hover:bg-blue-900/40 rounded-2xl text-white stroke-white  transition-colors"
          onClick={() => setOpenMenu(!openMenu)}
          aria-label="Toggle Menu"
        >
          {openMenu ? <X size={30} /> : <Equal size={30} />}
        </button>
      </div>

      {openBell && (
        <div className="lg:hidden absolute top-20 right-0 w-full bg-blue-white text-white flex flex-col gap-4 px-6 py-5 shadow-lg">
          <Link
            href="/blog"
            onClick={() => setOpenBell(false)}
            className="font-medium hover:text-blue-200 transition-colors"
          >
            Blog
          </Link>
        </div>
      )}

      {openMenu && (
        <div className="lg:hidden absolute top-20 right-0 w-full bg-blue-900 text-white flex flex-col gap-4 px-6 py-5 shadow-lg">
          <Link
            href="/"
            onClick={() => setOpenMenu(false)}
            className="font-medium hover:text-blue-200 transition-colors"
          >
            INICIO
          </Link>
          <Link
            href="/nosotros"
            onClick={() => setOpenMenu(false)}
            className="font-medium hover:text-blue-200 transition-colors"
          >
            NOSOTROS
          </Link>
          <Link
            href="/servicios"
            onClick={() => setOpenMenu(false)}
            className="font-medium hover:text-blue-200 transition-colors"
          >
            SERVICIOS
          </Link>
          <Link
            href="/contacto"
            onClick={() => setOpenMenu(false)}
            className="font-medium hover:text-blue-200 transition-colors"
          >
            CONTACTO
          </Link>
          <Link
            href="/blog"
            onClick={() => setOpenMenu(false)}
            className="font-medium hover:text-blue-200 transition-colors"
          >
            BLOG
          </Link>
          <Link
            href="/intranet"
            onClick={() => setOpenMenu(false)}
            className="font-medium hover:text-blue-200 transition-colors"
          >
            INTRANET
          </Link>
          <Link
            href="/"
            onClick={() => setOpenMenu(false)}
            className="font-medium hover:text-blue-200 transition-colors"
          >
            UNETE
          </Link>
        </div>
      )}
    </GlassNavbar>
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
