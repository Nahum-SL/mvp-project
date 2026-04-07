import { AIServiceInsight } from "../../types";

export const generateNarrative = (services: AIServiceInsight[]) => {
  if (!services.length) return null;

  const [top, second] = services;

  const getLevel = (value: number) => {
    if (value > 75) return "alto";
    if (value > 50) return "medio";
    return "bajo";
  };

  return {
    headline: `Recomendación estratégica basada en impacto y viabilidad`,

    summary:
      "Análisis estratégico identifica X iniciativas prioritarias, optimizadas en función de impacto esperado y viabilidad operativa.",

    comparison: second
      ? `"${second.title}" también representa una oportunidad relevante, 
         aunque con un nivel de esfuerzo ${getLevel(second.effort)} 
         y riesgo ${getLevel(second.risk)}.`
      : null,

    recommendation: `
      Se recomienda iniciar con "${top.title}" para maximizar resultados 
      en el corto plazo, y evaluar la implementación progresiva de las 
      siguientes iniciativas.
    `,
  };
};
