// CONTACTO
export const STATUS_STYLES_CONTACT = {
  PENDING:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  CONFIRMED: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  COMPLETED:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
} as const;

export type StatusTypeContact = keyof typeof STATUS_STYLES_CONTACT;

// UNETE - STATUS BADGE THEMES
export const STATUS_STYLES_UNETE = {
  PENDIENTE:
    "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30",
  REVISADO:
    "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30",
  RECHAZADO:
    "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30",
} as const;

export type StatusTypeUnete = keyof typeof STATUS_STYLES_UNETE;