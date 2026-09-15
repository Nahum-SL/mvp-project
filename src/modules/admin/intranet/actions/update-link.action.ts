"use server";

import { revalidateTag } from "next/cache";
import { updateLink } from "../api/intranet-api";

import {
  updateLinkSchema,
  type UpdateLinkInput,
} from "../schemas/intranet.schema";

import { getFieldErrors } from "@/src/lib/zod/get-fields-error";

export async function updateLinkAction(id: number, data: UpdateLinkInput) {
  const parsed = updateLinkSchema.safeParse(data);

  if (typeof id !== "number") {
    return {
        success: false,
        message: "ID invalido",
    };
  }

  if (!parsed.success) {
    return {
      success: false,
      errors: getFieldErrors(parsed.error),
    };
  }

  try {
    await updateLink(id, parsed.data);
    revalidateTag("intranet", "max");
    return {
      success: true,
      message: "Actualizado correctamente",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error inesperado.",
    };
  }
}
