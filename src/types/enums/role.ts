export const userRole = {
  ADMIN: "ADMIN",
  COLABORADOR: "COLABORADOR",
  CLIENTE: "CLIENTE",
} as const;

export type userRole = (typeof userRole)[keyof typeof userRole];
