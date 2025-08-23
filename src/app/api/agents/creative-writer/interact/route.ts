import { NextResponse } from 'next/server';
import { AgentService } from '@/lib/agent-service';

const creativeResponses = [
  "Let me spark your creativity! Here's an inspiring idea...",
  "I love creative challenges! Let me craft something beautiful for you:",
  "Here's a creative piece inspired by your request:",
  "Let your imagination soar! Here's what I've created:",
  "Creativity flows through words. Here's my contribution:",
  "Art and storytelling combined! Here's something special:",
  "Let me paint with words for you:",
  "Every story has magic. Here's yours:",
];

export async function POST(request: Request) {
  try {
    const { message, apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'API key required' },
        { status: 401 }
      );
    }

    const validation = AgentService.validateAPIKey(apiKey);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired API key' },
        { status: 401 }
      );
    }

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }

    // Simulate creative AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let response = creativeResponses[Math.floor(Math.random() * creativeResponses.length)];
    
    // Add creative context
    if (message.toLowerCase().includes('story') || message.toLowerCase().includes('tale')) {
      response = "Once upon a time, in a world where imagination knows no bounds... Let me weave a tale that captures the essence of your request. Every great story begins with a single word, and yours starts now.";
    } else if (message.toLowerCase().includes('poem') || message.toLowerCase().includes('poetry')) {
      response = "Poetry flows like a gentle stream,\nWords dancing in harmony's dream.\nLet me craft verses that sing to your soul,\nA creative piece to make your heart whole.";
    } else if (message.toLowerCase().includes('creative') || message.toLowerCase().includes('write')) {
      response = "Creativity is the bridge between dreams and reality. I'll help you express your ideas with vivid imagery, compelling narratives, and original concepts that bring your vision to life.";
    }

    return NextResponse.json({
      success: true,
      response: response,
      agentId: validation.agentId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in creative writer interaction:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
