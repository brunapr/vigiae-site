import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  const { pathname } = request.nextUrl

  // Rota raiz: redireciona baseado no token
  if (pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/my-inspections', request.url))
    }
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Rotas auth: se tem token, vai pro inspections
  if ((pathname === '/login' || pathname === '/register') && token) {
    return NextResponse.redirect(new URL('/my-inspections', request.url))
  }

  // Rotas protegidas: se não tem token, vai pro login
  if (pathname.startsWith('/my-inspections') || pathname.startsWith('/profile') || pathname.startsWith('/settings')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}