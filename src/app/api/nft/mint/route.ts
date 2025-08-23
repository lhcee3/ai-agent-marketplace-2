import { NextResponse } from 'next/server';
import { AgentService } from '@/lib/agent-service';
import { IPFSService } from '@/lib/ipfs-service';

export async function POST(request: Request) {
  try {
    const { agentId, userAddress } = await request.json();
    
    if (!agentId || !userAddress) {
      return NextResponse.json(
        { success: false, error: 'Agent ID and user address are required' },
        { status: 400 }
      );
    }

    // Get agent details
    const agent = AgentService.getAgentById(agentId);
    if (!agent) {
      return NextResponse.json(
        { success: false, error: 'Agent not found' },
        { status: 404 }
      );
    }

    // Mint NFT with IPFS metadata
    const mintResult = await IPFSService.mintAgentNFT(agent);
    
    if (!mintResult.success) {
      return NextResponse.json(
        { success: false, error: mintResult.error },
        { status: 500 }
      );
    }

    // In a real implementation, you would:
    // 1. Call the smart contract to mint the NFT
    // 2. Store the transaction hash and token ID
    // 3. Update the agent's ownership status
    
    // For demo purposes, we'll simulate a successful mint
    const mockTransactionHash = `0x${Math.random().toString(16).substring(2, 66)}`;
    const mockTokenId = Math.floor(Math.random() * 10000);

    return NextResponse.json({
      success: true,
      message: 'Agent NFT minted successfully',
      transactionHash: mockTransactionHash,
      tokenId: mockTokenId,
      tokenURI: mintResult.tokenURI,
      ipfsHash: mintResult.ipfsHash,
      agent: {
        id: agent.id,
        name: agent.name,
        price: agent.price
      },
      owner: userAddress
    });

  } catch (error) {
    console.error('Error minting NFT:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to mint NFT' },
      { status: 500 }
    );
  }
}
