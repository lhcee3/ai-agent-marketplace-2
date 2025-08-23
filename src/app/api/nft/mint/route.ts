import { NextResponse } from 'next/server';
import { AgentService } from '@/lib/agent-service';
import { IPFSService } from '@/lib/ipfs-service';

export async function POST(request: Request) {
  try {
    const { name, image, description, systemPrompt, walletAddress } = await request.json();
    if (!name || !image || !description || !walletAddress) {
      return NextResponse.json(
        { success: false, error: 'Name, image, description, and wallet address are required' },
        { status: 400 }
      );
    }

    // Prepare agent metadata (exclude systemPrompt from IPFS metadata)
    const agentData = {
      id: `${Date.now()}`,
      name,
      image,
      description,
      creator: walletAddress,
      category: 'Custom',
      capabilities: [],
      price: 0,
      endpoint: '',
      created_at: new Date().toISOString(),
      systemPrompt,
    };

    // Upload metadata to IPFS/Pinata
    const mintResult = await IPFSService.mintAgentNFT(agentData);
    if (!mintResult.success) {
      return NextResponse.json(
        { success: false, error: mintResult.error },
        { status: 500 }
      );
    }

    // Simulate storing agent with ipfsHash
    const agentWithIpfs = {
      ...agentData,
      id: `${Date.now()}`,
      ipfsHash: mintResult.ipfsHash,
    };
    AgentService.createAgent(agentWithIpfs);

    // Simulate minting NFT (replace with contract call in production)
    const mockTransactionHash = `0x${Math.random().toString(16).substring(2, 66)}`;
    const mockTokenId = Math.floor(Math.random() * 10000);

    return NextResponse.json({
      success: true,
      tx: mockTransactionHash,
      tokenId: mockTokenId,
      tokenURI: mintResult.tokenURI,
      ipfsUrl: mintResult.tokenURI,
      agent: {
        id: agentWithIpfs.id,
        name: agentWithIpfs.name,
        price: agentWithIpfs.price,
      },
      owner: walletAddress,
    });
  } catch (error) {
    console.error('Error minting NFT:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to mint NFT' },
      { status: 500 }
    );
  }
}
