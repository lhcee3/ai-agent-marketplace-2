"use client";

import { Contract, EventLog, ZeroAddress } from "ethers";
import { getSigner, getPublicProvider } from "./eth";

// Deployed contract address (Fuji) - prefer env override
export const AI_AGENT_NFT_ADDRESS =
  (process.env.NEXT_PUBLIC_AI_AGENT_NFT_CONTRACT as string | undefined) ??
  "0x8D6aDC4d0EC8b4b1e7AF3424115f983Df1cD7472";

// Minimal ABI for our interactions
export const AI_AGENT_NFT_ABI = [
  // mintAgent(string,string,string,string,string) returns (uint256)
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "image", type: "string" },
      { internalType: "string", name: "description", type: "string" },
      { internalType: "string", name: "systemPrompt", type: "string" },
      { internalType: "string", name: "tokenURI", type: "string" },
    ],
    name: "mintAgent",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  // tokenURI(uint256) -> string (from ERC721URIStorage)
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  // ERC721 Transfer event for parsing tokenId from receipt
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
  // getAgentMetadata(uint256) returns (tuple)
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getAgentMetadata",
    outputs: [
      {
        components: [
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "image", type: "string" },
          { internalType: "string", name: "description", type: "string" },
          { internalType: "string", name: "systemPrompt", type: "string" },
        ],
        internalType: "struct AIAgentNFT.AgentMetadata",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  // exists(uint256) -> bool
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "exists",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  // ownerOf(uint256)
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

export function getReadContract() {
  const provider = getPublicProvider();
  return new Contract(AI_AGENT_NFT_ADDRESS, AI_AGENT_NFT_ABI, provider);
}

export async function getWriteContract() {
  const signer = await getSigner();
  return new Contract(AI_AGENT_NFT_ADDRESS, AI_AGENT_NFT_ABI, signer);
}

export type MintedAgent = {
  tokenId: string;
  owner: string;
  metadata: {
    name: string;
    image: string;
    description: string;
    systemPrompt: string;
  } | null;
  tokenURI?: string | null;
};

// Fetch recent Transfer events (mint: from 0x0) and read metadata
export async function fetchRecentMintedAgents(limit = 50, lookbackBlocks = 20_000, chunkSize = 2_000): Promise<MintedAgent[]> {
  const provider = getPublicProvider();
  const contract = new Contract(AI_AGENT_NFT_ADDRESS, AI_AGENT_NFT_ABI, provider);
  const currentBlock = await provider.getBlockNumber();
  const minBlock = Math.max(0, currentBlock - lookbackBlocks);
  const filter = contract.filters.Transfer(ZeroAddress);

  // Fetch logs in chunks to satisfy RPC max-range limits (e.g., 2048 blocks)
  const aggregated: EventLog[] = [];
  let to = currentBlock;
  while (to >= minBlock && aggregated.length < limit * 2) { // fetch a bit extra to be safe
    const from = Math.max(minBlock, to - chunkSize + 1);
    try {
      const chunk = await contract.queryFilter(filter, from, to);
      for (const ev of chunk) {
        if ("args" in ev) {
          aggregated.push(ev as EventLog);
        }
      }
    } catch {
      // If a chunk fails (rare), shrink it and retry next loop
    }
    if (from === 0) break;
    to = from - 1;
  }

  // Newest first
  const ordered = aggregated.sort((a: EventLog, b: EventLog) => (b.blockNumber ?? 0) - (a.blockNumber ?? 0));

  const results: MintedAgent[] = [];
  for (const log of ordered.slice(0, limit)) {
    try {
      // queryFilter returns parsed logs with args
      const args = (log as unknown as { args?: Record<string, unknown> }).args ?? {};
      const tokenId = (args["tokenId"] as { toString?: () => string } | undefined)?.toString?.();
      const to = (args["to"] as string) ?? "";
      if (!tokenId) continue;
      // Read metadata
      let metadata: MintedAgent["metadata"] = null;
      let tokenURI: string | null = null;
      try {
        const md = await contract.getAgentMetadata(tokenId);
        metadata = {
          name: md.name as string,
          image: md.image as string,
          description: md.description as string,
          systemPrompt: md.systemPrompt as string,
        };
      } catch {}
      try {
        tokenURI = (await (contract as Contract).tokenURI(tokenId)) as string;
      } catch {}
      results.push({ tokenId, owner: to, metadata, tokenURI });
    } catch {}
  }
  return results;
}
