"use server";

import { revalidatePath } from "next/cache";
import { createLink } from "../api/intranet-api";

import {
  createLinkSchema,
  type CreateLinkInput,
} from "../schemas/intranet.schema";
import { getFieldErrors } from "@/src/lib/zod/get-fields-error";

export async function createLinkAction(data: CreateLinkInput) {
  const parsed = createLinkSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: getFieldErrors(parsed.error),
    };

  }

  try {
    await createLink(parsed.data);

    revalidatePath("/admin/intranet");

    return {
      success: true,
      message: "Creado correctamente",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error inesperado.",
    };
  }
}
