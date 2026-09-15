"use server";

import { revalidateTag } from "next/cache";
import { deleteLink } from "../api/intranet-api";

export async function deleteLinkAction(id: number) {
  if (typeof id !== "number") {
    return {
      success: false,
      message: "ID invalido",
    };
  }

  try {
    await deleteLink(id);
    revalidateTag("intranet", "max");

    return {
      success: true,
      message: "Eliminado correctamente",
    };
  } catch (error) {
    return {
      success: true,
      message: error instanceof Error ? error.message : "Error inesperado.",
    };
  }
}
