"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type IntranetCard = {
  id: number;
  title: string;
  href: string;
  icon?: string;
};

interface IntranetCardsGridProps {
  cards: IntranetCard[];
}

function IntranetCard({ title, href, icon }: Omit<IntranetCard, "id">) {
  return (
    <Link href={href} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -4 }}
        className="h-full bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200"
      >
        {icon && <div className="text-3xl mb-3">{icon}</div>}
        <h3 className="text-center text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
      </motion.div>
    </Link>
  );
}

export default function IntranetCardsGrid({ cards }: IntranetCardsGridProps) {
  return (
    <section className="min-h-screen py-4 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] max-w-300px"
            >
              <IntranetCard
                title={card.title}
                href={card.href}
                icon={card.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
