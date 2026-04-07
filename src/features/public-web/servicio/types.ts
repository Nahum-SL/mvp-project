// src/features/public-web/servicio/types.ts

export interface AIServiceInsight {
  id: number;
  title: string;
  impact: number; // 0–100
  effort: number; // 0–100
  risk: number; // 0–100
  priorityScore: number;
}
