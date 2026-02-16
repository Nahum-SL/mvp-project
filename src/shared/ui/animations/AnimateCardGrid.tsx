"use client";

// Animaciones
import { motion } from "framer-motion";

type Card = {
  id: number;
  title: string;
  description: string;
};

const cards: Card[] = [
  
  // Ejemplos
  { id: 1, title: "Analytics", description: "Track your performance easily." },
  { id: 2, title: "Automation", description: "Automate workflows seamlessly." },
  { id: 3, title: "Security", description: "Enterprise-level security." },
  { id: 4, title: "Integrations", description: "Connect with your tools." },
  { id: 5, title: "Reports", description: "Generate detailed reports." },
  { id: 6, title: "Support", description: "24/7 premium support." },
];

export default function AnimatedCardGrid() {
  return (
    <section className="px-8 py-12">
      <motion.div
        className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 justify-center"
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {cards.map((card) => (
          <motion.div
            key={card.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05 }}
            className="rounded-2xl gap-6 bg-zinc-900 p-6 shadow-lg border border-blue-900 hover:border-blue-600"
          >
            <div className="relative h-48"></div>
            <h3 className="text-xl font-semibold text-white text-pretty mb-2">{card.title}</h3>
            <p className="text-zinc-400">{card.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
