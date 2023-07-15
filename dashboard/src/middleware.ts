import { NextRequest, NextResponse } from "next/server"
import { AUTH_COOKIE_NAME } from "./constants/cookies"

export const config = {
  matcher: ['/', '/login']
}

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get(AUTH_COOKIE_NAME)

  if(request.nextUrl.pathname.startsWith('/login') && !cookie) {
    return NextResponse.next()
  }
  
  if(request.nextUrl.pathname.startsWith('/login') && cookie) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if(request.nextUrl.pathname === '/' && cookie?.value) {
    return NextResponse.next()
  }

  if(request.nextUrl.pathname === '/' && !cookie?.value) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  throw new Error('Invalid state')
}