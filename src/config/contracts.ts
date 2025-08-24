// Contract config for AI Agent NFT Marketplace

export const AI_AGENT_NFT_ABI = [
  // Minimal ABI for mintAgent
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
  // Add more ABI items as needed
];

export const SMART_CONTRACTS = {
  AI_AGENT_NFT: "0x8D6aDC4d0EC8b4b1e7AF3424115f983Df1cD7472", // Fuji testnet default
  // Add more contract addresses as needed
};
