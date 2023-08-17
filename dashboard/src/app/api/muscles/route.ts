import { cookies } from "next/dist/client/components/headers";
import { AUTH_TOKEN_COOKIE } from "../../../constants/cookies";
import { API_GATEWAY_URL } from "../../../constants/gateways";

export async function GET() {
  const token = cookies().get(AUTH_TOKEN_COOKIE)
  const response = await fetch(`${API_GATEWAY_URL}/muscles`, {
    headers: {
      authorization: `Bearer ${token?.value}`
    }
  })
  const body = await response.json()
  return new Response(JSON.stringify(body), {
    status: response.status,
  })
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
  const body = await response.json()
  return new Response(JSON.stringify(body), {
    status: response.status,
  })
}