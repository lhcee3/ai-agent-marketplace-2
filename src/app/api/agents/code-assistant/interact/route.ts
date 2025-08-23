import { NextResponse } from 'next/server';
import { AgentService } from '@/lib/agent-service';

const codeAssistantResponses = [
  "I can help you with that coding problem! Let me analyze your code.",
  "Here's a suggestion for improving your code structure...",
  "That looks like a common programming pattern. Here's how you can optimize it:",
  "I notice a potential bug in your code. Here's how to fix it:",
  "Great code! Here are some best practices you might consider:",
  "This is a interesting algorithm question. Let me break down the solution:",
  "I can help you debug this issue. Let's trace through the execution:",
  "For better performance, you might want to consider this approach:",
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

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    let response = codeAssistantResponses[Math.floor(Math.random() * codeAssistantResponses.length)];
    
    // Add programming-specific context
    if (message.toLowerCase().includes('bug') || message.toLowerCase().includes('error')) {
      response = "I can help you debug this issue. Common causes include: syntax errors, logic mistakes, or incorrect variable scope. Can you share more details about the error message?";
    } else if (message.toLowerCase().includes('optimize') || message.toLowerCase().includes('performance')) {
      response = "For performance optimization, consider: reducing time complexity, minimizing memory usage, using efficient data structures, and avoiding unnecessary operations. What specific performance issues are you facing?";
    } else if (message.toLowerCase().includes('review')) {
      response = "I'll review your code for best practices, readability, performance, and potential bugs. Please share your code and I'll provide detailed feedback.";
    }

    return NextResponse.json({
      success: true,
      response: response,
      agentId: validation.agentId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in code assistant interaction:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
