// src/proxy.ts
import { NextResponse, NextRequest } from "next/server";

const ROLE_ROUTES = {
  ADMIN: "/admin",
};

// src/proxy.ts
export function proxy(request: NextRequest) {
  const token = request.cookies.get("asescon_token")?.value;
  const { pathname } = request.nextUrl;

  // 0. SIEMPRE PERMITIR /intranet (Punto de entrada público)
  if (pathname.startsWith("/intranet")) {
    return NextResponse.next();
  }

  // 1. SI NO HAY TOKEN
  if (!token) {
    // Si intenta ir a /admin sin token -> al login
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // 2. SI HAY TOKEN (Admin logueado)
  const payload = decodeJWT(token);
  const userRole = payload?.role;

  // A. Si intenta ir a /login ya estando logueado -> directo al Dashboard
  if (pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // B. Protección de /admin
  if (pathname.startsWith("/admin") && userRole !== "ADMIN") {
    // Si el token no es de admin, lo regresamos a la intranet
    return NextResponse.redirect(new URL("/intranet", request.url));
  }

  return NextResponse.next();
}

// Helper para decodificar JWT en el Edge
function decodeJWT(token: string) {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = atob(base64);
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public|.*\\.(?:svg|png|jpg|jpeg|webp)$).*)",
  ],
};
