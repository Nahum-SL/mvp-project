// --------------
// --- IGNORE ---
// --------------
// Aun no se usa, pero es para tener un lugar centralizado donde definir los roles de usuario 
// y evitar errores de tipeo en el futuro.
export const userRole = {
  ADMIN: "ADMIN",
  COLABORADOR: "COLABORADOR",
  CLIENTE: "CLIENTE",
} as const;

export type userRole = (typeof userRole)[keyof typeof userRole];
