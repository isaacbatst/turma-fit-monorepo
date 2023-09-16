import { NextRequest, NextResponse } from "next/server"
import { AUTH_TOKEN_COOKIE } from "./constants/cookies"

export const config = {
  matcher: ['/', '/login']
}

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get(AUTH_TOKEN_COOKIE)

  if(request.nextUrl.pathname.startsWith('/login') && cookie) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if(request.nextUrl.pathname === '/' && !cookie?.value) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  return NextResponse.next()
}