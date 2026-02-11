"use client";

import { motion } from "framer-motion";

export default function DashboardGrid() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-4"
    >
      {/* Sidebar */}
      <aside className="md:col-span-1 bg-white p-6">
        <h2 className="text-lg font-bold mb-4">Dashboard</h2>
        <nav className="space-y-2 text-zinc-400">
          <p>Overview</p>
          <p>Analytics</p>
          <p>Settings</p>
        </nav>
      </aside>

      {/* Content */}
      <main className="md:col-span-3 p-6 grid gap-6 sm:grid-cols-2">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-zinc-800 p-6 rounded-xl"
        >
          Widget 1
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-zinc-800 p-6 rounded-xl"
        >
          Widget 2
        </motion.div>

        <motion.div className="bg-zinc-800 p-6 rounded-xl sm:col-span-2">
          Full Width Widget
        </motion.div>
      </main>
    </motion.div>
  );
}
