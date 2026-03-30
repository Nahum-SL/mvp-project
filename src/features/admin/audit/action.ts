"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { AuditLog, AuditStats, CleanupResponse } from "@/src/types/audit/audit";

const API_URL = process.env.NEST_API_URL || "http://localhost:3001";

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

// Obtener los logs con filtros opcionales
// src/features/admin/audit/action.ts

export async function getAuditLogs(params?: {
  action?: string;
  status?: string;
  limit?: string;
}): Promise<AuditLog[]> {
  const url = new URL(`${API_URL}/api/audit`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value);
    });
  }

  const response = await fetch(url.toString(), {
    headers: await getAuthHeaders(),
    cache: "no-store",
  });

  if (!response.ok) return [];
  return response.json();
}

// Obtener las estadísticas para las tarjetas
export async function getAuditStats(): Promise<AuditStats> {
  const response = await fetch(`${API_URL}/api/audit/stats`, {
    headers: await getAuthHeaders(),
    next: { revalidate: 30 }, // Cacheamos por 30 segundos
  });

  if (!response.ok) return { total: 0, errors: 0, last24h: 0 };
  return response.json();
}

// Ejecutar limpieza manual
export async function runManualCleanup(): Promise<CleanupResponse> {
  const response = await fetch(`${API_URL}/api/audit/cleanup`, {
    method: "POST",
    headers: await getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Error al limpiar logs");

  revalidatePath("/admin/audit");
  return response.json();
}
