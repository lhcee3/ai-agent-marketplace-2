import { NextResponse } from 'next/server';
import { IPFSService } from '@/lib/ipfs-service';
import { AgentService } from '@/lib/agent-service';

// This route returns all agents minted as NFTs (with metadata from Pinata/IPFS)
export async function GET() {
  try {
    // In a real implementation, you would fetch all agent metadata hashes from your contract or DB
    // For demo, get all agents and simulate IPFS metadata fetch
    const agents = AgentService.getAllAgents();
    // Only include agents with ipfsHash (i.e., minted)
    const mintedAgents = agents.filter(agent => agent.ipfsHash);
    // Optionally, fetch metadata from IPFS for each agent
    // For demo, just return agent data
    return NextResponse.json({ success: true, agents: mintedAgents });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch agents' }, { status: 500 });
  }
}
