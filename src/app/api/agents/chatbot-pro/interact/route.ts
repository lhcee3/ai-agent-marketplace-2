import { NextResponse } from 'next/server';
import { AgentService } from '@/lib/agent-service';

// Simple chatbot responses - in production, you'd integrate with Hugging Face or other AI services
const chatbotResponses = [
  "Hello! I'm ChatBot Pro. How can I assist you today?",
  "I'm here to help with any questions you might have. What would you like to know?",
  "That's an interesting question! Let me help you with that.",
  "I understand your concern. Here's what I can suggest...",
  "Thank you for using ChatBot Pro! Is there anything else I can help you with?",
  "I'm designed to provide helpful and accurate responses. How can I assist you further?",
  "Great question! Based on my knowledge, I would recommend...",
  "I'm happy to help you solve this problem. Let me break it down for you.",
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

    // Validate API key
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

    // Simulate AI response (replace with actual AI service)
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing time
    
    const response = chatbotResponses[Math.floor(Math.random() * chatbotResponses.length)];
    
    // Add some context based on the message
    let contextualResponse = response;
    if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
      contextualResponse = "Hello! I'm ChatBot Pro. How can I assist you today?";
    } else if (message.toLowerCase().includes('help')) {
      contextualResponse = "I'm here to help! I can assist with customer support, answer questions, and provide general assistance. What do you need help with?";
    } else if (message.toLowerCase().includes('thank')) {
      contextualResponse = "You're welcome! I'm glad I could help. Is there anything else you'd like to know?";
    }

    return NextResponse.json({
      success: true,
      response: contextualResponse,
      agentId: validation.agentId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in chatbot interaction:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
