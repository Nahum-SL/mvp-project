import type { Contacto } from "@/src/types/contacto/contacto-type";
import { handleResponse } from "@/src/lib/handle-response";

export async function getContactosAction(): Promise<Contacto[]> {
    const res = await fetch("/api/admin/contacto")
    return handleResponse<Contacto[]>(res)
}

export async function getContactoById(id: string): Promise<Contacto> {
    const res = await fetch(`/api/admin/contacto/${id}`)
    return handleResponse<Contacto>(res)
}