import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "../../../constants/cookies";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const response = await fetch('http://api:3000/admin/login', {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password }),
    cache: 'no-store',
  })
  const data = await response.json();
  if(response.status === 200) {
    const loggedHeaders = new Headers();
    loggedHeaders.append('Set-Cookie', `${AUTH_COOKIE_NAME}=${data.token}; Path=/; HttpOnly`);
    return NextResponse.json(null, { headers: loggedHeaders, status: response.status })
  }
  return NextResponse.json({ message: data.message }, { status: response.status })
}