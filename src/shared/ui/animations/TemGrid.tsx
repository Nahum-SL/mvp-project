"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Member = {
  id: number;
  name: string;
  role: string;
  image: string;
};

const team: Member[] = [
  {
    id: 1,
    name: "Ana Martínez",
    role: "Frontend Developer",
    image: "/ejemplo.jpeg",
  },
  {
    id: 2,
    name: "Carlos López",
    role: "Backend Engineer",
    image: "/ejemplo.jpeg",
  },
  {
    id: 3,
    name: "Lucía Torres",
    role: "UI/UX Designer",
    image: "/ejemplo.jpeg",
  },
];

export default function TeamGrid() {
  return (
    <section className="p-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <motion.div
            key={member.id}
            whileHover={{ y: -5 }}
            className="bg-zinc-900 rounded-2xl p-6 text-center shadow-lg"
          >
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover rounded-full"
              />
            </div>

            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-zinc-400">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
