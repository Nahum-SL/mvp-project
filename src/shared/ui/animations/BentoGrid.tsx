"use client";

import { motion } from "framer-motion";

export default function BentoGrid() {
  return (
    <section className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[150px] gap-6">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="md:col-span-2 md:row-span-2 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold">Main Feature</h2>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-zinc-800 rounded-2xl p-6"
        >
          Feature A
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-zinc-800 rounded-2xl p-6"
        >
          Feature B
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="md:col-span-2 bg-zinc-800 rounded-2xl p-6"
        >
          Wide Section
        </motion.div>
      </div>
    </section>
  );
}
