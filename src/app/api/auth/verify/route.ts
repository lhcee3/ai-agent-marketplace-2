import { NextResponse } from "next/server";
import crypto from "node:crypto";

// NOTE: This is a simple, demo-only verifier. For production, verify chain, replay, and SIWE format.
function hash(data: string) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

export async function POST(req: Request) {
  try {
    const { address, signature, nonce, ts } = await req.json();
    if (!address || !signature || !nonce || !ts) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    // Basic anti-replay: timestamp within 10 minutes
    const now = Date.now();
    const tsMs = Date.parse(ts);
    if (Number.isNaN(tsMs) || Math.abs(now - tsMs) > 10 * 60 * 1000) {
      return NextResponse.json({ error: "Expired timestamp" }, { status: 400 });
    }
    // We can't recover signer without a lib; accept signature format presence as demo.
    // Derive a session token based on inputs
    const token = hash(`${address}:${signature}:${nonce}:${ts}`);
    const res = NextResponse.json({ ok: true, address }, { status: 200 });
    res.cookies.set("session", token, { httpOnly: true, sameSite: "lax", path: "/" });
    res.cookies.set("addr", address, { sameSite: "lax", path: "/" });
    return res;
  } catch (_e) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
