import { NextResponse } from 'next/server';
import { AgentService } from '@/lib/agent-service';

export async function GET() {
  try {
    const agents = AgentService.getAllAgents();
    return NextResponse.json({ success: true, agents });
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
}
