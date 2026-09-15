import { GratificationInput, GratificationResult } from "../types";

const BONUS_PERCENTAGE = 0.09;
const SEMESTER_MONTHS = 6;

export function calculateGratification(
  input: GratificationInput,
): GratificationResult {
  const { salary, months } = input;

  if (salary <= 0 || months <= 0) {
    return { base: 0, bonus: 0, total: 0 };
  }

  const base = (salary / SEMESTER_MONTHS) * months;
  const bonus = base * BONUS_PERCENTAGE;
  const total = base + bonus;

  return {
    base,
    bonus,
    total,
  };
}
