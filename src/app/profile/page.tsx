'use client';

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [address, setAddress] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    createdAgents: 0,
    ownedAgents: 0,
    totalInteractions: 0,
    joinedDate: new Date().toLocaleDateString()
  });

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setAddress(data.address);
          setIsAuthenticated(true);
          // Mock stats - in real app, fetch from API
          setStats({
            createdAgents: Math.floor(Math.random() * 10),
            ownedAgents: Math.floor(Math.random() * 25),
            totalInteractions: Math.floor(Math.random() * 500),
            joinedDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString()
          });
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setAddress(null);
      setIsAuthenticated(false);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading profile...</span>
        </div>
      </main>
    );
  }

  if (!isAuthenticated || !address) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-6">Please connect your wallet to access your profile.</p>
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            Go Home
          </Link>
        </div>
      </main>
    );
  }

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
              <div className="flex items-center gap-3">
                <span className="text-blue-200">{formatAddress(address)}</span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 rounded-2xl bg-red-600/20 border border-red-500/30 text-red-200 hover:bg-red-600/30 hover:text-white transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Profile Header */}
        <div className="mb-12">
          <div className="relative rounded-3xl bg-black/20 backdrop-blur-2xl border border-white/20 p-8 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-blue-600/10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-6 mb-6">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold">
                  {address.slice(2, 4).toUpperCase()}
                </div>
                
                <div>
                  <h1 className="text-4xl font-bold mb-2">{formatAddress(address)}</h1>
                  <p className="text-gray-400 text-lg">Member since {stats.joinedDate}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-medium">Active</span>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/create"
                  className="inline-flex items-center px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Agent
                </Link>
                <Link 
                  href="/marketplace"
                  className="inline-flex items-center px-6 py-3 rounded-2xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Browse Marketplace
                </Link>
                <Link 
                  href={`/artist/${address}`}
                  className="inline-flex items-center px-6 py-3 rounded-2xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Public Profile
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="rounded-2xl bg-black/20 backdrop-blur-xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-600/20">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-blue-400">{stats.createdAgents}</span>
            </div>
            <h3 className="font-semibold text-white mb-1">Created Agents</h3>
            <p className="text-gray-400 text-sm">AI agents you&apos;ve created</p>
          </div>

          <div className="rounded-2xl bg-black/20 backdrop-blur-xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-purple-600/20">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-purple-400">{stats.ownedAgents}</span>
            </div>
            <h3 className="font-semibold text-white mb-1">Owned Agents</h3>
            <p className="text-gray-400 text-sm">AI agents in your collection</p>
          </div>

          <div className="rounded-2xl bg-black/20 backdrop-blur-xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-green-600/20">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-green-400">{stats.totalInteractions}</span>
            </div>
            <h3 className="font-semibold text-white mb-1">Total Interactions</h3>
            <p className="text-gray-400 text-sm">Chat sessions completed</p>
          </div>

          <div className="rounded-2xl bg-black/20 backdrop-blur-xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-yellow-600/20">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-yellow-400">A+</span>
            </div>
            <h3 className="font-semibold text-white mb-1">User Rating</h3>
            <p className="text-gray-400 text-sm">Community feedback score</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-3xl bg-black/20 backdrop-blur-2xl border border-white/20 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Recent Activity
          </h2>
          
          <div className="space-y-4">
            {[
              { action: "Created AI Agent", name: "CodeMaster Pro", time: "2 hours ago", type: "create" },
              { action: "Purchased Agent", name: "Design Assistant", time: "1 day ago", type: "purchase" },
              { action: "Started Chat", name: "Writing Helper", time: "3 days ago", type: "chat" },
              { action: "Listed Agent", name: "Data Analyzer", time: "1 week ago", type: "list" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                <div className={`p-2 rounded-xl ${
                  activity.type === 'create' ? 'bg-blue-600/20 text-blue-400' :
                  activity.type === 'purchase' ? 'bg-green-600/20 text-green-400' :
                  activity.type === 'chat' ? 'bg-purple-600/20 text-purple-400' :
                  'bg-yellow-600/20 text-yellow-400'
                }`}>
                  {activity.type === 'create' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  )}
                  {activity.type === 'purchase' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  )}
                  {activity.type === 'chat' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  )}
                  {activity.type === 'list' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-blue-300">{activity.name}</p>
                </div>
                <span className="text-gray-400 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Settings Section */}
        <div className="rounded-3xl bg-black/20 backdrop-blur-2xl border border-white/20 p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Account Settings
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
                <div>
                  <h3 className="font-medium text-white">Notifications</h3>
                  <p className="text-gray-400 text-sm">Get updates about your agents</p>
                </div>
                <button className="w-12 h-6 bg-blue-600 rounded-full relative transition-colors">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
                <div>
                  <h3 className="font-medium text-white">Email Updates</h3>
                  <p className="text-gray-400 text-sm">Receive weekly summaries</p>
                </div>
                <button className="w-12 h-6 bg-gray-600 rounded-full relative transition-colors">
                  <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 transition-transform"></div>
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <button className="w-full p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 text-left">
                <h3 className="font-medium text-white mb-1">Export Data</h3>
                <p className="text-gray-400 text-sm">Download your account data</p>
              </button>
              
              <button 
                onClick={handleLogout}
                className="w-full p-4 rounded-2xl bg-red-600/20 border border-red-500/30 hover:bg-red-600/30 transition-all duration-300 text-left"
              >
                <h3 className="font-medium text-red-200 mb-1">Sign Out</h3>
                <p className="text-red-300 text-sm">Disconnect your wallet</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
