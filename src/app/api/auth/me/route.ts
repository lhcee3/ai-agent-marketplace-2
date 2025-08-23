import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cs = await cookies();
  const token = cs.get("session")?.value;
  const address = cs.get("addr")?.value;
  if (!token || !address) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
  return NextResponse.json({ authenticated: true, address }, { status: 200 });
}
