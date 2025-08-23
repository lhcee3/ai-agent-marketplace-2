'use client';

import { useState } from 'react';
import { AgentService } from '@/lib/agent-service';

export default function PlaygroundPage() {
  const [selectedAgent, setSelectedAgent] = useState('agent-2'); // Default to Code Assistant
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [demoMode, setDemoMode] = useState(true);

  const agents = AgentService.getAllAgents();
  const currentAgent = AgentService.getAgentById(selectedAgent);

  const generateDemoKey = async () => {
    try {
      const response = await fetch('/api/agents/demo-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentId: selectedAgent,
          userAddress: '0xDemo1234567890123456789012345678901234567890'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate demo key');
      }

      const data = await response.json();
      setApiKey(data.apiKey);
    } catch (error) {
      console.error('Error generating demo key:', error);
      alert('Failed to generate demo key');
    }
  };

  const testAPI = async () => {
    if (!message.trim()) {
      alert('Please enter a message to test');
      return;
    }

    if (!demoMode && !apiKey.trim()) {
      alert('Please generate a demo API key first');
      return;
    }

    setLoading(true);
    setResponse('');

    try {
      const endpoint = currentAgent?.endpoint || `/api/agents/${selectedAgent}/interact`;
      
      const requestBody = {
        message: message.trim(),
        ...(demoMode ? {} : { apiKey })
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      setResponse(data.response || data.message || 'No response received');
    } catch (error) {
      console.error('Error testing API:', error);
      setResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = {
    'agent-1': 'Hello! I need help with a customer complaint about a delayed order.',
    'agent-2': 'Can you help me debug this JavaScript function that is not working properly?',
    'agent-3': 'Write a short story about a robot discovering emotions.',
    'agent-4': 'Analyze this sales data and provide insights on quarterly performance.',
    'agent-5': 'Create a marketing campaign for a new eco-friendly product.',
    'agent-6': 'Help me write a follow-up email for a potential B2B client.',
    'agent-7': 'Summarize the latest trends in artificial intelligence research.',
    'agent-8': 'Help me set up a CI/CD pipeline for a Node.js application.',
    'agent-9': 'Create a budget plan for a startup with $50k initial funding.',
    'agent-10': 'Translate this English text to Spanish and explain the grammar.',
    'agent-11': 'Create a weekly workout plan for someone new to fitness.',
    'agent-12': 'Review this simple contract clause for potential issues.'
  };

  const useSamplePrompt = () => {
    const prompt = samplePrompts[selectedAgent as keyof typeof samplePrompts];
    if (prompt) {
      setMessage(prompt);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">API Playground</h1>
          <p className="text-gray-400 text-lg sm:text-xl">Test AI agent APIs interactively - try before you buy!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Configuration */}
          <div className="space-y-6">
            {/* Agent Selection */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Select Agent</h2>
              <div className="space-y-4">
                <select
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {agents.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name} - {agent.category}
                    </option>
                  ))}
                </select>

                {/* Agent Info */}
                {currentAgent && (
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-2">{currentAgent.name}</h3>
                    <p className="text-gray-300 text-sm mb-3">{currentAgent.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {currentAgent.capabilities.map((cap) => (
                        <span key={cap} className="px-2 py-1 bg-blue-600 text-blue-100 rounded text-xs">
                          {cap}
                        </span>
                      ))}
                    </div>
                    <p className="text-green-400 font-semibold mt-2">Price: {currentAgent.price} AVAX</p>
                  </div>
                )}
              </div>
            </div>

            {/* API Mode Selection */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">API Mode</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="demo-mode"
                    checked={demoMode}
                    onChange={() => setDemoMode(true)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label htmlFor="demo-mode" className="text-gray-300">
                    Demo Mode (Free, limited functionality)
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="api-key-mode"
                    checked={!demoMode}
                    onChange={() => setDemoMode(false)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label htmlFor="api-key-mode" className="text-gray-300">
                    API Key Mode (Generate demo key)
                  </label>
                </div>

                {!demoMode && (
                  <div className="space-y-3">
                    <button
                      onClick={generateDemoKey}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Generate Demo API Key
                    </button>
                    {apiKey && (
                      <div className="bg-gray-700 rounded-lg p-3">
                        <p className="text-sm text-gray-400 mb-1">Generated API Key:</p>
                        <code className="text-xs text-green-400 break-all">{apiKey}</code>
                        <p className="text-xs text-gray-500 mt-1">Expires in 24 hours</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Sample Prompts */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Quick Start</h2>
              <button
                onClick={useSamplePrompt}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Use Sample Prompt for {currentAgent?.name}
              </button>
            </div>
          </div>

          {/* Right Panel - Testing Interface */}
          <div className="space-y-6">
            {/* Input */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Test Message</h2>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Enter your message for ${currentAgent?.name}...`}
                rows={6}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <button
                onClick={testAPI}
                disabled={loading}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                {loading ? 'Testing API...' : 'Test API'}
              </button>
            </div>

            {/* Response */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">API Response</h2>
              <div className="bg-gray-900 rounded-lg p-4 min-h-[200px]">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : response ? (
                  <pre className="text-gray-300 whitespace-pre-wrap text-sm">{response}</pre>
                ) : (
                  <p className="text-gray-500 italic">API response will appear here...</p>
                )}
              </div>
            </div>

            {/* API Information */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">API Details</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400">Endpoint:</p>
                  <code className="text-sm text-blue-400">{currentAgent?.endpoint}</code>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Method:</p>
                  <code className="text-sm text-green-400">POST</code>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Content-Type:</p>
                  <code className="text-sm text-yellow-400">application/json</code>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Request Body:</p>
                  <pre className="text-xs text-gray-300 bg-gray-900 p-2 rounded mt-1">
{demoMode ? 
`{
  "message": "Your prompt here"
}` :
`{
  "message": "Your prompt here",
  "apiKey": "your-api-key"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Examples */}
        <div className="mt-12 bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Integration Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-400">JavaScript (Fetch)</h3>
              <pre className="text-sm bg-gray-900 p-4 rounded overflow-x-auto">
{`const response = await fetch('${currentAgent?.endpoint}', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'Your prompt here'${!demoMode ? ',\n    apiKey: "your-api-key"' : ''}
  }),
});

const data = await response.json();
console.log(data.response);`}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-green-400">Python (Requests)</h3>
              <pre className="text-sm bg-gray-900 p-4 rounded overflow-x-auto">
{`import requests

response = requests.post('${currentAgent?.endpoint}', 
  json={
    'message': 'Your prompt here'${!demoMode ? ',\n    "apiKey": "your-api-key"' : ''}
  }
)

data = response.json()
print(data['response'])`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
