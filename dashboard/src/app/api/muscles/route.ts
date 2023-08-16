import { cookies } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";
import { AUTH_TOKEN_COOKIE } from "../../../constants/cookies";
import { API_GATEWAY_URL } from "../../../constants/gateways";

export async function GET() {
  const response = await fetch(`${API_GATEWAY_URL}/muscles`)
  const data = await response.json();
  return data;
}

export async function POST(req: Request) {
  const token = cookies().get(AUTH_TOKEN_COOKIE)
  const {name} = await req.json()
  const response = await fetch(`${API_GATEWAY_URL}/muscles`, {
    method: 'POST',
    body: JSON.stringify({name}),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token?.value}`
    }
  })
  return NextResponse.json({status: 'ok', body: await response.json()})
}