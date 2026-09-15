"use server";

import { getLinks } from "../api/intranet-api";


export async function getLinksAction() {
  try {
    const links = await getLinks();
    return {
      success: true,
      data: links,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error inesperado.",
    };
  }
}
