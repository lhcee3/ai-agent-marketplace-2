'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AvalanchePage() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [chainId, setChainId] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [blockNumber, setBlockNumber] = useState<string | null>(null);

  useEffect(() => {
    checkWalletConnection();
    getNetworkInfo();
  }, []);

  const checkWalletConnection = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' }) as string[];
        setWalletConnected(accounts.length > 0);
        
        if (accounts.length > 0) {
          const balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [accounts[0], 'latest']
          });
          // Convert from wei to AVAX
          const balanceInAvax = (parseInt(balance as string, 16) / 1e18).toFixed(4);
          setBalance(balanceInAvax);
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    }
  };

  const getNetworkInfo = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setChainId(chainId as string);
        
        const blockNumber = await window.ethereum.request({ method: 'eth_blockNumber' });
        setBlockNumber(parseInt(blockNumber as string, 16).toString());
      } catch (error) {
        console.error('Error getting network info:', error);
      }
    }
  };

  const avalancheTools = [
    {
      name: 'Snowtrace',
      description: 'Avalanche blockchain explorer for viewing transactions, contracts, and network statistics',
      url: 'https://snowtrace.io/',
      icon: '🔍',
      category: 'Explorer'
    },
    {
      name: 'Core Wallet',
      description: 'Official Avalanche wallet with built-in dApp browser and staking features',
      url: 'https://core.app/',
      icon: '💼',
      category: 'Wallet'
    },
    {
      name: 'Avalanche Bridge',
      description: 'Transfer assets between Avalanche C-Chain and other networks',
      url: 'https://bridge.avax.network/',
      icon: '🌉',
      category: 'Bridge'
    },
    {
      name: 'Trader Joe',
      description: 'Leading DEX on Avalanche for trading and liquidity provision',
      url: 'https://traderjoexyz.com/',
      icon: '🔄',
      category: 'DeFi'
    },
    {
      name: 'AAVE (Avalanche)',
      description: 'Lending and borrowing protocol deployed on Avalanche',
      url: 'https://app.aave.com/?marketName=proto_avalanche_v3',
      icon: '🏦',
      category: 'DeFi'
    },
    {
      name: 'Platypus Finance',
      description: 'Single-sided AMM for stablecoins on Avalanche',
      url: 'https://platypus.finance/',
      icon: '🐧',
      category: 'DeFi'
    },
    {
      name: 'Avalanche Subnet Explorer',
      description: 'Explore custom blockchain networks built on Avalanche',
      url: 'https://subnets.avax.network/',
      icon: '🌐',
      category: 'Infrastructure'
    },
    {
      name: 'Ava Labs GitHub',
      description: 'Official repositories and tools for Avalanche development',
      url: 'https://github.com/ava-labs',
      icon: '👨‍💻',
      category: 'Development'
    }
  ];

  const networkStats = [
    { label: 'Network', value: 'Avalanche C-Chain', icon: '⛓️' },
    { label: 'Chain ID', value: chainId === '0xa86a' ? '43114 (Mainnet)' : chainId || 'Not connected', icon: '🆔' },
    { label: 'Block Number', value: blockNumber || 'Loading...', icon: '📦' },
    { label: 'Your Balance', value: balance ? `${balance} AVAX` : 'Not connected', icon: '💰' },
    { label: 'Transaction Speed', value: '< 2 seconds', icon: '⚡' },
    { label: 'Transaction Cost', value: '< $0.01', icon: '💸' }
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Built on <span className="text-red-500">Avalanche</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our marketplace leverages Avalanche&apos;s lightning-fast, low-cost blockchain for seamless NFT trading and AI agent ownership.
          </p>
        </div>

        {/* Network Status */}
        <div className="mb-12 bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">Network Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {networkStats.map((stat, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
                <div className="font-semibold text-lg">{stat.value}</div>
              </div>
            ))}
          </div>
          {!walletConnected && (
            <div className="mt-6 text-center">
              <p className="text-yellow-400 mb-3">Connect your wallet to see personalized network information</p>
              <Link 
                href="/marketplace" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Connect Wallet
              </Link>
            </div>
          )}
        </div>

        {/* Why Avalanche */}
        <div className="mb-12 bg-gray-800 rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-6 text-center">Why Avalanche?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-400">Sub-second finality for instant transactions</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💸</div>
              <h3 className="text-xl font-semibold mb-2">Ultra Low Fees</h3>
              <p className="text-gray-400">Transactions cost less than $0.01 on average</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
              <p className="text-gray-400">Proof-of-Stake consensus uses 99.9% less energy</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold mb-2">EVM Compatible</h3>
              <p className="text-gray-400">Full compatibility with Ethereum tools and apps</p>
            </div>
          </div>
        </div>

        {/* Smart Contracts */}
        <div className="mb-12 bg-gray-800 rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-6 text-center">Smart Contracts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">AIAgentNFT.sol</h3>
              <p className="text-gray-300 mb-4">
                ERC-721 compliant NFT contract that represents ownership of AI agents. Each NFT contains metadata 
                linking to the agent&apos;s capabilities and API access.
              </p>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-400">Standard:</span> ERC-721</div>
                <div><span className="text-gray-400">Features:</span> Metadata, Enumerable, Burnable</div>
                <div><span className="text-gray-400">Gas Optimized:</span> Yes</div>
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-green-400">AIAgentMarketplace.sol</h3>
              <p className="text-gray-300 mb-4">
                Marketplace contract handling the buying, selling, and trading of AI agent NFTs with 
                built-in royalty distribution and escrow functionality.
              </p>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-400">Features:</span> Escrow, Royalties, Trading</div>
                <div><span className="text-gray-400">Currency:</span> AVAX</div>
                <div><span className="text-gray-400">Fees:</span> 2.5% platform fee</div>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a 
              href="https://github.com/lhcee3/ai-agent-marketplace-2/tree/main/contracts" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              View Contracts on GitHub
            </a>
          </div>
        </div>

        {/* Avalanche Ecosystem Tools */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-8 text-center">Avalanche Ecosystem Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {avalancheTools.map((tool, index) => (
              <a
                key={index}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 transition-colors group"
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{tool.icon}</div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    {tool.name}
                  </h3>
                  <div className="inline-block px-2 py-1 bg-blue-600 text-blue-100 rounded text-xs mb-3">
                    {tool.category}
                  </div>
                  <p className="text-gray-400 text-sm">{tool.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Integration Benefits */}
        <div className="mb-12 bg-gradient-to-r from-red-900/20 to-blue-900/20 border border-red-500/30 rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-6 text-center">Marketplace Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-red-400">For Buyers</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Instant NFT transfers with sub-second confirmation
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Minimal transaction costs (typically &lt; $0.01)
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Immediate API access after purchase
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Full ownership rights stored on-chain
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-400">For Creators</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Automatic royalty payments on resales
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Global marketplace reach
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  No expensive deployment costs
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Permanent, verifiable ownership records
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Get Started */}
        <div className="text-center bg-gray-800 rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-4">Ready to Start?</h2>
          <p className="text-gray-400 text-lg mb-6">
            Experience the future of AI agent trading on Avalanche&apos;s lightning-fast blockchain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/marketplace" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Browse Marketplace
            </Link>
            <Link 
              href="/playground" 
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Try Playground
            </Link>
            <Link 
              href="/docs" 
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Read Documentation
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
