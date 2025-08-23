"use client";

import React, { useState, useEffect } from 'react';
import { SMART_CONTRACTS, AVALANCHE_CONFIG } from '../config/contracts';
import { getEthereumProvider } from '../types/ethereum';

interface NFTItem {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  seller: string;
  agent_type: string;
}

// Mock data for demonstration
const mockNFTs: NFTItem[] = [
  {
    id: 1,
    name: "ChatGPT Assistant NFT",
    description: "Advanced conversational AI agent with natural language processing capabilities",
    image: "/api/placeholder/400/300",
    price: "5.0",
    seller: "0x742d35Cc6635C0532925a3b8D591D2127fB8F8F8",
    agent_type: "Text Generation"
  },
  {
    id: 2,
    name: "DALL-E Creative NFT",
    description: "AI-powered image generation agent for creating stunning visual content",
    image: "/api/placeholder/400/300",
    price: "8.5",
    seller: "0x8ba1f109551bD432803012645Hac136c98F2BC53",
    agent_type: "Image Generation"
  },
  {
    id: 3,
    name: "Code Copilot NFT",
    description: "Smart coding assistant for multiple programming languages",
    image: "/api/placeholder/400/300",
    price: "12.0",
    seller: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
    agent_type: "Code Generation"
  }
];

function formatAddress(address: string): string {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

interface SmartContractStatusProps {
  isConnected: boolean;
}

function SmartContractStatus({ isConnected }: SmartContractStatusProps) {
  const [networkStatus, setNetworkStatus] = useState<'checking' | 'correct' | 'wrong' | 'error'>('checking');
  
  useEffect(() => {
    const checkNetwork = async () => {
      if (!isConnected) {
        setNetworkStatus('error');
        return;
      }
      
      try {
        const provider = getEthereumProvider();
        if (!provider) {
          setNetworkStatus('error');
          return;
        }
        
        const chainId = await provider.request({ method: 'eth_chainId' }) as string;
        setNetworkStatus(chainId === AVALANCHE_CONFIG.CHAIN_HEX ? 'correct' : 'wrong');
      } catch (error) {
        console.error('Error checking network:', error);
        setNetworkStatus('error');
      }
    };
    
    checkNetwork();
  }, [isConnected]);
  
  const getStatusColor = () => {
    switch (networkStatus) {
      case 'correct': return 'text-green-600';
      case 'wrong': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };
  
  const getStatusText = () => {
    switch (networkStatus) {
      case 'correct': return 'Connected to Avalanche';
      case 'wrong': return 'Wrong network - Please switch to Avalanche';
      case 'error': return 'Not connected';
      default: return 'Checking network...';
    }
  };
  
  return (
    <div className="bg-gray-100 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold mb-3">Smart Contract Status</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Network Status:</span>
          <span className={getStatusColor()}>{getStatusText()}</span>
        </div>
        <div className="flex justify-between">
          <span>NFT Contract:</span>
          <span className="font-mono text-xs">{formatAddress(SMART_CONTRACTS.AI_AGENT_NFT)}</span>
        </div>
        <div className="flex justify-between">
          <span>Marketplace Contract:</span>
          <span className="font-mono text-xs">{formatAddress(SMART_CONTRACTS.AI_AGENT_MARKETPLACE)}</span>
        </div>
        <div className="flex justify-between">
          <span>Chain ID:</span>
          <span>{AVALANCHE_CONFIG.CHAIN_ID}</span>
        </div>
      </div>
    </div>
  );
}

interface NFTCardProps {
  nft: NFTItem;
  onPurchase: (nft: NFTItem) => void;
  isConnected: boolean;
}

function NFTCard({ nft, onPurchase, isConnected }: NFTCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const handlePurchase = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }
    
    setIsLoading(true);
    try {
      await onPurchase(nft);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">🤖</div>
          <div className="text-sm text-gray-600">{nft.agent_type}</div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{nft.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{nft.description}</p>
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-lg font-bold text-blue-600">{nft.price} AVAX</div>
            <div className="text-xs text-gray-500">Seller: {formatAddress(nft.seller)}</div>
          </div>
        </div>
        <button
          onClick={handlePurchase}
          disabled={isLoading || !isConnected}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Processing...' : !isConnected ? 'Connect Wallet' : 'Purchase NFT'}
        </button>
      </div>
    </div>
  );
}

interface BlockchainMarketplaceProps {
  isConnected: boolean;
}

export default function BlockchainMarketplace({ isConnected }: BlockchainMarketplaceProps) {
  const [nfts] = useState<NFTItem[]>(mockNFTs);
  
  const handlePurchase = async (nft: NFTItem) => {
    try {
      // In a real implementation, this would:
      // 1. Check if user has enough AVAX
      // 2. Call the marketplace contract's purchaseItem function
      // 3. Handle the transaction and wait for confirmation
      
      console.log('Purchasing NFT:', nft);
      
      // Mock transaction for demonstration
      const mockTxHash = '0x' + Math.random().toString(16).substr(2, 64);
      
      alert(`Purchase initiated!\n\nNFT: ${nft.name}\nPrice: ${nft.price} AVAX\nMock Transaction: ${mockTxHash}\n\n(This is a demo - no real transaction was made)`);
      
      // In real implementation:
      // const contractUtils = new ContractUtils();
      // const txHash = await contractUtils.purchaseNFT(nft.id, nft.price);
      // console.log('Transaction hash:', txHash);
      
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Purchase failed. Please try again.');
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">SYNAPTICA NFT Marketplace</h1>
        <p className="text-gray-600 mb-6">
          Trade AI Agent NFTs on the Avalanche blockchain. Each NFT represents ownership and access rights to advanced AI capabilities.
        </p>
        
        <SmartContractStatus isConnected={isConnected} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfts.map((nft) => (
          <NFTCard
            key={nft.id}
            nft={nft}
            onPurchase={handlePurchase}
            isConnected={isConnected}
          />
        ))}
      </div>
      
      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Smart Contract Integration</h2>
        <div className="text-sm text-gray-700 space-y-2">
          <p><strong>Status:</strong> Smart contracts are deployed and configured on Avalanche C-Chain</p>
          <p><strong>Features:</strong> NFT minting, marketplace trading, royalty distribution</p>
          <p><strong>Security:</strong> Audited contracts with standard ERC-721 and marketplace functionality</p>
          <p><strong>Gas Fees:</strong> Low-cost transactions on Avalanche network</p>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Contract Addresses:</h4>
            <div className="space-y-1 font-mono text-xs bg-white p-2 rounded">
              <div>NFT: {SMART_CONTRACTS.AI_AGENT_NFT}</div>
              <div>Marketplace: {SMART_CONTRACTS.AI_AGENT_MARKETPLACE}</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Network Details:</h4>
            <div className="space-y-1 text-xs bg-white p-2 rounded">
              <div>Network: {AVALANCHE_CONFIG.NETWORK_NAME}</div>
              <div>Chain ID: {AVALANCHE_CONFIG.CHAIN_ID}</div>
              <div>Currency: {AVALANCHE_CONFIG.CURRENCY_SYMBOL}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
