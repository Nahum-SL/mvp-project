"use client";

import { motion } from "framer-motion";
import GlassNavbar from "./GlasNavbar";
import { NavbarDesktop } from "./navbar/NavbarDesktop";
import { NavbarMobile } from "./navbar/NavbarMobile";
import { useState } from "react";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <GlassNavbar forceSolid={openMenu}>
        <div className="flex items-center h-20 px-6 md:px-10 relative z-50">
          <NavbarDesktop />
          <NavbarMobile open={openMenu} setOpen={setOpenMenu} />
        </div>
      </GlassNavbar>
    </motion.div>
  );
}
