'use client';

import React from "react";
import Link from 'next/link';
import ConnectWallet from '@/components/ConnectWallet';

type Props = { params: Promise<{ slug: string }> };

export default function ArtistPage({ params }: Props) {
  const resolvedParams = React.use(params);
  // Use the slug as wallet address, or generate a mock wallet address format
  const walletAddress = resolvedParams.slug.startsWith('0x') 
    ? resolvedParams.slug 
    : `0x${resolvedParams.slug.padEnd(40, '0')}`;
  
  // Format wallet address for display (show first 6 and last 4 characters)
  const displayName = walletAddress.length > 10 
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : walletAddress;

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
              <Link className="text-blue-200 hover:text-white hover:bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm transition-all duration-300" href="/docs">Docs</Link>
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

      {/* Banner */}
      <section className="w-full h-[280px] md:h-[360px] bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 relative">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </section>

      {/* Profile */}
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 -mt-20 relative">
        <div className="flex flex-col md:flex-row md:items-end gap-6">
          <div className="size-32 md:size-40 rounded-[20px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border-4 border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />
            <div className="absolute inset-0 flex items-center justify-center text-white/60 text-2xl font-bold">
              {walletAddress?.charAt(2)?.toUpperCase() || "0"}
            </div>
          </div>
          <div className="flex-1 pb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{displayName}</h1>
            <div className="text-gray-400 text-sm mb-4 font-mono">{walletAddress}</div>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-xl">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                <div className="text-gray-400 text-sm font-medium">Volume</div>
                <div className="text-2xl font-bold text-white mt-1">9,999 AVAX</div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                <div className="text-gray-400 text-sm font-medium">Agents Deployed</div>
                <div className="text-2xl font-bold text-white mt-1">3.4K</div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                <div className="text-gray-400 text-sm font-medium">Followers</div>
                <div className="text-2xl font-bold text-white mt-1">42K</div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 pb-4">
            <button className="inline-flex items-center h-12 px-8 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
              Follow
            </button>
            <button className="inline-flex items-center h-12 px-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300">
              Share
            </button>
          </div>
        </div>
      </section>

      {/* Bio & Links */}
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <div className="text-2xl font-bold text-white mb-4">Bio</div>
            <p className="text-gray-300 text-lg leading-relaxed max-w-prose">
              This wallet builds and deploys autonomous AI agents on the Avalanche blockchain. Their portfolio spans multiple industries with production-grade agentic applications, trading bots, and custom marketplace solutions. Specializing in DeFi automation and cross-chain interoperability.
            </p>
          </div>
          <div>
            <div className="text-2xl font-bold text-white mb-4">Links</div>
            <div className="flex gap-4">
              <div className="size-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </div>
              <div className="size-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.219-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.11.221.81.402-.09.402-.293 1.855-.332 2.119-.051.343-.402.465-.402.465s-1.76-.465-2.851-3.237c-.997-2.532-.997-4.869.997-7.804C5.729 3.786 8.73 2.292 12.5 2.292c4.906 0 8.711 3.492 8.711 8.169 0 4.876-3.07 8.791-7.33 8.791-1.430 0-2.786-.744-3.247-1.633 0 0-.71 2.7-.883 3.363-.32 1.233-1.18 2.781-1.758 3.72C9.34 23.81 10.65 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </div>
              <div className="size-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
