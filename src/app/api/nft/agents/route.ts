// POST /api/nft/agents
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // You can validate body fields here if needed
    const nft = new NFT(body);
    await nft.save();
    return NextResponse.json({ success: true, nft });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to save NFT' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import NFT from '@/models/NFT';

// This route returns all agents minted as NFTs from MongoDB
export async function GET() {
  try {
    const agents = await NFT.find({});
    return NextResponse.json({ success: true, agents });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch agents' }, { status: 500 });
  }
}
