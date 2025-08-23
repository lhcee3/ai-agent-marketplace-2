import { NextResponse } from 'next/server';
import { AgentService } from '@/lib/agent-service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const category = searchParams.get('category');

    let agents;

    if (query) {
      agents = AgentService.searchAgents(query);
    } else if (category && category !== 'all') {
      agents = AgentService.getAgentsByCategory(category);
    } else {
      agents = AgentService.getAllAgents();
    }

    return NextResponse.json({ 
      success: true, 
      agents,
      count: agents.length 
    });
  } catch (error) {
    console.error('Error searching agents:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search agents' },
      { status: 500 }
    );
  }
}
