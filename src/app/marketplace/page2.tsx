'use client';

import { useMemo, useState, useEffect } from 'react';
import { AgentMetadata } from '../../lib/types';
// Update the import path if AgentModal is in src/components/AgentModal.tsx
import AgentModal from '../../components/AgentModal';
import Image from 'next/image';

const CATEGORIES = [
  'Customer Support',
  'Development', 
  'Creative',
  'Sales & Outreach',
  'Research & Summarization',
  'Data Analysis',
  'Marketing & Social',
  'DevOps & Infra',
  'Finance & Ops',
] as const;

export default function MarketplacePage() {
  const [agents, setAgents] = useState<AgentMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState<AgentMetadata | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | 'all'>('all');
  const [sort, setSort] = useState<'popular' | 'new' | 'priceAsc' | 'priceDesc'>('popular');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await fetch('/api/agents');
      const data = await response.json();
      if (data.success) {
        setAgents(data.agents);
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
    // TODO: Integrate with smart contract
    alert(`Purchasing ${agent.name} for ${agent.price} ETH. Integration with smart contract coming soon!`);
  };

  const data = useMemo(() => {
    let d = [...agents];
    if (category !== 'all') d = d.filter((a) => a.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      d = d.filter((a) => 
        a.name.toLowerCase().includes(q) || 
        a.description.toLowerCase().includes(q) ||
        a.capabilities.some(cap => cap.toLowerCase().includes(q))
      );
    }
    switch (sort) {
      case 'priceAsc':
        d.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        d.sort((a, b) => b.price - a.price);
        break;
      case 'new':
        d.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      default:
        break;
    }
    return d;
  }, [agents, category, query, sort]);

  const total = data.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageData = data.slice((page - 1) * pageSize, page * pageSize);

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
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="h3-work-sans text-[38px]">AI Agent Marketplace</h1>
          <p className="body-work-sans text-[#858584]">Browse, try, and purchase AI Agents as NFTs. Interactive demos available!</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch lg:items-center justify-between mb-6">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search agents, descriptions, or capabilities"
              className="h-12 rounded-[20px] px-4 bg-[var(--background-secondary)] text-white placeholder:text-[#858584] outline-none border border-white/10"
            />
            <select
              value={sort}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSort(e.target.value as typeof sort)}
              className="h-12 rounded-[20px] px-4 bg-[var(--background-secondary)] text-white outline-none border border-white/10"
            >
              <option value="popular">Most Popular</option>
              <option value="new">Newest</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
          <div className="overflow-x-auto no-scrollbar lg:overflow-visible">
            <div className="flex gap-2 lg:flex-wrap">
              <button
                onClick={() => {
                  setCategory('all');
                  setPage(1);
                }}
                className={`px-3 h-10 rounded-[14px] whitespace-nowrap ${
                  category === 'all' ? 'bg-cta' : 'bg-[var(--background-secondary)]'
                }`}
              >
                All
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCategory(c);
                    setPage(1);
                  }}
                  className={`px-3 h-10 rounded-[14px] whitespace-nowrap ${
                    category === c ? 'bg-cta' : 'bg-[var(--background-secondary)]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results summary */}
        <div className="body-space-mono text-sm text-[#858584] mb-4">
          {total} results{category !== 'all' ? ` in ${category}` : ''}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageData.map((agent) => (
            <div key={agent.id} className="rounded-[20px] overflow-hidden bg-[var(--background-secondary)] hover:bg-[var(--background-secondary)]/80 transition-colors duration-200">
              <div className="relative aspect-square bg-gradient-to-br from-blue-400/20 to-purple-500/20">
                <Image
                  src={agent.image}
                  alt={agent.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="h5-work-sans text-[22px] mb-2">{agent.name}</div>
                <p className="body-work-sans text-[#858584] text-sm mb-4 line-clamp-2">{agent.description}</p>
                
                {/* Capabilities */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {agent.capabilities.slice(0, 2).map((capability, index) => (
                      <span
                        key={index}
                        className="bg-blue-100/10 text-blue-300 text-xs px-2 py-1 rounded-full"
                      >
                        {capability}
                      </span>
                    ))}
                    {agent.capabilities.length > 2 && (
                      <span className="text-[#858584] text-xs px-2 py-1">
                        +{agent.capabilities.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="size-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                  <div className="body-work-sans text-[#858584]">
                    {agent.creator.slice(0, 6)}...{agent.creator.slice(-4)}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <div className="body-space-mono text-[#858584]">Price</div>
                    <div className="body-space-mono">{agent.price.toFixed(3)} ETH</div>
                  </div>
                  <div className="text-right">
                    <div className="body-space-mono text-[#858584]">Category</div>
                    <div className="body-space-mono">{agent.category}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleInteract(agent)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-center py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Try Demo
                  </button>
                  <button
                    onClick={() => handlePurchase(agent)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Buy NFT
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {total === 0 && (
          <div className="text-center py-12">
            <p className="text-[#858584] text-lg">No agents found matching your criteria.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8">
            <button
              className="h-10 px-4 rounded-[14px] bg-[var(--background-secondary)] disabled:opacity-50"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
            <div className="body-space-mono text-sm text-[#858584]">
              Page {page} of {totalPages}
            </div>
            <button
              className="h-10 px-4 rounded-[14px] bg-[var(--background-secondary)] disabled:opacity-50"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
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
