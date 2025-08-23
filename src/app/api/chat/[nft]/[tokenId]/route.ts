import { NextRequest, NextResponse } from "next/server";
import { Contract, JsonRpcProvider } from "ethers";

// Minimal ABIs
const OWNER_OF_ABI = [
  { inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }], name: "ownerOf", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
];
const GET_MD_ABI = [
  { inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }], name: "getAgentMetadata", outputs: [{ components: [ { internalType: "string", name: "name", type: "string" }, { internalType: "string", name: "image", type: "string" }, { internalType: "string", name: "description", type: "string" }, { internalType: "string", name: "systemPrompt", type: "string" } ], internalType: "struct AIAgentNFT.AgentMetadata", name: "", type: "tuple" }], stateMutability: "view", type: "function" },
];

// Marketplace minimal ABI for purchase check
const MP_ABI = [
  // events
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "listingId", type: "uint256" },
      { indexed: false, internalType: "address", name: "buyer", type: "address" },
      { indexed: false, internalType: "uint256", name: "price", type: "uint256" },
    ],
    name: "AgentSold",
    type: "event",
  },
  // listings mapping getter
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "listings",
    outputs: [
      { internalType: "uint256", name: "listingId", type: "uint256" },
      { internalType: "address", name: "nftContract", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "address", name: "seller", type: "address" },
      { internalType: "address", name: "buyer", type: "address" },
      { internalType: "uint256", name: "price", type: "uint256" },
      { internalType: "bool", name: "sold", type: "bool" },
      { internalType: "bool", name: "canceled", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const FUJI_RPC = process.env.AVALANCHE_FUJI_RPC_URL || "https://api.avax-test.network/ext/bc/C/rpc";
const MARKETPLACE_ADDR = (process.env.NEXT_PUBLIC_AI_AGENT_MARKETPLACE_CONTRACT as string | undefined) || "0x08D4a9298Dfdaa3522400AA61101B543D0BF4f91";

async function hasPurchased(provider: JsonRpcProvider, buyer: string, nft: string, tokenId: string) {
  const mp = new Contract(MARKETPLACE_ADDR, MP_ABI, provider);
  const currentBlock = await provider.getBlockNumber();
  const minBlock = Math.max(0, currentBlock - 100_000);
  let to = currentBlock;
  const ids = new Set<string>();
  while (to >= minBlock) {
    const from = Math.max(minBlock, to - 2_000 + 1);
    try {
      const logs = await mp.queryFilter(mp.filters.AgentSold(), from, to);
      for (const ev of logs) {
        const args = (ev as unknown as { args?: Record<string, unknown> }).args ?? {};
        const b = (args["buyer"] as string) ?? "";
        if (b.toLowerCase() === buyer.toLowerCase()) {
          const listingId = (args["listingId"] as { toString?: () => string } | undefined)?.toString?.();
          if (listingId) ids.add(listingId);
        }
      }
    } catch {}
    if (from === 0) break;
    to = from - 1;
  }
  for (const id of ids) {
    try {
      const row = await mp.listings(BigInt(id));
      const rowNft = (row.nftContract as string) || "";
      const rowTokenId = (row.tokenId as bigint).toString();
      if (rowNft.toLowerCase() === nft.toLowerCase() && rowTokenId === tokenId) return true;
    } catch {}
  }
  return false;
}

function getAuthAddress(req: NextRequest) {
  // If you have cookie-based auth, use it; otherwise require client to pass address in header
  const addr = req.headers.get("x-wallet-address");
  return addr ?? undefined;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ nft: string; tokenId: string }> }
) {
  try {
    const { nft, tokenId } = await params;
    const { messages } = (await req.json()) as { messages: Array<{ role: string; content: string }> };
    if (!nft || !tokenId || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const address = getAuthAddress(req);
    if (!address) return NextResponse.json({ error: "Wallet address required" }, { status: 401 });

    // Access: owner or purchaser
  const provider = new JsonRpcProvider(FUJI_RPC);
    try {
      const erc721 = new Contract(nft, OWNER_OF_ABI, provider);
      const owner = (await erc721.ownerOf(BigInt(tokenId))) as string;
      if (owner.toLowerCase() !== address.toLowerCase()) {
    // fallback: has purchased (scan)
    const ok = await hasPurchased(provider, address, nft, tokenId);
        if (!ok) return NextResponse.json({ error: "Access denied" }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: "Unable to verify ownership" }, { status: 403 });
    }

    // Load system prompt server-side only
    let systemPrompt = "You are a helpful AI agent.";
    try {
      const agent = new Contract(nft, GET_MD_ABI, provider);
      const md = await agent.getAgentMetadata(BigInt(tokenId));
      const sp = (md.systemPrompt as string) || "";
      if (sp.trim()) systemPrompt = sp.trim();
    } catch {}

    // Call Google Gemini (Flash)
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });

    const promptMessages = [
      { role: "system", content: systemPrompt },
      ...messages.filter((m) => m?.content).map((m) => ({ role: m.role === "assistant" ? "model" : "user", content: m.content })),
    ];

    // Gemini 1.5 Flash via REST: generateContent
    const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: promptMessages.map((m) => ({ role: m.role === "model" ? "model" : "user", parts: [{ text: m.content }] })),
      }),
    });
    if (!resp.ok) {
      const t = await resp.text();
      return NextResponse.json({ error: t || "Gemini error" }, { status: 500 });
    }
    const data = await resp.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    return NextResponse.json({ reply });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
