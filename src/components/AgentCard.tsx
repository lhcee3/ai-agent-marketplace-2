'use client';

import { AgentMetadata } from '@/lib/types';
import { useState } from 'react';
import Image from 'next/image';

interface AgentCardProps {
  agent: AgentMetadata;
  onInteract?: (agent: AgentMetadata) => void;
  onPurchase?: (agent: AgentMetadata) => void;
}

export default function AgentCard({ agent, onInteract, onPurchase }: AgentCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleInteract = () => {
    if (onInteract) {
      onInteract(agent);
    }
  };

  const handlePurchase = async () => {
    if (onPurchase) {
      setIsLoading(true);
      try {
        await onPurchase(agent);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Agent Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500">
        <Image
          src={agent.image}
          alt={agent.name}
          fill
          className="object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(agent.name);
          }}
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          {agent.category}
        </div>
      </div>

      {/* Agent Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {agent.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {agent.description}
        </p>

        {/* Capabilities */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {agent.capabilities.slice(0, 3).map((capability, index) => (
              <span
                key={index}
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full"
              >
                {capability}
              </span>
            ))}
            {agent.capabilities.length > 3 && (
              <span className="text-gray-500 text-xs px-2 py-1">
                +{agent.capabilities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {agent.price} ETH
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleInteract}
              className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Try It
            </button>
            
            <button
              onClick={handlePurchase}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Purchasing...' : 'Buy NFT'}
            </button>
          </div>
        </div>

        {/* Creator Info */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Created by {agent.creator.slice(0, 6)}...{agent.creator.slice(-4)}
          </p>
        </div>
      </div>
    </div>
  );
}
