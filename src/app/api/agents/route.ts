import { NextResponse } from 'next/server';
import { AgentService } from '@/lib/agent-service';
import { AgentMetadata } from '@/lib/types';

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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, image, description, systemPrompt } = body as Partial<AgentMetadata> & { systemPrompt?: string };

    if (!name || !image || !description) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Minimal defaults for required fields that aren’t part of the form
    const slug = name.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
    const endpoint = `/api/agents/${encodeURIComponent(slug)}/interact`;
    const category = 'Custom';
    const capabilities: string[] = ['custom'];
    const price = 0;
    const creator = '0x0000000000000000000000000000000000000000';

    const created = AgentService.createAgent({
      name,
      image,
      description,
      systemPrompt,
      endpoint,
      category,
      capabilities,
      price,
      creator,
    });

    return NextResponse.json({ success: true, agent: created });
  } catch (error) {
    console.error('Error creating agent:', error);
    return NextResponse.json({ success: false, error: 'Failed to create agent' }, { status: 500 });
  }
}
