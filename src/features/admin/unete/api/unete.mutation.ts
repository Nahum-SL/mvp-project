import { handleResponse } from "@/src/lib/handle-response";
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
    const res = await fetch(`/api/admin/unete/${id}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    return handleResponse<JobApplication>(res);
}
