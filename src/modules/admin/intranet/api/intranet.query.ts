'use server';

import { serverApiClient } from "@/src/lib/api/server-api-client";
import { ApiResponse } from "@/src/shared";
import type { IntranetLink } from "@/src/types/intranet/intranet-types";

export async function getIntranetLinks(): Promise<IntranetLink[]> {
  const res = await serverApiClient<ApiResponse<IntranetLink[]>>("/intranet/admin");
  return res.data;
}

export async function getIntranetLinkById(id: number): Promise<IntranetLink> {
  const res = await serverApiClient<ApiResponse<IntranetLink>>(`/intranet/${id}`);
  return res.data;
}
