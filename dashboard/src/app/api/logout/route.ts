import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "../../../constants/cookies";

export async function POST() {
  const headers = new Headers();
  headers.append('Set-Cookie', `${AUTH_COOKIE_NAME}=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT`);
  return NextResponse.json(null, { headers: headers })
}