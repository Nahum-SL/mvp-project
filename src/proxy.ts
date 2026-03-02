// src/proxy.ts
import { NextResponse, NextRequest } from "next/server";

const ROLE_ROUTES = {
  ADMIN: "/admin",
  COLABORADOR: "/intranet",
  CLIENTE: "/intranet",
};

export function proxy(request: NextRequest) {
  const token = request.cookies.get("asescon_token")?.value;
  const { pathname } = request.nextUrl;

  // 1. SI NO HAY TOKEN
  if (!token) {
    // Solo redirigir si intenta entrar a zonas privadas
    if (pathname.startsWith("/admin") || pathname.startsWith("/intranet")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Si no hay token y va a /login o raíz, permitir (NextResponse.next)
    return NextResponse.next();
  }

  // 2. SI HAY TOKEN
  const payload = decodeJWT(token);
  const userRole = payload?.role as keyof typeof ROLE_ROUTES;

  // Si el token es inválido o no tiene rol, borrar cookie y mandar al login
  if (!userRole) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("asescon_token");
    return response;
  }

  // A. Evitar que un logueado entre al /login
  if (pathname.startsWith("/login")) {
    const dest = ROLE_ROUTES[userRole] || "/intranet";
    return NextResponse.redirect(new URL(dest, request.url));
  }

  // B. Protección de /admin (Solo para ADMIN)
  if (pathname.startsWith("/admin") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/intranet", request.url));
  }

  // C. Si todo está ok, continuar
  return NextResponse.next();
}

// Helper para decodificar JWT en el Edge
function decodeJWT(token: string) {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    // atob es nativo en el Edge Runtime de Next.js
    const jsonPayload = atob(base64);
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export const config = {
  matcher: [
    /*
     * Match de todas las rutas excepto archivos estáticos y API
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public|.*\\.(?:svg|png|jpg|jpeg|webp)$).*)",
  ],
};
