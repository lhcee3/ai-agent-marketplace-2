// Smart Contract Configuration for SYNAPTICA
// This file contains contract addresses and configuration for the deployed contracts on Avalanche

export const SMART_CONTRACTS = {
  AI_AGENT_MARKETPLACE: process.env.NEXT_PUBLIC_AI_AGENT_MARKETPLACE_CONTRACT || "0x08D4a9298Dfdaa3522400AA61101B543D0BF4f91",
  AI_AGENT_NFT: process.env.NEXT_PUBLIC_AI_AGENT_NFT_CONTRACT || "0xa26F7Fc96808b39E42B9Ece4100A189F9eE986ce",
} as const;

export const AVALANCHE_CONFIG = {
  CHAIN_ID: parseInt(process.env.NEXT_PUBLIC_AVALANCHE_CHAIN_ID || "43114"),
  RPC_URL: process.env.NEXT_PUBLIC_AVALANCHE_RPC || "https://api.avax.network/ext/bc/C/rpc",
  EXPLORER_URL: "https://snowtrace.io/",
  CHAIN_HEX: "0xa86a", // 43114 in hex
  NETWORK_NAME: "Avalanche Network",
  CURRENCY_SYMBOL: "AVAX",
  CURRENCY_DECIMALS: 18,
} as const;

export const IPFS_CONFIG = {
  GATEWAY: process.env.NEXT_PUBLIC_IPFS_GATEWAY || "https://ipfs.io/ipfs/",
} as const;

// Contract ABIs (simplified for frontend interaction)
export const AI_AGENT_NFT_ABI = [
  "function mint(address to, uint256 tokenId, string memory uri) public",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function tokenURI(uint256 tokenId) public view returns (string)",
  "function approve(address to, uint256 tokenId) public",
  "function setApprovalForAll(address operator, bool approved) public",
  "function balanceOf(address owner) public view returns (uint256)",
  "function totalSupply() public view returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
  "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)"
];

export const AI_AGENT_MARKETPLACE_ABI = [
  "function listItem(uint256 tokenId, uint256 price) public",
  "function purchaseItem(uint256 itemId) public payable",
  "function cancelListing(uint256 itemId) public",
  "function getItem(uint256 itemId) public view returns (tuple(uint256 itemId, uint256 tokenId, address seller, uint256 price, bool sold))",
  "function getAllItems() public view returns (tuple(uint256 itemId, uint256 tokenId, address seller, uint256 price, bool sold)[])",
  "function getMyItems() public view returns (tuple(uint256 itemId, uint256 tokenId, address seller, uint256 price, bool sold)[])",
  "event ItemListed(uint256 indexed itemId, uint256 indexed tokenId, address indexed seller, uint256 price)",
  "event ItemSold(uint256 indexed itemId, uint256 indexed tokenId, address indexed buyer, uint256 price)",
  "event ItemCanceled(uint256 indexed itemId, uint256 indexed tokenId, address indexed seller)"
];

// Utility functions for contract interaction
export function formatAddress(address: string): string {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatAvax(value: string | number): string {
  const avax = typeof value === 'string' ? parseFloat(value) : value;
  return `${avax.toFixed(4)} AVAX`;
}

export function getExplorerUrl(hash: string, type: 'tx' | 'address' = 'tx'): string {
  return `${AVALANCHE_CONFIG.EXPLORER_URL}${type}/${hash}`;
}

// Validation functions
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function isValidTokenId(tokenId: string | number): boolean {
  const id = typeof tokenId === 'string' ? parseInt(tokenId) : tokenId;
  return !isNaN(id) && id >= 0;
}
