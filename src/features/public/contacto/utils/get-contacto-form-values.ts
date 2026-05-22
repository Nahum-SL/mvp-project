// utils/get-contacto-form-values.ts

import type { ContactoFormInput } from "../schemas/public-contacto.schema";

export function getContactDefaultValues(): ContactoFormInput {
  return {
    name: "",
    email: "",
    telefono: "",
    fechaNac: "",
    comentario: "",
  };
}
