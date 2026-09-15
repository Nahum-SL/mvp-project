import { serverApiClient } from "@/src/lib/api/server-api-client";

import type {
  CreateLinkInput,
  UpdateLinkInput,
} from "../schemas/intranet.schema";

export async function createLink(data: CreateLinkInput) {
  return serverApiClient("/intranet", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function updateLink(id: number, data: UpdateLinkInput) {
  return serverApiClient(`/intranet/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    next: { tags: ["intranet"] },
  });
}

export async function deleteLink(id: number) {
  return serverApiClient(`/intranet/${id}`, {
    method: "DELETE",
  });
}

export async function getLinks() {
  return serverApiClient("/intranet/admin");
}

export async function getLink(id: number) {
  return serverApiClient(`/intranet/${id}`);
}
