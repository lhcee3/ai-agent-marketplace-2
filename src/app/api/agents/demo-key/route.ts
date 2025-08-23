import { NextRequest, NextResponse } from 'next/server';
import { AgentService } from '@/lib/agent-service';

export async function POST(request: NextRequest) {
  try {
    const { agentId, userAddress } = await request.json();

    if (!agentId || !userAddress) {
      return NextResponse.json(
        { error: 'Agent ID and user address are required' },
        { status: 400 }
      );
    }

    // Validate that the agent exists
    const agent = AgentService.getAgentById(agentId);
    if (!agent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      );
    }

    // Generate a demo API key
    const apiKey = AgentService.generateAPIKey(agentId, userAddress);

    return NextResponse.json({
      success: true,
      apiKey,
      agentId,
      agentName: agent.name,
      expiresIn: '24 hours',
      message: 'Demo API key generated successfully'
    });

  } catch (error) {
    console.error('Error generating demo key:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
