"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cards = [
  { id: 1, text: "Servicio A", detail: "Expertos en tributación" },
  { id: 2, text: "Servicio B", detail: "Consultoría financiera" },
  { id: 3, text: "Servicio C", detail: "Gestión laboral" },
];

export default function CarouselStack() {
  const [index, setIndex] = useState(0);

  return (
    <div className="relative h-100 flex items-center justify-center">
      <AnimatePresence>
        {cards.map((card, i) => {
          if (i !== index) return null;
          return (
            <motion.div
              key={card.id}
              initial={{ x: 300, opacity: 0, rotate: 10 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              exit={{ x: -300, opacity: 0, rotate: -10 }}
              className="absolute w-64 h-80 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-end"
            >
              <h3 className="text-2xl font-bold text-white">{card.text}</h3>
              <p className="text-zinc-400">{card.detail}</p>
              <button
                onClick={() => setIndex((index + 1) % cards.length)}
                className="mt-4 bg-brand-primary text-white py-2 rounded-xl"
              >
                Siguiente
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
