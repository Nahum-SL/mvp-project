// src/features/admin/dashboard/action.ts
"use server";
import { cookies } from "next/headers";
import { API_URL } from "@/src/lib/api-url";

export async function getDashboardStats() {
  const cookieStore = await cookies();
  const token = cookieStore.get("asescon_token")?.value;

  try {
    const res = await fetch(`${API_URL}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 60 }, // Cache por 5 minutos
    });
    if (!res.ok) throw new Error();
    return await res.json();
  } catch (e) {
    return { leads: 0, posts: 0, links: 0, views: "0", chartData: [] };
  }
}
