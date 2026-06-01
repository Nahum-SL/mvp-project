export const AuditStatus = {
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
  INFO: "INFO",
  ERROR: "ERROR",
} as const;

export type AuditStatus = (typeof AuditStatus)[keyof typeof AuditStatus];

// 1. Definimos la estructura común de tus metadatos (opcional pero útil)
export interface AuditMetadata {
  ip?: string;
  userAgent?: string;
  userId?: string;
  errorStack?: string;
  [key: string]: unknown; // Permite otras propiedades extra
}

export interface AuditLog {
  id: string;
  action: string;
  status: AuditStatus;
  message: string;
  metadata?: AuditMetadata;
  createdAt: string; // Viene como string desde el JSON de la API
}

export interface AuditStats {
  total: number;
  errors: number;
  last24h: number;
}

export interface CleanupResponse {
  message: string;
  deletedCount: number;
  timestamp: string;
}
