'use server';

import { serverApiClient } from "@/src/lib/api/server-api-client";
import { ApiResponse } from "@/src/shared";
import type { JobApplication } from "@/src/types/unete/unete-types";


export async function getJobApplications(): Promise<JobApplication[]> {
  const res = await serverApiClient<ApiResponse<JobApplication[]>>("/unete/admin");
  return res.data;
}

export async function getJobApplicationById(id: string): Promise<JobApplication> {
  const res = await serverApiClient<ApiResponse<JobApplication>>(`/unete/${id}`);
    return res.data;
}