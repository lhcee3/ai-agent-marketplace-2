import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const PINATA_JWT = process.env.PINATA_JWT;
    const PINATA_API_KEY = process.env.PINATA_API_KEY;
    const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;
    if (!PINATA_JWT && !(PINATA_API_KEY && PINATA_SECRET_API_KEY)) {
      return NextResponse.json({ error: "Missing Pinata credentials" }, { status: 500 });
    }
    const body = await req.json();
    // Forward to Pinata Pinning API (JSON)
    const resp = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        ...(PINATA_JWT
          ? { Authorization: `Bearer ${PINATA_JWT}` }
          : { pinata_api_key: PINATA_API_KEY!, pinata_secret_api_key: PINATA_SECRET_API_KEY! }),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!resp.ok) {
      const text = await resp.text();
      return NextResponse.json({ error: text }, { status: 500 });
    }
    const data = await resp.json();
    // Pinata returns IpfsHash (CID)
    const cid = data?.IpfsHash as string | undefined;
    if (!cid) return NextResponse.json({ error: "No CID returned" }, { status: 500 });
    return NextResponse.json({ cid, uri: `ipfs://${cid}` });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
