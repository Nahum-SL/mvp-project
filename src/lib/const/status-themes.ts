export const STATUS_STYLES = {
  PENDING:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  CONFIRMED: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  COMPLETED:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
} as const;

export type StatusType = keyof typeof STATUS_STYLES;
