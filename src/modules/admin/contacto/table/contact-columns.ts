export const CONTACT_COLUMNS = [
  "Nombre / Email",
  "Teléfono",
  "Fecha Nac.",
  "Estado",
  "Comentario",
  "Acciones",
] as const;

export type ContactColumnHeader = (typeof CONTACT_COLUMNS)[number];
