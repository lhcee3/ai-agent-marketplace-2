import { NextResponse } from "next/server";

export async function POST() {
  const nonce = Math.random().toString(36).slice(2);
  return NextResponse.json({ nonce }, { status: 200 });
}
