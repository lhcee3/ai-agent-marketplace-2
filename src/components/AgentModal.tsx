'use client';

import { AgentMetadata } from '@/lib/types';
import { useState } from 'react';

interface AgentModalProps {
  agent: AgentMetadata | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AgentModal({ agent, isOpen, onClose }: AgentModalProps) {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<Array<{
    type: 'user' | 'agent';
    content: string;
    timestamp: string;
  }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const userAddress = '0x1234567890123456789012345678901234567890'; // Mock address

  if (!isOpen || !agent) return null;

  const generateApiKey = async () => {
    try {
      const response = await fetch(`/api/agents/${agent.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userAddress }),
      });
      
      const data = await response.json();
      if (data.success) {
        setApiKey(data.apiKey);
        setConversation([{
          type: 'agent',
          content: 'Hello! I\'m ready to help you. You can now start chatting with me!',
          timestamp: new Date().toISOString(),
        }]);
      }
    } catch (error) {
      console.error('Error generating API key:', error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !apiKey || isLoading) return;

    const userMessage = message.trim();
    setMessage('');
    setIsLoading(true);

    // Add user message to conversation
    setConversation(prev => [...prev, {
      type: 'user',
      content: userMessage,
      timestamp: new Date().toISOString(),
    }]);

    try {
      const response = await fetch(agent.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, apiKey }),
      });

      const data = await response.json();
      
      if (data.success) {
        setConversation(prev => [...prev, {
          type: 'agent',
          content: data.response,
          timestamp: data.timestamp,
        }]);
      } else {
        setConversation(prev => [...prev, {
          type: 'agent',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date().toISOString(),
        }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setConversation(prev => [...prev, {
        type: 'agent',
        content: 'Sorry, I\'m having trouble connecting. Please try again later.',
        timestamp: new Date().toISOString(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {agent.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {agent.category} • {agent.capabilities.join(', ')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {!apiKey ? (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Generate an API key to start interacting with this agent
                </p>
                <button
                  onClick={generateApiKey}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
                >
                  Generate API Key
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {conversation.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-4">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                    rows={2}
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!message.trim() || isLoading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-md font-medium disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
