"use client";

import { BrowserProvider, Contract, Eip1193Provider, formatEther, parseEther } from "ethers";
import { getPublicProvider, getSigner } from "./eth";

// Marketplace deployed on Fuji
export const AI_AGENT_MARKETPLACE_ADDRESS =
  (process.env.NEXT_PUBLIC_AI_AGENT_MARKETPLACE_CONTRACT as string | undefined) ??
  // Fallback to provided address
  "0x08D4a9298Dfdaa3522400AA61101B543D0BF4f91";

// Minimal ABI to interact with marketplace
export const AI_AGENT_MARKETPLACE_ABI = [
  {
    inputs: [],
    name: "listingFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "nftContract", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "price", type: "uint256" },
    ],
    name: "listAgent",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "listingId", type: "uint256" }],
    name: "buyAgent",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchAvailableListings",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "listingId", type: "uint256" },
          { internalType: "address", name: "nftContract", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "address", name: "seller", type: "address" },
          { internalType: "address", name: "buyer", type: "address" },
          { internalType: "uint256", name: "price", type: "uint256" },
          { internalType: "bool", name: "sold", type: "bool" },
          { internalType: "bool", name: "canceled", type: "bool" },
        ],
        internalType: "struct AIAgentMarketplace.AgentListing[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  // Events (optional for future features)
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "listingId", type: "uint256" },
      { indexed: true, internalType: "address", name: "nftContract", type: "address" },
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
      { indexed: true, internalType: "address", name: "seller", type: "address" },
      { indexed: false, internalType: "uint256", name: "price", type: "uint256" },
    ],
    name: "AgentListed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "listingId", type: "uint256" },
      { indexed: true, internalType: "address", name: "buyer", type: "address" },
      { indexed: false, internalType: "uint256", name: "price", type: "uint256" },
    ],
    name: "AgentSold",
    type: "event",
  },
];

export function getMarketplaceReadContract() {
  const provider = getPublicProvider();
  return new Contract(AI_AGENT_MARKETPLACE_ADDRESS, AI_AGENT_MARKETPLACE_ABI, provider);
}

export async function getMarketplaceWriteContract() {
  const signer = await getSigner();
  return new Contract(AI_AGENT_MARKETPLACE_ADDRESS, AI_AGENT_MARKETPLACE_ABI, signer);
}

export type AgentListing = {
  listingId: string;
  nftContract: string;
  tokenId: string;
  seller: string;
  buyer: string;
  priceWei: string;
  priceEth: string;
};

// Minimal ABI for ERC721 approvals and tokenURI
const ERC721_MIN_ABI = [
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
];

// Optional: read rich metadata if NFT implements getAgentMetadata
const AIAgentNFT_METADATA_ABI = [
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
];

export type ListingWithMetadata = AgentListing & {
  metadata?: { name: string; image: string; description: string; systemPrompt: string } | null;
  tokenURI?: string | null;
};

export async function fetchAvailableListings(): Promise<ListingWithMetadata[]> {
  const provider = getPublicProvider();
  const mp = new Contract(AI_AGENT_MARKETPLACE_ADDRESS, AI_AGENT_MARKETPLACE_ABI, provider);
  const rows = (await mp.fetchAvailableListings()) as Array<{
    listingId: bigint;
    nftContract: string;
    tokenId: bigint;
    seller: string;
    buyer: string;
    price: bigint;
    sold: boolean;
    canceled: boolean;
  }>;

  const listings: AgentListing[] = rows
    .filter((r) => !r.sold && !r.canceled)
    .map((r) => ({
      listingId: r.listingId.toString(),
      nftContract: r.nftContract,
      tokenId: r.tokenId.toString(),
      seller: r.seller,
      buyer: r.buyer,
      priceWei: r.price.toString(),
      priceEth: formatEther(r.price),
    }));

  // Enrich with metadata when available
  const enriched: ListingWithMetadata[] = [];
  for (const l of listings) {
    let metadata: ListingWithMetadata["metadata"] = null;
    let tokenURI: string | null = null;
    try {
      const nft = new Contract(l.nftContract, AIAgentNFT_METADATA_ABI, provider);
      const md = await nft.getAgentMetadata(l.tokenId);
      metadata = {
        name: md.name as string,
        image: md.image as string,
        description: md.description as string,
        systemPrompt: md.systemPrompt as string,
      };
    } catch {
      try {
        const nft = new Contract(l.nftContract, ERC721_MIN_ABI, provider);
        tokenURI = (await nft.tokenURI(l.tokenId)) as string;
      } catch {
        // ignore
      }
    }
    enriched.push({ ...l, metadata, tokenURI });
  }
  return enriched;
}

export async function getListingFeeWei(): Promise<bigint> {
  const provider = getPublicProvider();
  const mp = new Contract(AI_AGENT_MARKETPLACE_ADDRESS, AI_AGENT_MARKETPLACE_ABI, provider);
  return (await mp.listingFee()) as bigint;
}

export async function listAgentForSale(nftContract: string, tokenId: string | number, priceEth: string) {
  const signerContract = await getMarketplaceWriteContract();
  const signer = await getSigner();
  const nft = new Contract(nftContract, ERC721_MIN_ABI, signer);

  // Approve marketplace to transfer this token
  const approveTx = await nft.approve(AI_AGENT_MARKETPLACE_ADDRESS, BigInt(tokenId));
  await approveTx.wait();

  const fee = await signerContract.listingFee();
  const price = parseEther(priceEth);
  const tx = await signerContract.listAgent(nftContract, BigInt(tokenId), price, { value: fee });
  return tx;
}

export async function buyListing(listingId: string, priceWei: string) {
  const mp = await getMarketplaceWriteContract();
  const tx = await mp.buyAgent(BigInt(listingId), { value: BigInt(priceWei) });
  return tx;
}
