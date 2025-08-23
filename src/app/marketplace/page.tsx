'use client';

import { useState, useEffect } from 'react';
import { AgentMetadata } from '@/lib/types';
import AgentModal from '@/components/AgentModal';
import Image from 'next/image';

export default function MarketplacePage() {
  const [agents, setAgents] = useState<AgentMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState<AgentMetadata | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchMintedAgents();
  }, []);

  // Fetch agents minted as NFTs from Pinata/IPFS
  const fetchMintedAgents = async () => {
    try {
      const response = await fetch('/api/nft/agents');
      const data = await response.json();
      if (data.success) {
        // Hide systemPrompt attribute
        const agentsNoPrompt = data.agents.map((agent: any) => {
          const { systemPrompt, ...rest } = agent;
          return rest;
        });
        setAgents(agentsNoPrompt);
      }
    } catch (error) {
      console.error('Error fetching agents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInteract = (agent: AgentMetadata) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  const handlePurchase = async (agent: AgentMetadata) => {
    alert(`Purchasing ${agent.name} for ${agent.price} ETH. Integration with smart contract coming soon!`);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading AI agents...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-10 md:py-12">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-4xl font-bold">AI Agent Marketplace</h1>
          <p className="text-gray-400">Browse and purchase AI Agents as NFTs</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div key={agent.id} className="rounded-lg overflow-hidden bg-gray-800 hover:bg-gray-700 transition-colors duration-200">
              <div className="relative aspect-square bg-gradient-to-br from-blue-400/20 to-purple-500/20">
                <Image
                  src={agent.image}
                  alt={agent.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{agent.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{agent.description}</p>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  <div className="text-gray-400 text-sm">
                    {agent.creator.slice(0, 6)}...{agent.creator.slice(-4)}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-gray-400 text-sm">Price</div>
                    <div className="font-mono">{agent.price.toFixed(3)} ETH</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400 text-sm">Category</div>
                    <div className="text-sm">{agent.category}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleInteract(agent)}
                    className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-2 px-3 rounded text-sm font-medium transition-colors"
                  >
                    Try Demo
                  </button>
                  <button
                    onClick={() => handlePurchase(agent)}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 px-3 rounded text-sm font-medium transition-colors"
                  >
                    Buy NFT
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {agents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No agents available.</p>
          </div>
        )}
      </section>

      {/* Agent Modal */}
      <AgentModal
        agent={selectedAgent}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAgent(null);
        }}
      />
    </main>
  );
}
