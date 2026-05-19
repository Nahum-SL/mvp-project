import { NextResponse } from "next/server";

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}


export function handleApiError(error: unknown, defaultMessage = "Error interno del servidor") {
  const message = error instanceof Error ? error.message : defaultMessage;
  
  // Si tu backend de NestJS devolvió un código de error embebido en el mensaje, o si es un 404
  const isNotFound = message.toLowerCase().includes("no encontrado");
  const statusCode = isNotFound ? 404 : 500;
  const errorLabel = isNotFound ? "Not Found" : "Internal Server Error";

  return NextResponse.json(
    {
      statusCode,
      message,
      error: errorLabel,
    },
    { status: statusCode }
  );
}