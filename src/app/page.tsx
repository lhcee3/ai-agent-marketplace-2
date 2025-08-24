
'use client'

import Link from "next/link";
import ConnectWallet from "../components/ConnectWallet";

import { useEffect, useState } from "react";

export default function Home() {
  // Static particles to avoid hydration mismatch
  const floatingParticles = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: (i * 37) % 100, // Deterministic positioning
    top: (i * 23) % 100,
    delay: (i * 0.1) % 3,
    duration: 2 + (i % 3)
  }));

  // Fix hydration error for neural nodes
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground font-sans pt-24">
      {/* Floating Navbar - Home Page Only */}
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
              <Link className="text-blue-200 hover:text-white hover:bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm transition-all duration-300" href="/presets">Presets</Link>
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

      {/* Futuristic Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Extended Animated Background - covers full viewport and beyond */}
        <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-black via-blue-950 to-black" style={{ top: '-100px', left: '-100px', width: 'calc(100vw + 200px)', height: 'calc(100vh + 200px)' }}>
          {/* Floating Particles */}
          <div className="absolute inset-0">
            {floatingParticles.map((particle) => (
              <div
                key={particle.id}
                className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-60"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`
                }}
              />
            ))}
          </div>
          
          {/* Geometric Grid */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" 
                 style={{
                   backgroundImage: `
                     linear-gradient(rgba(38, 167, 245, 0.1) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(38, 167, 245, 0.1) 1px, transparent 1px)
                   `,
                   backgroundSize: '50px 50px'
                 }}
            />
          </div>
        </div>

        <div className="relative z-10 px-6 md:px-10 lg:px-16 xl:px-24 w-full">
          <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-12 items-center max-w-7xl mx-auto">
            
            {/* Left: Content */}
            <div className="space-y-8 text-center xl:text-left">
              {/* Main Title with Glitch Effect */}
              <div className="space-y-4">
                <h1 className="relative">
                  <span className="block text-[clamp(3rem,8vw,7rem)] font-black leading-[0.9] tracking-tight bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
                    DEPLOY
                  </span>
                  <span className="block text-[clamp(3rem,8vw,7rem)] font-black leading-[0.9] tracking-tight bg-gradient-to-r from-blue-400 via-blue-200 to-white bg-clip-text text-transparent">
                    AI AGENTS
                  </span>
                  <span className="block text-[clamp(2rem,6vw,4rem)] font-light leading-[0.9] tracking-widest text-blue-300/80 mt-2">
                    OF THE FUTURE
                  </span>
                  
                  {/* Glitch Lines */}
                  <div className="absolute -top-2 -left-2 w-full h-full opacity-20">
                    <div className="absolute top-6 left-0 w-32 h-0.5 bg-blue-500 animate-pulse" />
                    <div className="absolute bottom-12 right-8 w-24 h-0.5 bg-blue-400 animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>
                </h1>
              </div>

              {/* Description */}
              <p className="text-[clamp(1.1rem,2.5vw,1.5rem)] text-blue-100/80 leading-relaxed max-w-2xl mx-auto xl:mx-0 font-light">
                Experience the next evolution of artificial intelligence. Deploy, monetize, and scale autonomous AI agents on the world&apos;s most advanced blockchain infrastructure.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start pt-4">
                <Link href="/create" className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-2">
                    LAUNCH CONSOLE
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                
                <Link href="/docs" className="group px-8 py-4 border-2 border-blue-400/50 rounded-full font-semibold text-blue-200 hover:bg-blue-900/30 hover:border-blue-300 transition-all duration-300 backdrop-blur-sm">
                  <span className="flex items-center gap-2">
                    EXPLORE DOCS
                    <svg className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </Link>
              </div>

              {/* Live Stats Bar */}
              <div className="flex flex-wrap justify-center xl:justify-start gap-8 pt-8">
                {[
                  { label: "Active Agents", value: "50K+" },
                  { label: "Transactions", value: "2.4M" },
                  { label: "Developers", value: "15K+" }
                ].map((stat, i) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1 animate-pulse" style={{ animationDelay: `${i * 0.5}s` }}>
                      {stat.value}
                    </div>
                    <div className="text-blue-300/70 text-sm tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Futuristic AI Marketplace Visualization */}
            <div className="relative flex items-center justify-center">
              {/* Dynamic Marketplace Visualization */}
              <div className="relative w-full max-w-lg aspect-square">
                {/* Outer Orbital Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-slate-600/30 animate-spin" style={{ animationDuration: '60s' }}>
                  {/* Market Data Points */}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={`market-${i}`}
                      className="absolute w-4 h-4 -ml-2 -mt-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 shadow-lg animate-pulse"
                      style={{
                        top: `${50 + 45 * Math.sin((i * 60 - 90) * Math.PI / 180)}%`,
                        left: `${50 + 45 * Math.cos((i * 60 - 90) * Math.PI / 180)}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: '2s'
                      }}
                    >
                      <div className="absolute inset-0 rounded-full bg-teal-400 animate-ping opacity-50" />
                    </div>
                  ))}
                </div>
                
                <div className="absolute inset-4 rounded-full border border-slate-700/20 animate-spin" style={{ animationDuration: '45s', animationDirection: 'reverse' }}>
                  {/* Agent Network Nodes */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={`agent-${i}`}
                      className="absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md animate-pulse"
                      style={{
                        top: `${50 + 40 * Math.sin((i * 45 - 90) * Math.PI / 180)}%`,
                        left: `${50 + 40 * Math.cos((i * 45 - 90) * Math.PI / 180)}%`,
                        animationDelay: `${i * 0.3}s`,
                        animationDuration: '1.8s'
                      }}
                    />
                  ))}
                </div>
                
                <div className="absolute inset-8 rounded-full border border-slate-800/15 animate-spin" style={{ animationDuration: '40s' }}>
                  {/* Transaction Flow */}
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={`flow-${i}`}
                      className="absolute w-2 h-2 -ml-1 -mt-1 rounded-full bg-gradient-to-r from-sky-500 to-blue-700 shadow-sm animate-pulse"
                      style={{
                        top: `${50 + 35 * Math.sin((i * 90 - 90) * Math.PI / 180)}%`,
                        left: `${50 + 35 * Math.cos((i * 90 - 90) * Math.PI / 180)}%`,
                        animationDelay: `${i * 0.7}s`,
                        animationDuration: '1.5s'
                      }}
                    />
                  ))}
                </div>
                
                {/* Central AI Core */}
                <div className="absolute inset-16 rounded-full backdrop-blur-md border-2 border-blue-400/60 shadow-2xl overflow-hidden" style={{ backgroundColor: '#142252' }}>
                  {/* Neural Network Pattern */}
                  <div className="absolute inset-0">
                    <svg className="w-full h-full opacity-40" viewBox="0 0 200 200">
                      {/* Central Hub */}
                      <circle cx="100" cy="100" r="8" fill="rgb(30, 58, 138)" className="animate-pulse" />
                      
                      {/* Neural Connections */}
                      {[
                        { x1: 100, y1: 100, x2: 60, y2: 60, delay: '0s' },
                        { x1: 100, y1: 100, x2: 140, y2: 60, delay: '0.5s' },
                        { x1: 100, y1: 100, x2: 140, y2: 140, delay: '1s' },
                        { x1: 100, y1: 100, x2: 60, y2: 140, delay: '1.5s' },
                        { x1: 100, y1: 100, x2: 100, y2: 50, delay: '2s' },
                        { x1: 100, y1: 100, x2: 150, y2: 100, delay: '2.5s' },
                        { x1: 100, y1: 100, x2: 100, y2: 150, delay: '3s' },
                        { x1: 100, y1: 100, x2: 50, y2: 100, delay: '3.5s' }
                      ].map((line, i) => (
                        <g key={`neural-${i}`}>
                          <line 
                            x1={line.x1} y1={line.y1} 
                            x2={line.x2} y2={line.y2} 
                            stroke="rgb(51, 65, 85)" 
                            strokeWidth="1"
                            className="animate-pulse opacity-30"
                            style={{ animationDelay: line.delay, animationDuration: '2s' }}
                          />
                          <circle 
                            cx={line.x2} cy={line.y2} r="3" 
                            fill="rgb(71, 85, 105)" 
                            className="animate-pulse"
                            style={{ animationDelay: line.delay, animationDuration: '2s' }}
                          />
                        </g>
                      ))}
                      
                      {/* Data Flow Particles */}
                      {[...Array(12)].map((_, i) => (
                        <circle
                          key={`particle-${i}`}
                          r="1"
                          fill="rgb(14, 116, 144)"
                          className="animate-pulse opacity-60"
                          style={{
                            animationDelay: `${i * 0.2}s`,
                            animationDuration: '1s'
                          }}
                        >
                          <animateMotion
                            dur="4s"
                            repeatCount="indefinite"
                            begin={`${i * 0.3}s`}
                          >
                            <path d={`M 100,100 Q ${80 + (i % 4) * 10},${80 + (i % 3) * 15} ${120 + (i % 5) * 8},${120 + (i % 4) * 12} T 100,100`} />
                          </animateMotion>
                        </circle>
                      ))}
                    </svg>
                  </div>
                  
                  {/* Central Core Visual */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-blue-900 rounded-lg animate-pulse mx-auto"></div>
                    </div>
                  </div>
                  
                  {/* Scanning Lines */}
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-slate-500 to-transparent animate-pulse" 
                         style={{ animationDuration: '3s' }} />
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-700 to-transparent animate-pulse" 
                         style={{ animationDuration: '3s', animationDelay: '1.5s' }} />
                  </div>
                </div>

                {/* Marketplace Data Streams */}
                <div className="absolute -top-8 -right-8 w-32 h-32 opacity-50">
                  <div className="relative w-full h-full">
                    {/* Data Flow Lines */}
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={`stream-${i}`}
                        className="absolute bg-gradient-to-r from-transparent via-teal-600 to-transparent h-0.5 animate-pulse"
                        style={{
                          width: '60px',
                          top: `${10 + i * 12}%`,
                          right: '0',
                          animationDelay: `${i * 0.4}s`,
                          animationDuration: '2s',
                          transform: `rotate(${15 + i * 5}deg)`
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="absolute -bottom-8 -left-8 w-28 h-28 opacity-30">
                  <div className="relative w-full h-full">
                    {/* Agent Activity */}
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={`activity-${i}`}
                        className="absolute bg-gradient-to-r from-transparent via-slate-600 to-transparent h-0.5 animate-pulse"
                        style={{
                          width: '50px',
                          bottom: `${5 + i * 15}%`,
                          left: '0',
                          animationDelay: `${i * 0.6}s`,
                          animationDuration: '2.5s',
                          transform: `rotate(${-20 + i * 8}deg)`
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating Data Indicators */}
                {[
                  { pos: { top: '15%', right: '20%' } },
                  { pos: { top: '25%', left: '15%' } },
                  { pos: { bottom: '20%', right: '15%' } },
                  { pos: { bottom: '15%', left: '20%' } }
                ].map((item, i) => (
                  <div
                    key={`indicator-${i}`}
                    className="absolute w-3 h-3 bg-gradient-to-br from-blue-600 to-slate-800 rounded-full animate-pulse opacity-60"
                    style={{
                      ...item.pos,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: '3s'
                    }}
                  >
                    <div className="absolute inset-0 bg-teal-600 rounded-full animate-ping opacity-40" style={{ animationDelay: `${i * 0.3}s` }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

  {/* Futuristic Avalanche Network Features - Neural Network Design */}
      <section id="avalanche-features" className="relative px-6 md:px-10 lg:px-16 xl:px-24 py-24 overflow-hidden">
        {/* Neural Network Background */}
        <div className="absolute inset-0">
          {/* Quantum Field Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-transparent to-blue-900/20" />
          
          {/* Floating Neural Nodes */}
          <div className="absolute inset-0">
            {/* Fix hydration error: generate node positions on client only */}
            {isClient && Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`node-${i}`}
                className="absolute w-2 h-2 bg-blue-400/60 rounded-full"
                style={{
                  left: `${15 + (i * 7)}%`,
                  top: `${20 + Math.sin(i * 0.8) * 30}%`,
                  animationName: 'float',
                  animationDuration: `${3 + (i * 89) % 200 / 100}s`,
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  animationDelay: `${i * 0.3}s`
                }}
              />
            ))}
          </div>
          
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 800">
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.1" />
                <stop offset="50%" stopColor="rgb(147, 197, 253)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {/* Neural connection paths */}
            <path d="M200,200 Q400,100 600,200 T1000,200" stroke="url(#connectionGradient)" strokeWidth="1" fill="none" className="animate-pulse" />
            <path d="M150,400 Q350,300 550,400 T950,400" stroke="url(#connectionGradient)" strokeWidth="1" fill="none" className="animate-pulse" style={{ animationDelay: '1s' }} />
            <path d="M100,600 Q300,500 500,600 T900,600" stroke="url(#connectionGradient)" strokeWidth="1" fill="none" className="animate-pulse" style={{ animationDelay: '2s' }} />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Futuristic Header */}
          <div className="text-center mb-20">
            {/* Quantum Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-500/10 backdrop-blur-xl border border-blue-400/30 mb-8 group hover:scale-105 transition-all duration-500">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-blue-200 font-mono text-sm tracking-[0.2em] uppercase">Neural Blockchain Architecture</span>
              <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            
            {/* Main Title with Holographic Effect */}
            <div className="relative mb-6">
              <h2 className="text-5xl md:text-7xl font-thin tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200 mb-2">
                POWERED BY
              </h2>
              <div className="relative inline-block">
                <h2 className="text-6xl md:text-8xl font-black tracking-wider bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400 bg-clip-text text-transparent animate-pulse">
                  AVALANCHE
                </h2>
                {/* Holographic shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              </div>
              
              {/* Quantum lines */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" />
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            
            <p className="text-lg text-blue-100/70 max-w-3xl mx-auto leading-relaxed font-light">
              Experience next-generation blockchain infrastructure engineered for infinite scalability and quantum-speed execution
            </p>
          </div>
          
          {/* Neural Network Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 perspective-1000">
            {[
              {
                title: "Quantum Speed",
                metric: "4,500+",
                unit: "TPS",
                description: "Sub-second finality through advanced consensus mechanisms",
                delay: "0s",
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                title: "Micro Economics",
                metric: "<$0.01",
                unit: "FEES",
                description: "Minimal transaction costs enabling mass adoption",
                delay: "0.3s",
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                )
              },
              {
                title: "Carbon Neutral",
                metric: "99.9%",
                unit: "GREEN",
                description: "Sustainable proof-of-stake consensus protocol",
                delay: "0.6s",
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className="group relative"
                style={{ 
                  animationDelay: feature.delay,
                  transform: 'translateZ(0)' 
                }}
              >
                {/* Neural Card */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950/40 to-blue-900/20 backdrop-blur-xl border border-blue-400/20 p-8 hover:border-blue-300/40 transition-all duration-700 hover:scale-105 hover:rotate-y-5">
                  
                  {/* Energy Field Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Quantum Nodes */}
                  <div className="absolute top-4 right-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    {/* Icon with Neural Halo */}
                    <div className="relative mb-8">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-400/30 flex items-center justify-center text-blue-300 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 mx-auto">
                        {feature.icon}
                      </div>
                      {/* Neural rings */}
                      <div className="absolute inset-0 rounded-full border border-blue-400/30 animate-ping opacity-20" />
                      <div className="absolute inset-2 rounded-full border border-blue-300/20 animate-ping opacity-30" style={{ animationDelay: '0.5s' }} />
                    </div>
                    
                    {/* Metric Display */}
                    <div className="text-center mb-6">
                      <div className="flex items-baseline justify-center gap-2 mb-2">
                        <span className="text-4xl font-black text-blue-300 group-hover:text-blue-200 transition-colors duration-300">
                          {feature.metric}
                        </span>
                        <span className="text-sm font-mono text-blue-400/80 tracking-wider">
                          {feature.unit}
                        </span>
                      </div>
                      <h3 className="text-xl font-light text-white/90 mb-3 tracking-wide">
                        {feature.title}
                      </h3>
                    </div>
                    
                    {/* Description */}
                    <p className="text-blue-100/60 text-center leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Quantum scanning line */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-1000" />
                </div>
                
                {/* Neural connection to next card */}
                {index < 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-400/60 to-transparent z-20" />
                )}
              </div>
            ))}
          </div>
          
          {/* Quantum Stats Footer */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-8 px-8 py-4 rounded-full bg-blue-950/30 backdrop-blur-xl border border-blue-400/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-blue-200/80 text-sm font-mono">NETWORK STATUS: OPTIMAL</span>
              </div>
              <div className="w-px h-4 bg-blue-400/30" />
              <div className="text-blue-200/80 text-sm font-mono">
                LATENCY: <span className="text-blue-300">~0.68ms</span>
              </div>
              <div className="w-px h-4 bg-blue-400/30" />
              <div className="text-blue-200/80 text-sm font-mono">
                VALIDATORS: <span className="text-blue-300">2,847</span>
              </div>
            </div>
          </div>
        </div>

        {/* Add custom styles for animations */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-shimmer {
            animation: shimmer 2s infinite;
          }
          .perspective-1000 {
            perspective: 1000px;
          }
          .hover\\:rotate-y-5:hover {
            transform: rotateY(5deg) scale(1.05);
          }
        `}</style>
      </section>

      {/* Advanced Blockchain Features - Quantum Grid Architecture */}
      <section id="integration" className="relative px-6 md:px-10 lg:px-16 xl:px-24 py-24 overflow-hidden">
        {/* Quantum Field Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/20 via-transparent to-blue-900/10" />
          
          {/* Floating Data Nodes */}
          <div className="absolute inset-0">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`data-node-${i}`}
                className="absolute w-1.5 h-1.5 bg-blue-300/50 rounded-full"
                style={{
                  left: `${20 + (i * 10)}%`,
                  top: `${30 + Math.cos(i * 0.6) * 25}%`,
                  animationName: 'float',
                  animationDuration: `${4 + (i * 113) % 200 / 100}s`,
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  animationDelay: `${i * 0.4}s`
                }}
              />
            ))}
          </div>
          
          {/* Quantum Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" 
                 style={{
                   backgroundImage: `
                     linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
                   `,
                   backgroundSize: '60px 60px'
                 }}
            />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Neural Header */}
          <div className="flex items-end justify-between mb-16">
            <div className="max-w-3xl">
              {/* Quantum Badge */}
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-500/10 backdrop-blur-xl border border-blue-400/30 mb-6">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-blue-200 font-mono text-xs tracking-[0.15em] uppercase">Infrastructure Layer</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-thin tracking-wide text-white mb-4">
                ADVANCED <span className="font-black bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">BLOCKCHAIN</span>
              </h2>
              <h2 className="text-4xl md:text-6xl font-black tracking-wide bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent mb-6">
                ARCHITECTURE
              </h2>
              
              <p className="text-blue-100/70 text-lg leading-relaxed max-w-2xl">
                Enterprise-grade blockchain infrastructure engineered for next-generation AI applications with quantum-scale performance
              </p>
            </div>
            
            {/* Neural Link Button */}
            <div className="hidden md:block">
              <a className="group relative overflow-hidden px-6 py-3 rounded-full bg-blue-950/40 backdrop-blur-xl border border-blue-400/30 text-blue-200 font-medium transition-all duration-500 hover:text-white hover:scale-105" href="#">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-400/20 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
                <span className="relative z-10 flex items-center gap-2">
                  Neural Docs
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
          
          {/* Quantum Feature Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: "Multi-Chain Architecture",
                description: "Built on Avalanche's unique subnet technology for scalable and customizable blockchain solutions with unlimited throughput",
                details: "C-Chain, P-Chain, X-Chain",
                delay: "0s",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                )
              },
              {
                title: "Smart Contract Integration",
                description: "Ethereum-compatible smart contracts with enhanced performance, lower costs, and instant finality for AI agent operations",
                details: "EVM Compatible",
                delay: "0.2s",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )
              },
              {
                title: "Cross-Chain Interoperability",
                description: "Seamless asset transfers and communication between different blockchain networks with native bridge technology",
                details: "Bridge Technology",
                delay: "0.4s",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                )
              },
              {
                title: "Institutional Grade Security",
                description: "Enterprise-level security with decentralized validation, quantum-resistant encryption, and consensus mechanisms",
                details: "2000+ Validators",
                delay: "0.6s",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              }
            ].map((feature) => (
              <div 
                key={feature.title} 
                className="group relative"
                style={{ animationDelay: feature.delay }}
              >
                {/* Quantum Card */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950/30 to-blue-900/10 backdrop-blur-xl border border-blue-400/20 p-8 hover:border-blue-300/40 transition-all duration-700 hover:scale-105">
                  
                  {/* Energy Field */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Quantum Indicators */}
                  <div className="absolute top-6 right-6">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                      <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    {/* Neural Icon */}
                    <div className="flex items-start gap-6 mb-6">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-400/30 flex items-center justify-center text-blue-300 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                          {feature.icon}
                        </div>
                        {/* Neural pulse rings */}
                        <div className="absolute inset-0 rounded-2xl border border-blue-400/30 animate-ping opacity-20" />
                        <div className="absolute inset-1 rounded-2xl border border-blue-300/20 animate-ping opacity-30" style={{ animationDelay: '0.5s' }} />
                      </div>
                      
                      {/* Title & Badge */}
                      <div className="flex-1">
                        <h3 className="text-xl font-light text-white/90 mb-2 tracking-wide group-hover:text-blue-100 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-mono tracking-wider group-hover:bg-blue-400/30 group-hover:text-blue-200 transition-all duration-300">
                          {feature.details}
                        </div>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-blue-100/60 leading-relaxed text-sm group-hover:text-blue-100/80 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Quantum scanning beam */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-1000" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>      {/* AI Agent Categories */}
      <section className="relative px-6 md:px-10 lg:px-16 xl:px-24 py-20 overflow-hidden">
        {/* Cool background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/10 via-transparent to-blue-900/5" />
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
                 backgroundSize: '50px 50px'
               }}
          />
        </div>

        <div className="relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 mb-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-blue-300 text-sm font-mono tracking-wider">AI CATEGORIES</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
              Explore <span className="font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">Agent Types</span>
            </h2>
            <p className="text-blue-100/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Discover specialized AI agents designed for every industry and use case
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Audio Processing", icon: "🎧", count: "240+", color: "blue" },
              { name: "Financial Analytics", icon: "📈", count: "180+", color: "green" },
              { name: "Research & Analysis", icon: "�", count: "320+", color: "purple" },
              { name: "Code Assistant", icon: "💻", count: "150+", color: "orange" },
              { name: "Data Visualization", icon: "�", count: "200+", color: "indigo" },
              { name: "Marketing & Social", icon: "📱", count: "190+", color: "pink" },
              { name: "DevOps & Infrastructure", icon: "⚙️", count: "120+", color: "gray" },
              { name: "Finance & Operations", icon: "💰", count: "160+", color: "yellow" }
            ].map((category, index) => (
              <div 
                key={category.name}
                className="group relative rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-500 hover:-translate-y-2 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-blue-400/20 to-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 transform group-hover:scale-110 transition-transform duration-300 group-hover:text-blue-200">
                    {index === 0 && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 7.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M9 5H5a2 2 0 00-2 2v10a2 2 0 002 2h4l5 5V0L9 5z" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    )}
                    {index === 3 && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    )}
                    {index === 4 && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                    {index === 5 && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4L5.5 6M17 4l1.5 2M6 18l1.5-2M18 18l-1.5-2M3 8h18l-2 10H5L3 8z" />
                      </svg>
                    )}
                    {index === 6 && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                    {index === 7 && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-medium text-white mb-2 group-hover:text-blue-100 transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  <div className="text-blue-300 text-sm font-mono">
                    {category.count} agents
                  </div>
                </div>

                {/* Cool hover line */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/presets" 
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-950/40 backdrop-blur-md border border-blue-400/30 text-blue-200 hover:text-white hover:bg-blue-900/40 transition-all duration-300"
            >
              Explore All Categories
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Synaptica Ecosystem */}
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/30 to-black" />
        <div className="absolute inset-0">
          {/* Animated circuit patterns */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-spin" style={{ animationDuration: '30s' }}>
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-400" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-blue-300" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-blue-500" />
            </svg>
          </div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}>
              <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-400" />
              <polygon points="50,20 80,80 20,80" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-blue-300" />
            </svg>
          </div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full border border-blue-400/30 backdrop-blur-sm">
                <span className="text-blue-300 text-sm font-medium">ECOSYSTEM OVERVIEW</span>
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-6">
              Synaptica Ecosystem
            </h2>
            <p className="text-xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed">
              Discover the comprehensive ecosystem that powers the future of AI-driven blockchain applications with enterprise-grade security and scalability.
            </p>
          </div>

          {/* Enhanced Interactive Ecosystem Visualization */}
          <div className="max-w-6xl mx-auto">
            {/* Circular Widget Container */}
            <div className="relative flex items-center justify-center min-h-[700px]">
              
              {/* Center Hub with Enhanced Animation */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="relative cursor-pointer group transition-all duration-500 hover:scale-110 hover:-translate-y-2">
                  {/* Pulsing Rings */}
                  <div className="absolute inset-0 w-40 h-40 rounded-full border-2 border-blue-400/30 animate-pulse" style={{ animationDuration: '3s' }} />
                  <div className="absolute inset-2 w-36 h-36 rounded-full border border-blue-300/20 animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
                  
                  {/* Main Hub */}
                  <div className="relative w-32 h-32 bg-gradient-to-br from-blue-600/90 to-blue-800/90 rounded-full flex items-center justify-center shadow-2xl border-2 border-blue-400/50 group-hover:border-blue-300/70 group-hover:from-blue-500/95 group-hover:to-blue-700/95 transition-all duration-500 backdrop-blur-sm">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent group-hover:from-white/20 transition-all duration-500" />
                    
                    <div className="relative z-10 text-center">
                      <div className="text-white font-bold text-xl group-hover:text-2xl transition-all duration-300 mb-1">AI</div>
                      <div className="text-blue-100/90 text-sm group-hover:text-blue-50 transition-all duration-300 font-medium">CORE</div>
                    </div>
                  </div>

                  {/* Floating Elements Around Hub */}
                  <div className="absolute inset-0">
                    {[0, 120, 240].map((angle, idx) => {
                      const x = Math.cos((angle - 90) * Math.PI / 180) * 80;
                      const y = Math.sin((angle - 90) * Math.PI / 180) * 80;
                      return (
                        <div
                          key={`orbit-${idx}`}
                          className="absolute w-3 h-3 bg-blue-400 rounded-full animate-pulse"
                          style={{
                            left: `calc(50% + ${x}px - 6px)`,
                            top: `calc(50% + ${y}px - 6px)`,
                            animationDelay: `${idx * 0.7}s`,
                            animationDuration: `${2 + idx * 0.3}s`
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

            {/* Enhanced Circular Segments */}
            <div className="relative w-[500px] h-[500px]">
              {/* Dynamic Connecting Rings */}
              <div className="absolute inset-16 rounded-full border border-blue-400/20 animate-spin" style={{ animationDuration: '60s' }} />
              <div className="absolute inset-20 rounded-full border border-blue-300/15 animate-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />
              
              {/* Enhanced Data Points */}
              {[
                {
                  title: "AI Agents",
                  value: "500+",
                  description: "Verified autonomous agents",
                  angle: 0,
                  gradient: "from-emerald-500 to-teal-600"
                },
                {
                  title: "Categories",
                  value: "25+",
                  description: "Specialized AI domains",
                  angle: 60,
                  gradient: "from-purple-500 to-indigo-600"
                },
                {
                  title: "Active Users",
                  value: "15K+",
                  description: "Monthly active developers",
                  angle: 120,
                  gradient: "from-blue-500 to-cyan-600"
                },
                {
                  title: "Success Rate",
                  value: "98.5%",
                  description: "Task completion accuracy",
                  angle: 180,
                  gradient: "from-green-500 to-emerald-600"
                },
                {
                  title: "Response Time",
                  value: "<2s",
                  description: "Average API response",
                  angle: 240,
                  gradient: "from-orange-500 to-red-600"
                },
                {
                  title: "Uptime",
                  value: "99.9%",
                  description: "Platform availability",
                  angle: 300,
                  gradient: "from-pink-500 to-rose-600"
                }
              ].map((segment, index) => {
                const radius = 200;
                const x = Math.cos((segment.angle - 90) * Math.PI / 180) * radius;
                const y = Math.sin((segment.angle - 90) * Math.PI / 180) * radius;
                
                return (
                  <div
                    key={segment.title}
                    className="group absolute cursor-pointer transition-all duration-500 hover:scale-125 hover:-translate-y-3 z-20"
                    style={{
                      left: `calc(50% + ${x}px - 4rem)`,
                      top: `calc(50% + ${y}px - 4rem)`,
                      transformOrigin: 'center',
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    {/* Enhanced Connecting Line */}
                    <div 
                      className="absolute w-24 h-0.5 bg-gradient-to-l from-blue-400/60 via-blue-300/80 to-transparent origin-right group-hover:from-blue-300 group-hover:via-blue-400 group-hover:to-blue-500/50 transition-all duration-500 group-hover:h-1"
                      style={{
                        right: '4rem',
                        top: '50%',
                        transform: `rotate(${segment.angle + 180}deg)`,
                        transformOrigin: 'right center'
                      }}
                    />
                    
                    {/* Enhanced Segment Circle */}
                    <div className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${segment.gradient}/20 group-hover:${segment.gradient}/40 transition-all duration-500 shadow-xl group-hover:shadow-2xl group-hover:shadow-blue-500/30 border-2 border-white/20 group-hover:border-white/40 backdrop-blur-md`}>
                      <div className="absolute inset-0 rounded-full bg-black/20 group-hover:bg-black/5 transition-all duration-500" />
                      
                      {/* Icon Replacement */}
                      <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/20 to-white/10 border border-white/30 group-hover:scale-110 transition-all duration-300"></div>
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center pt-8">
                        <div className="text-white font-bold text-lg group-hover:text-xl transition-all duration-300 mb-1">
                          {segment.value}
                        </div>
                        <div className="text-blue-100/90 text-sm group-hover:text-white group-hover:text-base transition-all duration-300 font-medium">
                          {segment.title}
                        </div>
                      </div>

                      {/* Animated Border */}
                      <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/30 transition-all duration-500">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ animationDuration: '3s' }} />
                      </div>
                    </div>

                    {/* Enhanced Hover Info Card */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-30">
                      <div className="bg-black/95 backdrop-blur-md rounded-xl p-4 border border-blue-400/30 min-w-[160px] shadow-2xl">
                        <div className="text-white text-base font-bold text-center mb-1">{segment.title}</div>
                        <div className={`text-transparent bg-gradient-to-r ${segment.gradient} bg-clip-text text-center text-2xl font-bold mb-2`}>{segment.value}</div>
                        <div className="text-blue-100/80 text-sm text-center leading-relaxed">{segment.description}</div>
                      </div>
                      {/* Enhanced Arrow */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-b-6 border-transparent border-b-black/95" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Enhanced Outer Ring Animations */}
            <div className="absolute inset-0 rounded-full border border-blue-400/10 animate-pulse" style={{ width: '600px', height: '600px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', animationDuration: '4s' }} />
            <div className="absolute inset-0 rounded-full border border-blue-300/5 animate-pulse" style={{ width: '650px', height: '650px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', animationDuration: '6s', animationDelay: '1s' }} />
          </div>

          {/* Enhanced Bottom Stats Grid */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                label: "Total Value Locked", 
                value: "$25.8B", 
                gradient: "from-green-400 to-emerald-500",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )
              },
              { 
                label: "Daily Transactions", 
                value: "2.1M+", 
                gradient: "from-blue-400 to-cyan-500",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                )
              },
              { 
                label: "Active Subnets", 
                value: "75+", 
                gradient: "from-purple-400 to-indigo-500",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                )
              },
              { 
                label: "Ecosystem Projects", 
                value: "650+", 
                gradient: "from-orange-400 to-red-500",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                )
              }
            ].map((stat) => (
              <div key={stat.label} className="group relative overflow-hidden text-center p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 hover:-translate-y-1">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="w-12 h-12 mb-3 mx-auto rounded-lg bg-gradient-to-br from-white/20 to-white/10 border border-white/30 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 group-hover:text-4xl transition-all duration-300`}>{stat.value}</div>
                  <div className="text-sm text-blue-100/70 group-hover:text-blue-50 transition-colors duration-300 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </section>

      {/* Professional Marketplace Showcase - Glassmorphism */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-blue-800/10" />
        <div className="relative px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-blue-200 font-mono text-sm tracking-wide">PROFESSIONAL AI SOLUTIONS</span>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-light text-white mb-6">
              Enterprise-Grade <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">Synaptica</span> Platform
            </h3>
            
            <p className="text-lg text-blue-100/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover, deploy, and monetize cutting-edge AI agents with verified performance metrics, transparent pricing, and enterprise-level reliability.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {/* Filling Button 1 */}
              <Link href="/marketplace" className="group relative overflow-hidden px-8 py-4 rounded-full border border-blue-400/30 text-blue-200 font-medium transition-all duration-500 hover:text-white">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  Explore Marketplace
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              
              {/* Filling Button 2 */}
              <Link href="/create" className="group relative overflow-hidden px-8 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white font-medium transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-400/20 transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  Create AI Agent
                  <svg className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced How it Works - Interactive Journey */}
      <section id="how" className="relative px-6 md:px-10 lg:px-16 xl:px-24 py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/20 to-black" />
        <div className="absolute inset-0">
          {/* Flowing Data Streams */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`stream-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-pulse"
              style={{
                width: '200px',
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${3 + i * 0.5}s`,
                transform: `rotate(${45 + i * 15}deg)`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30 backdrop-blur-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-blue-300 text-sm font-medium tracking-wide">SIMPLE INTEGRATION</span>
              </div>
            </div>
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-8">
              How it works
            </h2>
            <p className="text-xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed">
              Transform your business with AI agents in three seamless steps. From connection to monetization, we&apos;ve streamlined the entire process.
            </p>
          </div>
          
          {/* Enhanced Steps with Connecting Flow */}
          <div className="relative">
            {/* Connecting Flow Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/50 to-blue-500/30 transform -translate-y-1/2 z-0" />
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400/80 to-transparent transform -translate-y-1/2 z-0 animate-pulse" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
              {[
                { 
                  number: "01",
                  title: "Connect Your Wallet", 
                  description: "Securely connect your preferred cryptocurrency wallet with enterprise-grade encryption. Support for MetaMask, WalletConnect, and 50+ wallet providers.",
                  features: ["Multi-wallet support", "Enterprise security", "Zero-knowledge auth"],
                  gradient: "from-blue-500 to-cyan-500",
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  )
                },
                { 
                  number: "02",
                  title: "Deploy AI Agents", 
                  description: "Browse our curated marketplace of verified AI agents with real-time performance metrics, user reviews, and transparent pricing models.",
                  features: ["500+ verified agents", "Real-time metrics", "Instant deployment"],
                  gradient: "from-purple-500 to-pink-500",
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )
                },
                { 
                  number: "03",
                  title: "Monetize & Scale", 
                  description: "Create, customize, and monetize your own AI agents with flexible business models. Scale globally with our distributed infrastructure.",
                  features: ["Custom agent builder", "Multiple revenue streams", "Global scaling"],
                  gradient: "from-emerald-500 to-teal-500",
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  )
                },
              ].map((step, index) => (
                <div key={step.title} className="group relative">
                  {/* Step Number Circle */}
                  <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg z-20 group-hover:scale-110 transition-transform duration-300`}>
                    {step.number}
                  </div>

                  {/* Main Card */}
                  <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-8 pt-12 hover:bg-white/10 transition-all duration-500 hover:-translate-y-3 hover:scale-105 group">
                    {/* Animated Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon Container */}
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient}/20 flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-white/10`}>
                        {step.icon}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-blue-200 transition-all duration-300">
                        {step.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-blue-100/80 leading-relaxed mb-6 group-hover:text-blue-50 transition-colors duration-300">
                        {step.description}
                      </p>

                      {/* Feature List */}
                      <div className="space-y-2">
                        {step.features.map((feature, idx) => (
                          <div key={feature} className="flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300" style={{ transitionDelay: `${idx * 100}ms` }}>
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
                            <span className="text-blue-200/70 text-sm group-hover:text-blue-100 transition-colors duration-300">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 w-16 h-16 rounded-full border border-white/5 group-hover:border-white/20 transition-colors duration-500" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full border border-white/5 group-hover:border-white/20 transition-colors duration-500" />
                    
                    {/* Animated Border */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/20 transition-all duration-500">
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${step.gradient}/20 opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                    </div>
                  </div>

                  {/* Connection Arrow (for larger screens) */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-30">
                      <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 relative">
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-t-2 border-b-2 border-transparent border-l-purple-400" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <Link href="/marketplace" className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Journey
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              
              <button className="group px-8 py-4 border-2 border-blue-400/50 rounded-full font-semibold text-blue-200 hover:bg-blue-900/30 hover:border-blue-300 transition-all duration-300 backdrop-blur-sm">
                <span className="flex items-center gap-2">
                  Watch Demo
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Network Activity Dashboard */}
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-12">
        <div className="rounded-[20px] bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-500/20 p-6 md:p-10 overflow-hidden relative">
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 md:grid-cols-12 gap-1 h-full">
              {Array.from({ length: 96 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-blue-400 animate-pulse"
                  style={{
                    animationDelay: `${(i * 31) % 300 / 100}s`,
                    animationDuration: `${2 + (i * 67) % 200 / 100}s`
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-center">
            {/* Network Stats */}
            <div className="space-y-6">
              <div>
                <h3 className="h3-work-sans text-[38px] bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                  Live Network Activity
                </h3>
                <p className="body-work-sans text-blue-200/80 mt-2">
                  Real-time blockchain metrics and AI agent deployment statistics
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Active Validators", value: "2,847", trend: "+12" },
                  { label: "Network TPS", value: "4,521", trend: "+8%" },
                  { label: "Gas Price", value: "0.002", trend: "-5%" },
                  { label: "Block Height", value: "8,432,156", trend: "+1" }
                ].map((stat) => (
                  <div key={stat.label} className="bg-black/30 rounded-lg p-4 border border-blue-500/20">
                    <div className="text-blue-200/60 text-sm mb-1">{stat.label}</div>
                    <div className="text-white font-bold text-lg">{stat.value}</div>
                    <div className="text-green-400 text-xs">{stat.trend}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <a href="https://subnets.avax.network/" target="_blank" rel="noopener noreferrer" className="flex-1 h-12 rounded-[20px] bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors duration-300 flex items-center justify-center">
                  View Explorer
                </a>
                <a href="https://build.avax.network/docs" target="_blank" rel="noopener noreferrer" className="flex-1 h-12 rounded-[20px] border border-blue-400/30 hover:bg-blue-900/30 text-blue-200 font-medium transition-colors duration-300 flex items-center justify-center">
                  API Docs
                </a>
              </div>
            </div>

            {/* Live Transaction Feed */}
            <div className="bg-black/40 rounded-lg border border-blue-500/20 h-80 overflow-hidden">
              <div className="p-4 border-b border-blue-500/20">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-semibold">Recent Transactions</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-blue-200/60 text-sm">Live</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 space-y-3 overflow-y-auto h-full">
                {[
                  { type: "Agent Deploy", hash: "0x7a8c...", value: "12.5 AVAX", time: "2s ago" },
                  { type: "Smart Contract", hash: "0x9b4d...", value: "8.3 AVAX", time: "5s ago" },
                  { type: "Agent Purchase", hash: "0x3f2e...", value: "15.7 AVAX", time: "8s ago" },
                  { type: "Token Transfer", hash: "0x1c5a...", value: "45.2 AVAX", time: "12s ago" },
                  { type: "Agent Deploy", hash: "0x6e8b...", value: "23.1 AVAX", time: "15s ago" },
                  { type: "Smart Contract", hash: "0x4d7c...", value: "7.9 AVAX", time: "18s ago" }
                ].map((tx, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-blue-900/20 rounded-lg border border-blue-500/10 hover:border-blue-400/30 transition-colors duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{tx.type}</div>
                        <div className="text-blue-200/60 text-xs font-mono">{tx.hash}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-blue-400 font-semibold text-sm">{tx.value}</div>
                      <div className="text-blue-200/60 text-xs">{tx.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative mt-16 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/30 to-black" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={`footer-particle-${i}`}
                className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
                style={{
                  left: `${(i * 79) % 100}%`,
                  top: `${(i * 37) % 100}%`,
                  animationDelay: `${(i * 234) % 3000}ms`,
                  animationDuration: `${2000 + (i * 567) % 2000}ms`
                }}
              />
            ))}
          </div>
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" 
                 style={{
                   backgroundImage: `
                     linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                   `,
                   backgroundSize: '50px 50px'
                 }} 
            />
          </div>
        </div>

        <div className="relative z-10 border-t border-blue-500/20">
        <div className="px-6 md:px-10 lg:px-16 xl:px-24 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 rounded-md bg-white/90" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-pulse" />
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Synaptica
              </div>
              <div className="text-blue-300/70 text-sm font-medium">POWERED BY AVALANCHE</div>
            </div>
            <p className="body-work-sans text-[#858584] mt-4">The world’s first and largest digital marketplace for intelligent agents and autonomous AI capabilities.</p>
          </div>
          <div>
            <div className="h5-work-sans text-[22px] mb-4">Explore</div>
            <ul className="space-y-2 text-[#858584]">
              <li><a href="#">Marketplace</a></li>
              <li><a href="#">Rankings</a></li>
              <li><a href="#">Connect a wallet</a></li>
            </ul>
          </div>
          <div>
          </div>
        </div>
  <div className="px-6 md:px-10 lg:px-16 xl:px-24 py-6 text-[#858584] border-t border-white/10 body-space-mono text-sm">© {new Date().getFullYear()} Synaptica. All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}
