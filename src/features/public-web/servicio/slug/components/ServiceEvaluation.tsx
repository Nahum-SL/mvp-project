"use client";

import { motion } from "framer-motion";
import { MetricsDonutGroup } from "../../components/recommendation/metricas/MetricDonutGroup";

interface Props {
  impact: number;
  effort: number;
  risk: number;
}

export default function ServiceEvaluation({ impact, effort, risk }: Props) {
  const insights = {
    impact: getImpactInsight(impact),
    effort: getEffortInsight(effort),
    risk: getRiskInsight(risk),
  };

  return (
    <section className="py-28 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-500 mb-4">
            Evaluación estratégica
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900">
            ¿Qué tan conveniente es esta solución?
          </h2>

          <p className="text-slate-500 mt-4 text-sm">
            Analizamos impacto, esfuerzo y riesgo para ayudarte a tomar una
            decisión informada y alineada a tus objetivos.
          </p>
        </motion.div>

        {/* Donuts */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto mb-16"
        >
          <MetricsDonutGroup impact={impact} effort={effort} risk={risk} />
        </motion.div>

        {/* Cards explicativas */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "Impacto",
              icon: "🚀",
              value: impact,
              description: "Valor real que esta solución genera en tu negocio",
              insight: insights.impact,
            },
            {
              title: "Esfuerzo",
              icon: "⚡",
              value: effort,
              description: "Recursos, tiempo y gestión necesarios",
              insight: insights.effort,
            },
            {
              title: "Riesgo",
              icon: "⚠️",
              value: risk,
              description: "Nivel de incertidumbre o exposición",
              insight: insights.risk,
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative p-6 rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition"
            >
              {/* Glow hover */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition bg-linear-to-r from-indigo-500/10 to-transparent blur-xl rounded-3xl" />

              <div className="relative z-10 space-y-4">
                <div className="text-2xl">{item.icon}</div>

                <h3 className="font-semibold text-slate-900">{item.title}</h3>

                <p className="text-xs text-slate-500">{item.description}</p>

                <div className="text-lg font-semibold text-slate-900">
                  {Math.round(item.value / 10)}/10
                </div>

                <p className="text-sm text-slate-600">{item.insight}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ejemplo contextual (🔥 conversión) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white border border-slate-200 rounded-3xl p-8 max-w-3xl mx-auto"
        >
          <h4 className="font-semibold text-slate-900 mb-4">
            Ejemplo real de aplicación
          </h4>

          <p className="text-sm text-slate-500 mb-4">
            Si actualmente tienes problemas con multas o desorden tributario:
          </p>

          <ul className="space-y-2 text-sm text-slate-700">
            <li>
              🚀 <strong>Impacto alto:</strong> elimina pérdidas económicas y
              mejora tu control financiero
            </li>
            <li>
              ⚡ <strong>Esfuerzo bajo:</strong> solo necesitas proporcionarnos
              información básica
            </li>
            <li>
              ⚠️ <strong>Riesgo bajo:</strong> proceso estandarizado y validado
              por expertos
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- INSIGHTS DINÁMICOS ---------------- */

function getImpactInsight(value: number) {
  if (value >= 80)
    return "Alta transformación con impacto inmediato en tu negocio.";
  if (value >= 50) return "Mejora relevante con resultados progresivos.";
  return "Optimización puntual sin cambios radicales.";
}

function getEffortInsight(value: number) {
  if (value >= 80) return "Requiere dedicación alta y cambios importantes.";
  if (value >= 50) return "Nivel de esfuerzo moderado con cierta gestión.";
  return "Implementación simple, nosotros hacemos la mayor parte.";
}

function getRiskInsight(value: number) {
  if (value >= 80) return "Requiere ejecución experta para evitar riesgos.";
  if (value >= 50)
    return "Nivel de riesgo controlado con seguimiento adecuado.";
  return "Proceso seguro, probado y con mínima incertidumbre.";
}
