"use client";

import { motion } from "framer-motion";
import GlassNavbar from "./GlasNavbar";
import { NavbarDesktop } from "./navbar/NavbarDesktop";
import { NavbarMobile } from "./navbar/NavbarMobile";

export default function Navbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <GlassNavbar>
        <div className="flex items-center h-20 px-6 md:px-10">
          <NavbarDesktop />
          <NavbarMobile />
        </div>
      </GlassNavbar>
    </motion.div>
  );
}
