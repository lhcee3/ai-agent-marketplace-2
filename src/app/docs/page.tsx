'use client';

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Documentation</h1>
          <p className="text-gray-400 text-lg sm:text-xl">Learn how to buy, use, and manage AI agents in our marketplace</p>
        </div>

        {/* Table of Contents */}
        <div className="mb-8 sm:mb-12 p-4 sm:p-6 bg-gray-800 rounded-lg">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Table of Contents</h2>
          <nav className="space-y-2">
            <a href="#getting-started" className="block text-blue-400 hover:text-blue-300 transition-colors">1. Getting Started</a>
            <a href="#how-to-buy" className="block text-blue-400 hover:text-blue-300 transition-colors">2. How to Buy an AI Agent</a>
            <a href="#using-agents" className="block text-blue-400 hover:text-blue-300 transition-colors">3. Using Your AI Agents</a>
            <a href="#managing-nfts" className="block text-blue-400 hover:text-blue-300 transition-colors">4. Managing Your NFTs</a>
            <a href="#troubleshooting" className="block text-blue-400 hover:text-blue-300 transition-colors">5. Troubleshooting</a>
            <a href="#faq" className="block text-blue-400 hover:text-blue-300 transition-colors">6. FAQ</a>
          </nav>
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-400 mb-2">Quick Links:</p>
            <div className="flex flex-wrap gap-2">
              <a href="/playground" className="inline-block bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-1 px-3 rounded transition-colors">
                🚀 API Playground
              </a>
              <a href="/avalanche" className="inline-block bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-1 px-3 rounded transition-colors">
                ⛓️ Avalanche Info
              </a>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <section id="getting-started" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">1. Getting Started</h2>
          
          <div className="prose prose-invert max-w-none">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">What is AI Agent Marketplace?</h3>
            <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed">
              AI Agent Marketplace is a platform where you can discover, test, and purchase AI agents as NFTs. 
              Each agent has unique capabilities and can be used for various tasks like customer support, 
              development assistance, creative writing, and more.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Setting Up Core Wallet</h3>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
              <h4 className="font-semibold text-lg mb-2 text-blue-400">🚀 Recommended: Core Wallet</h4>
              <p className="text-gray-300 mb-3">
                Core Wallet is the official wallet for Avalanche, offering the best experience for our marketplace.
              </p>
              <ol className="text-gray-300 space-y-2 list-decimal list-inside">
                <li>Visit <a href="https://core.app/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">https://core.app/</a></li>
                <li>Download and install the browser extension</li>
                <li>Create a new wallet or import existing one</li>
                <li>Make sure you&apos;re connected to Avalanche C-Chain</li>
                <li>Fund your wallet with AVAX for transactions</li>
              </ol>
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">What You Need</h3>
            <ul className="text-gray-300 space-y-2 mb-4 sm:mb-6">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>A crypto wallet (Core Wallet recommended for Avalanche)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>AVAX for purchasing agents and gas fees</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Basic understanding of NFTs and Avalanche blockchain</span>
              </li>
            </ul>
          </div>
        </section>

        {/* How to Buy */}
        <section id="how-to-buy" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">2. How to Buy an AI Agent</h2>
          
          <div className="prose prose-invert max-w-none">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Step-by-Step Guide</h3>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
                <h4 className="font-semibold text-lg mb-2 text-blue-400">Step 1: Connect Your Wallet</h4>
                <p className="text-gray-300 leading-relaxed">
                  Click the &quot;Connect Wallet&quot; button in the top navigation bar. Select Core Wallet 
                  (recommended for Avalanche) or other compatible wallets and follow the prompts to connect. 
                  Make sure you&apos;re connected to the Avalanche C-Chain network.
                </p>
              </div>

              <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
                <h4 className="font-semibold text-lg mb-2 text-blue-400">Step 2: Browse the Marketplace</h4>
                <p className="text-gray-300 leading-relaxed">
                  Visit the Marketplace page to see all available AI agents. Each agent card shows:
                </p>
                <ul className="text-gray-300 mt-2 space-y-1">
                  <li>• Agent name and description</li>
                  <li>• Price in AVAX</li>
                  <li>• Creator information</li>
                  <li>• Category (Development, Creative, etc.)</li>
                </ul>
              </div>

              <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
                <h4 className="font-semibold text-lg mb-2 text-blue-400">Step 3: Try Before You Buy</h4>
                <p className="text-gray-300 leading-relaxed">
                  Click &quot;Try Demo&quot; on any agent card to test its capabilities. This opens an interactive 
                  chat interface where you can:
                </p>
                <ul className="text-gray-300 mt-2 space-y-1">
                  <li>• Send messages to the agent</li>
                  <li>• Test different use cases</li>
                  <li>• Evaluate if it meets your needs</li>
                </ul>
              </div>

              <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
                <h4 className="font-semibold text-lg mb-2 text-blue-400">Step 4: Purchase the Agent</h4>
                <p className="text-gray-300 leading-relaxed">
                  When you find an agent you want to buy:
                </p>
                <ol className="text-gray-300 mt-2 space-y-1 list-decimal list-inside">
                  <li>Click the &quot;Buy NFT&quot; button</li>
                  <li>Review the transaction details in your wallet</li>
                  <li>Confirm the transaction and pay gas fees</li>
                  <li>Wait for blockchain confirmation</li>
                  <li>The NFT will appear in your wallet</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Using Agents */}
        <section id="using-agents" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">3. Using Your AI Agents</h2>
          
          <div className="prose prose-invert max-w-none">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Accessing Your Agents</h3>
            <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed">
              Once you own an AI agent NFT, you can access its full capabilities through our platform. 
              Your agents will be linked to your wallet address and available whenever you connect.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Agent Management</h3>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
              <ul className="text-gray-300 space-y-3">
                <li>• <strong>Instant Access:</strong> Connect your wallet to immediately access all owned agents</li>
                <li>• <strong>Unlimited Usage:</strong> No usage limits or subscription fees once you own an agent</li>
                <li>• <strong>Persistent Sessions:</strong> Your conversation history is maintained across sessions</li>
                <li>• <strong>API Integration:</strong> Use agents programmatically via our REST API</li>
              </ul>
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">API Integration for Developers</h3>
            
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
              <h4 className="font-semibold text-lg mb-3 text-blue-400">🔑 How the API System Works</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-gray-200 mb-2">Demo Flow:</h5>
                  <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
                    <li>Click &quot;Try Demo&quot; on any agent card</li>
                    <li>Generate a 24-hour temporary API key</li>
                    <li>Test the agent in our web interface</li>
                    <li>Evaluate if it meets your needs</li>
                  </ol>
                </div>

                <div>
                  <h5 className="font-medium text-gray-200 mb-2">After Purchase:</h5>
                  <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
                    <li>Buy the agent NFT</li>
                    <li>Generate permanent API key linked to your wallet</li>
                    <li>Integrate into your own applications</li>
                    <li>Unlimited usage with no subscription fees</li>
                  </ol>
                </div>
              </div>
            </div>

            <h4 className="text-lg font-semibold mb-3 text-green-400">Integration Examples</h4>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium text-gray-200 mb-2">JavaScript/Web Applications</h5>
                <pre className="bg-gray-900 p-3 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">{`const chatWithAgent = async (userMessage) => {
  const response = await fetch('/api/agents/chatbot-pro/interact', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${YOUR_API_KEY}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: userMessage,
      conversation_id: 'optional-session-id'
    })
  });
  
  const data = await response.json();
  return data.response; // Agent's reply
};`}</code>
                </pre>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium text-gray-200 mb-2">Python Backend Integration</h5>
                <pre className="bg-gray-900 p-3 rounded text-sm overflow-x-auto">
                  <code className="text-blue-400">{`import requests

def get_agent_response(message, agent_id):
    response = requests.post(
        f'https://marketplace.com/api/agents/{agent_id}/interact',
        headers={'Authorization': f'Bearer {API_KEY}'},
        json={'message': message}
    )
    return response.json()['response']

# Usage
reply = get_agent_response("Analyze this data", "data-analyst")`}</code>
                </pre>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium text-gray-200 mb-2">React Component Example</h5>
                <pre className="bg-gray-900 p-3 rounded text-sm overflow-x-auto">
                  <code className="text-purple-400">{`const AgentChat = () => {
  const [messages, setMessages] = useState([]);
  
  const sendToAgent = async (text) => {
    const response = await fetch('/api/agents/code-assistant/interact', {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${process.env.AGENT_API_KEY}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: text })
    });
    
    const result = await response.json();
    setMessages(prev => [...prev, { text: result.response, from: 'agent' }]);
  };
  
  return <ChatInterface onSend={sendToAgent} messages={messages} />;
};`}</code>
                </pre>
              </div>
            </div>

            <h4 className="text-lg font-semibold mb-3 text-yellow-400">API Endpoints</h4>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
              <div className="space-y-3">
                <div>
                  <code className="text-green-400 text-sm">POST /api/agents/&#123;agent-id&#125;/interact</code>
                  <p className="text-gray-300 text-sm mt-1">Send messages to your owned agents</p>
                </div>
                <div>
                  <code className="text-blue-400 text-sm">POST /api/agents/&#123;agent-id&#125;</code>
                  <p className="text-gray-300 text-sm mt-1">Generate API key for agent access</p>
                </div>
                <div>
                  <code className="text-purple-400 text-sm">GET /api/agents</code>
                  <p className="text-gray-300 text-sm mt-1">List all available agents</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Best Practices</h3>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 sm:p-6">
              <ul className="text-gray-300 space-y-2">
                <li>• <strong>Secure API Keys:</strong> Store API keys as environment variables, never in client-side code</li>
                <li>• <strong>Error Handling:</strong> Implement proper error handling for API failures and rate limits</li>
                <li>• <strong>Session Management:</strong> Use conversation IDs to maintain context across interactions</li>
                <li>• <strong>Optimize Prompts:</strong> Provide clear, specific instructions for better agent responses</li>
                <li>• <strong>Test Thoroughly:</strong> Use the demo feature extensively before purchasing</li>
                <li>• <strong>Monitor Usage:</strong> Track API calls and response quality for optimization</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Managing NFTs */}
        <section id="managing-nfts" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">4. Managing Your NFTs</h2>
          
          <div className="prose prose-invert max-w-none">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Viewing Your Collection</h3>
            <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed">
              Your AI agent NFTs can be viewed in:
            </p>
            <ul className="text-gray-300 space-y-2 mb-4 sm:mb-6">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Your connected wallet (Core Wallet, MetaMask, etc.)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>NFT marketplaces that support Avalanche</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Our platform when wallet is connected</span>
              </li>
            </ul>

            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Transferring and Selling</h3>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
              <p className="text-gray-300 mb-4 leading-relaxed">
                As NFT owner, you can:
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• Transfer agents to other wallets</li>
                <li>• List them for sale on secondary markets</li>
                <li>• Use them in other compatible platforms</li>
                <li>• Hold them as collectibles</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section id="troubleshooting" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">5. Troubleshooting</h2>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-2 text-red-400">Wallet Connection Issues</h4>
              <ul className="text-gray-300 space-y-2">
                <li>• Refresh the page and try connecting again</li>
                <li>• Make sure your wallet extension is unlocked</li>
                <li>• Check if you&apos;re on the correct network</li>
                <li>• Clear browser cache and cookies</li>
              </ul>
            </div>

            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-2 text-yellow-400">Transaction Failures</h4>
              <ul className="text-gray-300 space-y-2">
                <li>• Ensure you have enough AVAX for gas fees</li>
                <li>• Try increasing gas price for faster confirmation</li>
                <li>• Check if the agent is still available</li>
                <li>• Wait for network congestion to decrease</li>
              </ul>
            </div>

            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-2 text-blue-400">Agent Not Responding</h4>
              <ul className="text-gray-300 space-y-2">
                <li>• Check your internet connection</li>
                <li>• Try refreshing the chat interface</li>
                <li>• Verify your wallet is still connected</li>
                <li>• Contact support if issues persist</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">6. Frequently Asked Questions</h2>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-2 text-blue-400">What blockchains do you support?</h4>
              <p className="text-gray-300">
                Currently, we support Avalanche C-Chain. We chose Avalanche for its fast transaction speeds, 
                low fees, and excellent developer ecosystem. Core Wallet is the recommended wallet for the best experience.
              </p>
            </div>

            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-2 text-blue-400">Are there ongoing costs after purchase?</h4>
              <p className="text-gray-300">
                No, once you purchase an AI agent NFT, you own it permanently. There are no 
                subscription fees or ongoing costs to use your agents.
              </p>
            </div>

            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-2 text-blue-400">Can I use my agents on other platforms?</h4>
              <p className="text-gray-300">
                Yes! As NFT standards evolve, your agents may become compatible with other 
                platforms and applications that support AI agent NFTs.
              </p>
            </div>

            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-2 text-blue-400">How do I get support?</h4>
              <p className="text-gray-300">
                You can reach our support team through our Discord community, GitHub issues, 
                or by emailing support@aiagentmarketplace.com.
              </p>
            </div>

            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
              <h4 className="font-semibold text-lg mb-2 text-blue-400">What happens if the platform goes down?</h4>
              <p className="text-gray-300">
                Your NFTs are stored on the blockchain and remain yours forever. The agent 
                metadata is stored on IPFS for decentralized access, ensuring long-term availability.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-gray-700 pt-6 sm:pt-8 text-center">
          <p className="text-gray-400">
            Need more help? Join our{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300">Discord community</a>
            {' '}or check out our{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300">GitHub repository</a>
          </p>
        </div>
      </div>
    </main>
  );
}
