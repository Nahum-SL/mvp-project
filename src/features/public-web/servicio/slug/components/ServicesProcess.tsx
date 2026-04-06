"use client";

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Analizamos tu situación actual para identificar oportunidades y riesgos clave.",
  },
  {
    number: "02",
    title: "Estrategia",
    description:
      "Definimos un plan claro, alineado a tus objetivos y al entorno normativo.",
  },
  {
    number: "03",
    title: "Implementación",
    description: "Ejecutamos soluciones con precisión y seguimiento constante.",
  },
  {
    number: "04",
    title: "Optimización continua",
    description:
      "Ajustamos y mejoramos para maximizar resultados a largo plazo.",
  },
];

export default function ServiceProcess() {
  return (
    <section className="py-32 bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-serif mb-20">
          Un proceso claro <br/> sin fricción
        </h2>

        {/* Grid editorial */}
        <div className="grid md:grid-cols-2 border-t border-slate-800">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`
                py-10 pr-8
                border-b border-slate-800
                ${i % 2 === 0 ? "md:border-r md:pr-12" : "md:pl-12"}
              `}
            >
              <div className="space-y-4">
                {/* Number */}
                <span className="text-sm text-slate-500 tracking-widest">
                  {step.number}
                </span>

                {/* Title */}
                <h3 className="text-xl font-medium text-white">{step.title}</h3>

                {/* Description */}
                <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
