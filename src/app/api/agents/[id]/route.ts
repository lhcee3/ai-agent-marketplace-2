import { NextResponse } from 'next/server';
import { AgentService } from '@/lib/agent-service';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const userAddress = body?.userAddress as string | undefined;

    if (!userAddress) {
      return NextResponse.json({ success: false, error: 'Missing userAddress' }, { status: 400 });
    }

    const agent = AgentService.getAgentById(id);
    if (!agent) {
      return NextResponse.json({ success: false, error: 'Agent not found' }, { status: 404 });
    }

    const apiKey = AgentService.generateAPIKey(id, userAddress);
    return NextResponse.json({ success: true, apiKey });
  } catch (error) {
    console.error('Error generating API key:', error);
    return NextResponse.json({ success: false, error: 'Failed to generate API key' }, { status: 500 });
  }
}
