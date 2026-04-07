"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp } from "lucide-react";
import { AIServiceInsight } from "../../types";
import { generateNarrative } from "../narrative/GenerateNarrative";

interface Props {
  recommendations: AIServiceInsight[];
}

export const AIRecommendationLayer = ({ recommendations }: Props) => {
  const narrative = generateNarrative(recommendations);

  if (!narrative || !recommendations.length) return null;

  const top = recommendations[0];

  return (
    <section className="relative mb-12 will-change-transform">
      {/* Glow background tipo Vercel */}
      <div
        className="absolute inset-0 bg-linear-to-r from-blue-50 via-white to-purple-50 
      blur-xl md:blur-2xl opacity-60 rounded-4xl"
      />

      <div className="relative bg-white/80 backdrop-blur-xl border border-slate-100 rounded-4xl p-5 md:p-8 shadow-xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="p-2 bg-blue-600 text-white rounded-xl">
            <Sparkles size={18} />
          </div>
          <h2 className="text-sm font-extrabold tracking-widest uppercase text-slate-500">
            AI Strategic Recommendation
          </h2>
        </div>

        {/* Headline */}
        <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-4 leading-tight">
          {narrative.headline}
        </h3>

        {/* Summary */}
        <p className="text-slate-600 leading-relaxed mb-4 max-w-3xl">
          {narrative.summary}
        </p>

        {/* Comparison */}
        {narrative.comparison && (
          <p className="text-slate-500 text-sm mb-6 max-w-2xl">
            {narrative.comparison}
          </p>
        )}

        {/* Highlight card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-linear-to-br from-slate-900 to-slate-800 text-white 
          rounded-2xl p-6 flex flex-col md:flex-row gap-4 md:justify-between md:items-center"
        >
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">
              Prioridad #1
            </p>
            <h4 className="text-lg">{top.title}</h4>
          </div>

          <div className="flex justify-between md:justify-start md:gap-6 text-xs text-slate-300 w-full md:w-auto">
            <div>
              <p>Impacto</p>
              <p className="text-white font-bold">
                {Math.round(top.impact) / 10}
              </p>
            </div>
            <div>
              <p>Esfuerzo</p>
              <p className="text-white font-bold">
                {Math.round(top.effort) / 10}
              </p>
            </div>
            <div>
              <p>Riesgo</p>
              <p className="text-white font-bold">
                {Math.round(top.risk) / 10}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Recommendation */}
        <p className="mt-6 text-slate-700 font-medium max-w-full md:max-w-3xl">
          {narrative.recommendation}
        </p>

        {/* Footer hint */}
        <div className="flex items-center gap-2 mt-6 text-xs text-slate-400">
          <TrendingUp size={14} />
          Basado en análisis de impacto, esfuerzo y riesgo
        </div>
      </div>
    </section>
  );
};
