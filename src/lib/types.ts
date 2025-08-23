// Types for AI Agent system
export interface AgentMetadata {
  id: string;
  name: string;
  description: string;
  /** Optional system prompt used to guide the agent's behavior */
  systemPrompt?: string;
  image: string;
  endpoint: string;
  category: string;
  capabilities: string[];
  price: number; // in ETH
  creator: string;
  created_at: string;
  ipfsHash?: string;
}

export interface AgentInteraction {
  id: string;
  agentId: string;
  userAddress: string;
  message: string;
  response: string;
  timestamp: string;
}

export interface AgentAPIResponse {
  success: boolean;
  response?: string;
  error?: string;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
  external_url?: string;
  agent_endpoint?: string;
}
