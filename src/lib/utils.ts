import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD") // Separa acentos de las letras
    .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
    .replace(/\s+/g, "-") // Reemplaza espacios por guiones
    .replace(/[^\w-]+/g, "") // Elimina caracteres no alfanuméricos
    .replace(/--+/g, "-"); // Evita guiones dobles
};
