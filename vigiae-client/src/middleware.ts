import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PUBLIC_ROUTES = ["/login", "/register"]
const PROTECTED_ROUTES = [
  "/dashboard",
  "/my-inspections",
  "/my-account",
  "/configurations",
]

async function getUserFromToken(token: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  try {
    const response = await fetch(`${apiUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.ok ? await response.json() : null
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value
  const { pathname } = request.nextUrl

  // ROTA / (raiz): redireciona baseado no token
  if (pathname === "/") {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    const user = await getUserFromToken(token)
    if (user) {
      return NextResponse.redirect(new URL("/my-inspections", request.url))
    } else {
      // Token inválido, limpa e manda pro login
      const response = NextResponse.redirect(new URL("/login", request.url))
      response.cookies.delete("auth-token")
      return response
    }
  }

  // Sem token + rota protegida → login
  if (!token && PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Com token, valida
  if (token) {
    const user = await getUserFromToken(token)
    const isValid = !!user

    // Token inválido + rota protegida → login
    if (
      !isValid &&
      PROTECTED_ROUTES.some(route => pathname.startsWith(route))
    ) {
      const response = NextResponse.redirect(new URL("/login", request.url))
      response.cookies.delete("auth-token")
      return response
    }

    // Token válido + rota pública → my-inspections
    if (isValid && PUBLIC_ROUTES.includes(pathname)) {
      return NextResponse.redirect(new URL("/my-inspections", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
