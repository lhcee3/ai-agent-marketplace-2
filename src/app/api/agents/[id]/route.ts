import { NextResponse } from 'next/server';
import { AgentService } from '@/lib/agent-service';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const agent = AgentService.getAgentById(id);
    
    if (!agent) {
      return NextResponse.json(
        { success: false, error: 'Agent not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, agent });
  } catch (error) {
    console.error('Error fetching agent:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch agent' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const agent = AgentService.getAgentById(id);
    
    if (!agent) {
      return NextResponse.json(
        { success: false, error: 'Agent not found' },
        { status: 404 }
      );
    }

    const { userAddress } = await request.json();
    
    if (!userAddress) {
      return NextResponse.json(
        { success: false, error: 'User address required' },
        { status: 400 }
      );
    }

    // Generate API key for this agent
    const apiKey = AgentService.generateAPIKey(id, userAddress);
    
    return NextResponse.json({ 
      success: true, 
      apiKey, 
      endpoint: agent.endpoint,
      message: 'API key generated successfully. Use this key to interact with the agent.' 
    });
  } catch (error) {
    console.error('Error generating API key:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate API key' },
      { status: 500 }
    );
  }
}
