"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Post = {
  id: number;
  title: string;
  image: string;
};

const posts: Post[] = [
  {
    id: 1,
    title: "Design Systems in 2026",
    image: "/ejemplo.jpeg",
  },
  {
    id: 2,
    title: "Mastering React Patterns",
    image: "/ejemplo.jpeg",
  },
  {
    id: 3,
    title: "Modern UI Trends",
    image: "/ejemplo.jpeg",
  },
];

export default function BlogGrid() {
  return (
    <section className="p-6">
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ scale: 1.03 }}
            className="relative h-64 rounded-2xl overflow-hidden group"
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-semibold">{post.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
