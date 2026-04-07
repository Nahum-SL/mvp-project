"use client";

import { MetricsDonutGroup } from "../../components/recommendation/metricas/MetricDonutGroup";

interface Props {
  impact: number;
  effort: number;
  risk: number;
}

export default function ServiceMetrics({ impact, effort, risk }: Props) {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-500 mb-4">
          Evaluación estratégica
        </p>

        <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
          Decisión basada en datos
        </h2>

        <p className="text-slate-500 text-sm max-w-xl mx-auto mb-12">
          Esta evaluación considera impacto, esfuerzo y riesgo para priorizar la
          mejor solución.
        </p>

        <div className="max-w-md mx-auto">
          <MetricsDonutGroup impact={impact} effort={effort} risk={risk} />
        </div>
      </div>
    </section>
  );
}
