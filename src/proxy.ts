// src/proxy.ts
import { NextResponse, NextRequest } from "next/server";

// Centralizamos los roles para evitar errores de dedo
const PROTECTED_ROLES = ["ADMIN", "OWNER"];

export function proxy(request: NextRequest) {
  const token = request.cookies.get("asescon_token")?.value;
  const { pathname } = request.nextUrl;

  // 1. SIEMPRE PERMITIR /intranet (Punto de entrada público)
  // Añadimos una verificación para que no entre en bucle si ya estamos ahí
  if (pathname.startsWith("/intranet")) {
    return NextResponse.next();
  }

  // 2. ESCENARIO: USUARIO NO AUTENTICADO
  if (!token) {
    // Si intenta acceder a cualquier ruta dentro de /admin sin token
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // 3. ESCENARIO: USUARIO AUTENTICADO
  const payload = decodeJWT(token);
  const userRole = payload?.role;

  // A. Si intenta ir a /login ya estando logueado
  if (pathname.startsWith("/login")) {
    // Redirigimos según el poder del rol
    const target = PROTECTED_ROLES.includes(userRole) ? "/admin" : "/intranet";
    return NextResponse.redirect(new URL(target, request.url));
  }

  // B. Protección estricta del panel administrativo
  if (pathname.startsWith("/admin")) {
    if (!PROTECTED_ROLES.includes(userRole)) {
      // Si no es Admin ni Owner, lo mandamos a la zona pública
      return NextResponse.redirect(new URL("/intranet", request.url));
    }
  }

  return NextResponse.next();
}

// Helper para decodificar JWT en el Edge (Versión robusta para Next.js 16+)
function decodeJWT(token: string) {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    // Usamos decodeURIComponent para manejar correctamente tildes/eñes en los nombres
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    throw new Error("Token inválido:" + e);
    return null;
  }
}

export const config = {
  // Optimizamos el matcher para ignorar archivos estáticos y la API
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public|.*\\.(?:svg|png|jpg|jpeg|webp)$).*)",
  ],
};
