"use client";

import Image from "next/image";

// Lista de logos de los clientes (puedes agregar más)
const logos = [
  "/logos-clientes/agropecuaria-chincha.webp",
  "/logos-clientes/corporacion-avicola.webp",
  "/logos-clientes/estructuras-metalicas.webp",
  "/logos-clientes/maquinaria-pesada.webp",
  "/logos-clientes/operaciones-logisticas.webp",
  "/logos-clientes/satelite-radio.webp",
  "/logos-clientes/viale-express.webp",
  "/logos-clientes/avipecuaria-saldaña.webp",
  "/logos-clientes/acgpn-chincha.webp",
  "/logos-clientes/sizes-fact.webp",
  "/logos-clientes/web-mail.webp",
  "/logos-clientes/start-soft.webp",
]; // agrega todos

export default function ServiceTrust() {
  return (
    <section className="py-32 bg-white border-t border-slate-100 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <p className="text-sm uppercase tracking-widest text-slate-400 mb-12 text-center">
          Confianza construida con resultados
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 text-center mb-20 border-y border-slate-200">
          <Stat value="+700" label="Empresas" />
          <Stat value="30+" label="Años" />
          <Stat value="90%" label="Cumplimiento" />
        </div>

        {/* Logos carousel */}
        <div className="relative">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-linear-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-linear-to-l from-white to-transparent z-10" />

          {/* Track */}
          <div className="overflow-hidden">
            <div className="flex gap-16 animate-marquee w-max">
              {[...logos, ...logos].map((logo, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center opacity-60 grayscale 
                  hover:opacity-100 hover:grayscale-0 transition"
                >
                  <Image
                    src={logo}
                    alt="Cliente"
                    width={343}
                    height={147}
                    className="h-10 md:h-12 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

//  Subcomponente stat (más limpio)
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="py-10">
      <p className="text-4xl md:text-5xl font-semibold text-slate-800">
        {value}
      </p>
      <p className="text-xs uppercase tracking-widest text-slate-500 mt-2">
        {label}
      </p>
    </div>
  );
}
