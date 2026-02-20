// Proximamente se conectara con el /backend hecho en 

"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCloudUploadAlt } from "react-icons/fa";


interface Props {
  title: string;
  subtitle: string;
  src: string;
  alt: string;
}

// Referencia del Formulario
export default function UneteForm({ title, subtitle, src, alt }: Props) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Columna del Formulario */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm"
          >
            <div className="mb-10">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {title}
              </h2>
              <p className="text-slate-500 mt-2 font-light">{subtitle}</p>
            </div>

            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Nombres */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Nombres Completos
                </label>
                <input
                  type="text"
                  className="
                  w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none 
                  focus:ring-2 focus:ring-blue-500/20 transition-all
                  "
                  placeholder="Nombres y Apellidos"
                />
              </div>

              {/* DNI y Edad */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  DNI
                </label>
                <input
                  type="text"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3"
                  placeholder="-- -- -- --"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Edad
                </label>
                <input
                  type="number"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3"
                  placeholder="--"
                />
              </div>

              {/* Email y Teléfono */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3"
                  placeholder="Tu@correo.gmail"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Teléfono
                </label>
                <input
                  type="tel"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3"
                  placeholder="+51 --- --- ---"
                />
              </div>

              {/*  Experiencia y Puesto */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Años Experiencia
                </label>
                <input
                  type="number"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3"
                  placeholder="--"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Puesto de Interés
                </label>
                <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none">
                  <option>Puesto de Interés</option>
                  <option>Asistente Contable</option>
                  <option>Archivador y Digitador</option>
                  <option>Practicantes</option>
                </select>
              </div>

              {/* File Upload (CV) */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Adjunta tu CV (PDF)
                </label>
                <div className="relative group cursor-pointer">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    accept=".pdf"
                  />
                  <div className="w-full border-2 border-dashed border-slate-200 bg-white p-6 rounded-xl flex flex-col items-center justify-center group-hover:border-blue-500 transition-colors">
                    <FaCloudUploadAlt className="text-3xl text-slate-300 group-hover:text-blue-500 mb-2" />
                    <span className="text-sm text-slate-500 font-medium">
                      Seleccione Archivo o arrastre aquí
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button className="md:col-span-2 mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl uppercase tracking-[0.2em] transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]">
                Enviar Postulación
              </button>
            </form>
          </motion.div>

          {/* Columna de Imagen / Info */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="sticky top-24 space-y-8"
          >
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl">
              <Image src={src} alt={alt} fill className="object-cover" />11
              <div className="absolute inset-0 bg-linear-to-t from-blue-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white text-2xl font-bold leading-tight">
                  Buscamos mentes brillantes para construir el futuro contable.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h4 className="text-blue-900 font-bold mb-2 uppercase text-2xl tracking-widest">
                Aviso de Privacidad
              </h4>
              <p className="text-blue-700/70 text-xl leading-relaxed">
                Tus datos serán tratados con absoluta confidencialidad para
                fines exclusivos de selección de personal según la ley vigente.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
