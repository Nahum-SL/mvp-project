"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ServiceHome } from "@/src/types/servicio/servicio-home";

export const ServiceCardHome = ({
  service,
  index,
}: {
  service: ServiceHome;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group relative flex flex-col md:flex-row gap-6 
      p-8 rounded-3xl bg-white border border-slate-200
      hover:shadow-xl hover:-translate-y-1 transition-all duration-300
      before:absolute before:inset-0 before:rounded-3xl 
      before:bg-linear-to-r before:from-transparent 
      before:via-slate-100/40 before:to-transparent 
      before:opacity-0 group-hover:before:opacity-100
      "
    >
      {/* IMAGEN */}
      <div className="relative w-full md:w-40 h-32 md:h-auto rounded-xl overflow-hidden shrink-0">
        <Image
          src={`/${service.image}.webp`}
          alt={service.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* CONTENIDO */}
      <div className="flex flex-col justify-between flex-1">
        <div className="space-y-3">
          {/* PROBLEMA (headline estilo consultora) */}
          <h3 className="text-lg md:text-xl font-semibold text-slate-900 leading-snug">
            {service.title}
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed max-w-md">
            {service.description}
          </p>
        </div>

        {/* CTA */}
        <Link
          href={`/servicio/${service.slug}?pain=${service.pain}&type=${service.type}`}
          className="relative mt-6 z-20 inline-flex items-center gap-2 text-sm font-semibold text-sky-600"
        >
          Ver solución
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </Link>
      </div>
    </motion.div>
  );
};
