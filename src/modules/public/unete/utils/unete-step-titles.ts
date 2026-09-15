/**
 * Títulos dinámicos para cada uno de los pasos del formulario "Únete a nosotros".
 * Se utiliza 'as const' para asegurar la inmutabilidad y habilitar tipado estricto.
 */
export const UNETE_STEP_TITLES = [
  "Datos personales",
  "Información profesional",
  "Adjunta tu CV",
] as const;

// Opcional: Si en algún momento necesitas el tipo estricto de los títulos
export type UneteStepTitle = (typeof UNETE_STEP_TITLES)[number];
