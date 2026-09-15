import z from "zod";

import {
  BUSINESS_TYPE_IDS,
  PAIN_POINTS_IDS,
} from "@/src/types/servicio/constants";

// ==========================================
// 1. ESQUEMAS ATÓMICOS Y LITERALES (Base)
// ==========================================

export const businessTypeSchema = z.enum(BUSINESS_TYPE_IDS);
export const painPointSchema = z.enum(PAIN_POINTS_IDS);

export type BusinessType = z.infer<typeof businessTypeSchema>;
export type PainPoint = z.infer<typeof painPointSchema>;
