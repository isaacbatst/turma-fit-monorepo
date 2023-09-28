import { NextRequest, NextResponse } from "next/server"
import { AUTH_TOKEN_COOKIE } from "./constants/cookies"
import { API_GATEWAY_URL } from "./constants/gateways"

export const config = {
  matcher: ['/', '/login']
}

const validateCookie = async (cookie?: string) => {
  if(!cookie) return false

  try {
    const response = await fetch(`${API_GATEWAY_URL}/admin/me`, {
      credentials: 'include',
      headers: {
        cookie: `${AUTH_TOKEN_COOKIE}=${cookie}`
      }
    })
    return response.status === 200
  } catch (err) {
    console.error(err)
    return false
  }
}

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get(AUTH_TOKEN_COOKIE)

  const isValidCookie = await validateCookie(cookie?.value)
  if(request.nextUrl.pathname === '/' && !isValidCookie) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  if(request.nextUrl.pathname.startsWith('/login') && isValidCookie) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }


  return NextResponse.next()
}