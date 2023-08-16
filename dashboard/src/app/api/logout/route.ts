import { NextResponse } from "next/server";
import { AUTH_TOKEN_COOKIE } from "../../../constants/cookies";

export async function POST() {
  const headers = new Headers();
  headers.append('Set-Cookie', `${AUTH_TOKEN_COOKIE}=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT`);
  return NextResponse.json(null, { headers: headers })
}