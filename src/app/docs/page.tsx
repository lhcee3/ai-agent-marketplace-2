'use client';

import Link from 'next/link';
import ConnectWallet from '@/components/ConnectWallet';

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-24">
      {/* Floating Navbar */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-7xl">
        <div className="relative mx-auto px-6 md:px-8 py-4 flex items-center justify-between rounded-3xl bg-black/10 backdrop-blur-2xl border border-white/20 shadow-2xl hover:shadow-blue-500/20 hover:bg-black/20 transition-all duration-500 group overflow-hidden">
          {/* Enhanced Glassmorphism Background Layers */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-blue-600/5 rounded-3xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 rounded-3xl" />
          <div className="absolute inset-0 backdrop-blur-3xl rounded-3xl" />
          
          {/* Animated Gradient Border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
          
          {/* Content */}
          <div className="relative z-10 flex items-center justify-between w-full">
            <Link href="/" className="flex items-center group/logo">
              <div className="h5-space-mono text-[22px] text-white group-hover/logo:text-blue-100 transition-colors duration-300">Synaptica</div>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8 h5-work-sans text-[16px]">
              <Link className="text-blue-200 hover:text-white hover:bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm transition-all duration-300" href="/marketplace">Marketplace</Link>
              <Link className="text-blue-200 hover:text-white hover:bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm transition-all duration-300" href="/create">Create</Link>
              <Link className="text-blue-400 hover:text-white hover:bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm transition-all duration-300 font-semibold" href="/docs">Docs</Link>
              <div className="relative">
                <ConnectWallet />
              </div>
            </nav>
            
            <button className="md:hidden inline-flex items-center justify-center size-12 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/30 hover:bg-white/20 hover:border-white/50 hover:scale-110 transition-all duration-300 shadow-lg">
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-1.5">
                <div className="w-5 h-0.5 bg-white rounded-full" />
                <div className="w-5 h-0.5 bg-white rounded-full" />
                <div className="w-5 h-0.5 bg-white rounded-full" />
              </div>
            </button>
          </div>
          
          {/* Bottom Glow Effect */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto px-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 py-8 pr-8 sticky top-24 h-screen overflow-y-auto">
          <nav className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Contents</h3>
            <ul className="space-y-1">
              <li><a href="#what-is-ai-agent" className="block py-2 px-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors">What is an AI Agent?</a></li>
              <li><a href="#avalanche-blockchain" className="block py-2 px-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors">Understanding Avalanche</a></li>
              <li><a href="#chainlink-integration" className="block py-2 px-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors">Chainlink Integration</a></li>
              <li><a href="#agent-trading" className="block py-2 px-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors">AI Agent Trading</a></li>
              <li><a href="#synaptica-marketplace" className="block py-2 px-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors">Synaptica Marketplace</a></li>
              <li><a href="#deploy-agent" className="block py-2 px-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors">How to Deploy an AI Agent</a></li>
              <li><a href="#publish-marketplace" className="block py-2 px-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors">Publishing to Marketplace</a></li>
              <li><a href="#buy-agent" className="block py-2 px-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors">How to Buy an Existing Agent</a></li>
              <li><a href="#use-agent" className="block py-2 px-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors">How to Use Your AI Agent</a></li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 py-8">
          <article className="prose prose-lg prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-8 text-white">Synaptica Documentation</h1>
            <p className="text-xl text-gray-300 mb-12">
              Complete guide to understanding and using AI agents on the Avalanche blockchain with Chainlink integration.
            </p>

            <section id="what-is-ai-agent" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-white">What is an AI Agent?</h2>
              <p className="text-gray-300 mb-6">
                An AI agent is an autonomous software entity that can perceive its environment, make decisions, and take actions to achieve specific goals. In the context of blockchain and DeFi, AI agents are intelligent programs that can:
              </p>
              <ul className="text-gray-300 mb-6 space-y-2">
                <li>• Execute trades automatically based on market conditions</li>
                <li>• Analyze vast amounts of market data in real-time</li>
                <li>• Implement complex trading strategies without human intervention</li>
                <li>• Adapt their behavior based on historical performance and market trends</li>
                <li>• Manage portfolios and risk automatically</li>
              </ul>
              <p className="text-gray-300">
                Unlike simple automated scripts, AI agents use machine learning algorithms to improve their performance over time, making them valuable assets for both individual traders and institutional investors.
              </p>
            </section>

            <section id="avalanche-blockchain" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-white">Understanding Avalanche</h2>
              <p className="text-gray-300 mb-6">
                Avalanche is a layer-1 blockchain platform designed for decentralized applications and custom blockchain networks. It offers several key advantages for AI agent deployment:
              </p>
              
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Key Features</h3>
              <ul className="text-gray-300 mb-6 space-y-2">
                <li>• <strong>High Throughput:</strong> 4,500+ transactions per second</li>
                <li>• <strong>Low Latency:</strong> Sub-second finality</li>
                <li>• <strong>Low Fees:</strong> Minimal transaction costs compared to Ethereum</li>
                <li>• <strong>Eco-Friendly:</strong> Energy-efficient consensus mechanism</li>
                <li>• <strong>EVM Compatible:</strong> Full Ethereum Virtual Machine compatibility</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Network Architecture</h3>
              <p className="text-gray-300 mb-4">Avalanche consists of three interconnected chains:</p>
              <ul className="text-gray-300 mb-6 space-y-2">
                <li>• <strong>X-Chain:</strong> Exchange of assets and creation of new assets</li>
                <li>• <strong>P-Chain:</strong> Platform coordination and validator management</li>
                <li>• <strong>C-Chain:</strong> Smart contracts and DApps (where our AI agents operate)</li>
              </ul>
            </section>

            <section id="chainlink-integration" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-white">Chainlink Integration</h2>
              <p className="text-gray-300 mb-6">
                Chainlink provides essential infrastructure for AI agents by connecting smart contracts to real-world data and external APIs. Our integration includes:
              </p>
              
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Price Feeds</h3>
              <p className="text-gray-300 mb-6">
                Real-time, accurate price data for cryptocurrencies, stocks, commodities, and forex pairs. AI agents use this data to make informed trading decisions across multiple markets.
              </p>

              <h3 className="text-2xl font-semibold mb-4 text-blue-400">External APIs</h3>
              <p className="text-gray-300 mb-6">
                Access to external data sources including social media sentiment, news feeds, economic indicators, and market analysis APIs that enhance AI agent decision-making capabilities.
              </p>

              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Automation</h3>
              <p className="text-gray-300 mb-6">
                Chainlink Automation (formerly Keepers) enables AI agents to execute trades and rebalance portfolios automatically based on predefined conditions or market triggers.
              </p>
            </section>

            <section id="agent-trading" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-white">AI Agent Trading</h2>
              
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Valuation Factors</h3>
              <p className="text-gray-300 mb-4">AI agents are valued based on several key metrics:</p>
              <ul className="text-gray-300 mb-6 space-y-2">
                <li>• <strong>Historical Performance:</strong> ROI, Sharpe ratio, maximum drawdown</li>
                <li>• <strong>Strategy Complexity:</strong> Sophistication of algorithms and models</li>
                <li>• <strong>Market Coverage:</strong> Number of supported markets and assets</li>
                <li>• <strong>Risk Management:</strong> Built-in risk controls and safeguards</li>
                <li>• <strong>Adaptability:</strong> Ability to adjust to changing market conditions</li>
                <li>• <strong>Creator Reputation:</strong> Track record of the developer/team</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Trading Strategies</h3>
              <p className="text-gray-300 mb-4">Popular AI agent strategies include:</p>
              <ul className="text-gray-300 mb-6 space-y-2">
                <li>• <strong>Arbitrage:</strong> Exploiting price differences across exchanges</li>
                <li>• <strong>Market Making:</strong> Providing liquidity and earning spreads</li>
                <li>• <strong>Trend Following:</strong> Identifying and riding market trends</li>
                <li>• <strong>Mean Reversion:</strong> Trading on price corrections to historical averages</li>
                <li>• <strong>Sentiment Analysis:</strong> Trading based on social media and news sentiment</li>
                <li>• <strong>Portfolio Optimization:</strong> Dynamic asset allocation and rebalancing</li>
              </ul>
            </section>

            <section id="synaptica-marketplace" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-white">Synaptica Marketplace</h2>
              <p className="text-gray-300 mb-6">
                The Synaptica marketplace is a decentralized platform where developers can mint, list, and trade AI agents as NFTs. Key features include:
              </p>
              
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Features</h3>
              <ul className="text-gray-300 mb-6 space-y-2">
                <li>• <strong>NFT Representation:</strong> Each AI agent is a unique NFT with metadata</li>
                <li>• <strong>Performance Tracking:</strong> Real-time monitoring of agent performance</li>
                <li>• <strong>Licensing System:</strong> Flexible usage rights and revenue sharing</li>
                <li>• <strong>Rating System:</strong> Community-driven agent reviews and ratings</li>
                <li>• <strong>Search & Discovery:</strong> Advanced filtering by strategy, performance, and risk</li>
                <li>• <strong>Integration Tools:</strong> APIs for easy agent deployment and management</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Categories</h3>
              <ul className="text-gray-300 mb-6 space-y-2">
                <li>• <strong>Trading Bots:</strong> Automated trading strategies</li>
                <li>• <strong>Analytics:</strong> Market analysis and prediction tools</li>
                <li>• <strong>Risk Management:</strong> Portfolio protection and optimization</li>
                <li>• <strong>Data Processing:</strong> Information aggregation and analysis</li>
                <li>• <strong>Arbitrage:</strong> Cross-market opportunity identification</li>
                <li>• <strong>Yield Farming:</strong> DeFi protocol optimization</li>
              </ul>
            </section>

            <section id="deploy-agent" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-white">How to Deploy an AI Agent</h2>
              
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Step 1: Prepare Your Agent</h3>
              <ol className="text-gray-300 mb-6 space-y-2">
                <li>1. Develop your AI agent using supported frameworks (Python, JavaScript, etc.)</li>
                <li>2. Test thoroughly on testnet environments</li>
                <li>3. Document strategy, risk parameters, and expected performance</li>
                <li>4. Prepare agent metadata including name, description, and tags</li>
              </ol>

              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Step 2: Upload to IPFS</h3>
              <ol className="text-gray-300 mb-6 space-y-2">
                <li>1. Package your agent code and configuration files</li>
                <li>2. Use our IPFS integration to upload agent files</li>
                <li>3. Generate content hash for immutable storage</li>
                <li>4. Verify upload integrity and accessibility</li>
              </ol>

              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Step 3: Smart Contract Deployment</h3>
              <ol className="text-gray-300 mb-6 space-y-2">
                <li>1. Connect your wallet to the Avalanche C-Chain</li>
                <li>2. Deploy agent smart contract with necessary permissions</li>
                <li>3. Configure Chainlink oracles for data feeds</li>
                <li>4. Set up automation triggers if required</li>
              </ol>
            </section>

            <section id="publish-marketplace" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-white">Publishing to Marketplace</h2>
              
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Step 1: Create Listing</h3>
              <ol className="text-gray-300 mb-6 space-y-2">
                <li>1. Navigate to the Create page on Synaptica</li>
                <li>2. Fill in agent details: name, description, category</li>
                <li>3. Upload agent image and additional media</li>
                <li>4. Set pricing: fixed price, auction, or licensing model</li>
              </ol>

              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Step 2: Mint NFT</h3>
              <ol className="text-gray-300 mb-6 space-y-2">
                <li>1. Review all information for accuracy</li>
                <li>2. Pay minting fees (AVAX)</li>
                <li>3. Confirm transaction in your wallet</li>
                <li>4. Wait for blockchain confirmation</li>
              </ol>

              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Step 3: List for Sale</h3>
              <ol className="text-gray-300 mb-6 space-y-2">
                <li>1. Set listing price or auction parameters</li>
                <li>2. Define usage rights and licensing terms</li>
                <li>3. Enable marketplace visibility</li>
                <li>4. Monitor performance and user feedback</li>
              </ol>
            </section>

            <section id="buy-agent" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-white">How to Buy an Existing Agent</h2>
              
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Step 1: Browse Marketplace</h3>
              <ol className="text-gray-300 mb-6 space-y-2">
                <li>1. Visit the Marketplace page</li>
                <li>2. Use filters to find agents matching your criteria</li>
                <li>3. Review agent performance metrics and ratings</li>
                <li>4. Read user reviews and creator information</li>
              </ol>

              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Step 2: Evaluate Performance</h3>
              <ol className="text-gray-300 mb-6 space-y-2">
                <li>1. Analyze historical returns and risk metrics</li>
                <li>2. Check strategy documentation and transparency</li>
                <li>3. Verify creator credentials and track record</li>
                <li>4. Consider licensing terms and usage rights</li>
              </ol>

              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Step 3: Purchase Agent</h3>
              <ol className="text-gray-300 mb-6 space-y-2">
                <li>1. Click &quot;Buy Now&quot; or place auction bid</li>
                <li>2. Confirm transaction details and fees</li>
                <li>3. Complete payment through connected wallet</li>
                <li>4. Receive agent NFT and access credentials</li>
              </ol>
            </section>

            <section id="use-agent" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-white">How to Use Your AI Agent</h2>
              
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Step 1: Setup</h3>
              <ol className="text-gray-300 mb-6 space-y-2">
                <li>1. Access your purchased agent through your profile</li>
                <li>2. Download agent files and documentation</li>
                <li>3. Set up required API keys and exchange connections</li>
                <li>4. Configure risk parameters and position sizing</li>
              </ol>

              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Step 2: Integration</h3>
              <ol className="text-gray-300 mb-6 space-y-2">
                <li>1. Deploy agent to your preferred environment</li>
                <li>2. Connect to Chainlink oracles for data feeds</li>
                <li>3. Set up monitoring and alerting systems</li>
                <li>4. Test with small position sizes initially</li>
              </ol>

              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Step 3: Monitoring</h3>
              <ol className="text-gray-300 mb-6 space-y-2">
                <li>1. Track performance through provided dashboards</li>
                <li>2. Monitor risk metrics and drawdown levels</li>
                <li>3. Adjust parameters based on market conditions</li>
                <li>4. Regular performance reviews and optimization</li>
              </ol>

              <p className="text-gray-300 mt-8">
                Remember to always understand the risks involved in automated trading and never invest more than you can afford to lose. AI agents are tools that require proper configuration and monitoring to be effective.
              </p>
            </section>
          </article>
        </div>
      </div>
    </main>
  );
}
