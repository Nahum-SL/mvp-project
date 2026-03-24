// features/public-pages/unete/components/FormImageSection.tsx
import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  src: string;
  alt: string;
}

export const FormImageSection = ({ src, alt }: Props) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="sticky top-24 space-y-8"
  >
    <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl">
      <Image src={src} alt={alt} fill className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-blue-950/80 via-transparent to-transparent" />
      <div className="absolute bottom-8 left-8 right-8">
        <p className="text-white text-2xl font-bold leading-tight">
          Buscamos mentes brillantes para construir el futuro contable.
        </p>
      </div>
    </div>

    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
      <h4 className="text-blue-900 font-bold mb-2 uppercase text-lg tracking-widest">
        Aviso de Privacidad
      </h4>
      <p className="text-blue-700/70 text-sm leading-relaxed">
        Tus datos serán tratados con absoluta confidencialidad para fines
        exclusivos de selección de personal.
      </p>
    </div>
  </motion.div>
);
