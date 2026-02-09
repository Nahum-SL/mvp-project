"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

function NavbarCard() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white text-gray-900 shadow-md">
      <div className="flex items-center h-20 px-6 md:px-10">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold mr-8">
          Asescon
        </Link>

        <div className="hidden md:flex
         items-center gap-4 text-gray-600 font-medium">
          <Link href="/" className="hover:text-blue-700 hover:underline transition-colors">
            INICIO
          </Link>
          <Link
            href="/nosotros"
            className="hover:text-blue-700 hover:underline transition-colors"
          >
            NOSOTROS
          </Link>
          <Link
            href="/servicios"
            className="hover:text-blue-700 hover:underline transition-colors"
          >
            SERVICIOS
          </Link>
          <Link
            href="/planes"
            className="hover:text-blue-700 hover:underline transition-colors"
          >
            PLANES
          </Link>
          <Link
            href="/contacto"
            className="hover:text-blue-700 hover:underline transition-colors"
          >
            CONTACTO
          </Link>
          <Link
            href="/blog"
            className="hover:text-blue-700 hover:underline transition-colors"
          >
            BLOG
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center font-semibold ml-auto gap-4">
          <Link
            href="/intranet"
            className="px-4 py-2 border-2 border-blue-900 rounded-xl text-blue-900  hover:bg-blue-700 hover:text-white transition-colors"
          >
            INTRANET
          </Link>
          <Link
            href="/intranet"
            className="px-4 py-2 border-2 border-blue-900 rounded-xl text-blue-900  hover:bg-blue-700 hover:text-white transition-colors"
          >
            TRABAJA CON NOSOTROS
          </Link>
        </div>

        {/* Mobile button */}
        <button
          className="md:hidden p-3 ml-auto border-2 border-blue-900 rounded-lg hover:bg-blue-700 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

        {open && (
          <div className="md:hidden absolute top-20 right-0 w-full bg-blue-900 text-white flex flex-col gap-4 px-6 py-5 shadow-lg">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="font-medium hover:text-blue-200 transition-colors"
            >
              INICIO
            </Link>
            <Link
              href="/nosotros"
              onClick={() => setOpen(false)}
              className="font-medium hover:text-blue-200 transition-colors"
            >
              NOSOTROS
            </Link>
            <Link
              href="/servicios"
              onClick={() => setOpen(false)}
              className="font-medium hover:text-blue-200 transition-colors"
            >
              SERVICIOS
            </Link>
            <Link
              href="/planes"
              onClick={() => setOpen(false)}
              className="font-medium hover:text-blue-200 transition-colors"
            >
              PLANES
            </Link>
            <Link
              href="/contacto"
              onClick={() => setOpen(false)}
              className="font-medium hover:text-blue-200 transition-colors"
            >
              CONTACTO
            </Link>
            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className="font-medium hover:text-blue-200 transition-colors"
            >
              BLOG
            </Link>
            <Link
              href="/intranet"
              onClick={() => setOpen(false)}
              className="font-medium hover:text-blue-200 transition-colors"
            >
              INTRANET
            </Link>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="font-medium hover:text-blue-200 transition-colors"
            >
              TRABAJA CON NOSOTROS
            </Link>
          </div>
        )}
    </nav>
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
