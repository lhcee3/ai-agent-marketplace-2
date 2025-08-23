import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true }, { status: 200 });
  res.cookies.set("session", "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });
  res.cookies.set("addr", "", { sameSite: "lax", path: "/", maxAge: 0 });
  return res;
}
