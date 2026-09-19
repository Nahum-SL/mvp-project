'use server';

import { serverApiClient } from "@/src/lib/api/server-api-client";
import { ApiResponse } from "@/src/shared";
import type { JobApplication, UpdateJobAppStatusPayload } from "@/src/types/unete/unete-types";

interface UpdateParamas {
    id: string;
    payload: UpdateJobAppStatusPayload;
}

// UPDATE
export async function updateJobAppStatusAction({
    id,
    payload,
}: UpdateParamas): Promise<JobApplication> {
    const res = await serverApiClient<ApiResponse<JobApplication>>(`/unete/${id}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    return res.data;
}

