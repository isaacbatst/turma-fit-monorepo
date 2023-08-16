import { NextResponse } from "next/server";
import { AUTH_TOKEN_COOKIE } from "../../../constants/cookies";
import { API_GATEWAY_URL } from "../../../constants/gateways";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const response = await fetch(`${API_GATEWAY_URL}/admin/login`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, password }),
      cache: 'no-store',
    })
    const data = await response.json();
    if(response.status === 200) {
      const loggedHeaders = new Headers();
      loggedHeaders.append('Set-Cookie', `${AUTH_TOKEN_COOKIE}=${data.token}; Path=/; HttpOnly`);
      return NextResponse.json(null, { headers: loggedHeaders, status: response.status })
    }
    return NextResponse.json({ message: data.message }, { status: response.status })
  } catch (error) {
    console.error( 'login request error', error)
    return NextResponse.json({ message: 'Bad Gateway' }, { status: 502 })
  }
}