import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PUBLIC_ROUTES = ["/login", "/register"]
const PROTECTED_ROUTES = [
  "/dashboard",
  "/my-inspections",
  "/my-account",
  "/configurations",
]

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value
  const { pathname } = request.nextUrl

  // Rota / (raiz): redireciona baseado apenas na existência do cookie
  if (pathname === "/") {
    return token
      ? NextResponse.redirect(new URL("/my-inspections", request.url))
      : NextResponse.redirect(new URL("/login", request.url))
  }

  // Sem token + rota protegida → login
  if (!token && PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Com token + rota pública → my-inspections
  if (token && PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/my-inspections", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
