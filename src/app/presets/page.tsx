'use client';

import React, { useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AgentTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  capabilities: string[];
  personality: string;
  useCase: string;
  iconGradient: string;
  backgroundGradient: string;
  tags: string[];
  featured: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const agentTemplates: AgentTemplate[] = [
  {
    id: 'crypto-analyst',
    name: 'Crypto Market Analyst',
    category: 'Finance',
    description: 'AI agent specialized in cryptocurrency market analysis, trading insights, and portfolio management.',
    longDescription: 'Advanced AI analyst that provides comprehensive cryptocurrency market analysis, identifies trading opportunities, tracks portfolio performance, and offers investment strategies based on technical analysis and market trends.',
    capabilities: [
      'Real-time market analysis',
      'Technical indicator interpretation',
      'Portfolio optimization',
      'Risk assessment',
      'Trend prediction',
      'Trading signals'
    ],
    personality: 'Professional, data-driven, analytical, and conservative with risk management',
    useCase: 'Perfect for traders, investors, and crypto enthusiasts seeking professional market insights',
    iconGradient: 'from-green-400 via-emerald-500 to-teal-600',
    backgroundGradient: 'from-green-900/20 via-emerald-900/10 to-teal-900/20',
    tags: ['Finance', 'Trading', 'Analysis', 'Popular'],
    featured: true,
    difficulty: 'Advanced'
  },
  {
    id: 'virtual-therapist',
    name: 'Virtual Therapist',
    category: 'Health & Wellness',
    description: 'Compassionate AI therapist providing emotional support, mental health guidance, and wellness coaching.',
    longDescription: 'Empathetic AI companion trained in therapeutic techniques, offering emotional support, stress management strategies, mindfulness guidance, and mental wellness coaching in a safe, judgment-free environment.',
    capabilities: [
      'Active listening and empathy',
      'Cognitive behavioral therapy techniques',
      'Stress management strategies',
      'Mindfulness and meditation guidance',
      'Mood tracking and analysis',
      'Crisis support resources'
    ],
    personality: 'Compassionate, patient, non-judgmental, supportive, and professionally trained',
    useCase: 'Ideal for individuals seeking emotional support, stress relief, and mental wellness guidance',
    iconGradient: 'from-purple-400 via-pink-500 to-rose-600',
    backgroundGradient: 'from-purple-900/20 via-pink-900/10 to-rose-900/20',
    tags: ['Health', 'Wellness', 'Support', 'Featured'],
    featured: true,
    difficulty: 'Beginner'
  },
  {
    id: 'math-tutor',
    name: 'Math Tutor Pro',
    category: 'Education',
    description: 'Expert mathematics tutor for all levels, from basic arithmetic to advanced calculus and beyond.',
    longDescription: 'Comprehensive mathematics education AI that adapts to your learning style, provides step-by-step solutions, creates practice problems, and helps build strong mathematical foundations from elementary to university level.',
    capabilities: [
      'Step-by-step problem solving',
      'Adaptive learning pathways',
      'Practice problem generation',
      'Concept visualization',
      'Progress tracking',
      'Exam preparation'
    ],
    personality: 'Patient, encouraging, methodical, and passionate about making math accessible',
    useCase: 'Perfect for students, parents helping with homework, and anyone looking to improve math skills',
    iconGradient: 'from-blue-400 via-indigo-500 to-purple-600',
    backgroundGradient: 'from-blue-900/20 via-indigo-900/10 to-purple-900/20',
    tags: ['Education', 'Math', 'Tutoring', 'Students'],
    featured: true,
    difficulty: 'Intermediate'
  },
  {
    id: 'creative-writer',
    name: 'Creative Writing Assistant',
    category: 'Creative',
    description: 'AI writing companion for creative projects, storytelling, and content creation.',
    longDescription: 'Versatile creative writing AI that helps with story development, character creation, plot structuring, dialogue writing, and overcoming writer\'s block. Supports various genres and writing styles.',
    capabilities: [
      'Story plot development',
      'Character creation and development',
      'Dialogue writing',
      'Genre-specific writing',
      'Writing prompts and inspiration',
      'Editing and proofreading'
    ],
    personality: 'Creative, imaginative, supportive, and inspiring with a love for storytelling',
    useCase: 'Great for authors, screenwriters, bloggers, and anyone passionate about creative writing',
    iconGradient: 'from-orange-400 via-red-500 to-pink-600',
    backgroundGradient: 'from-orange-900/20 via-red-900/10 to-pink-900/20',
    tags: ['Creative', 'Writing', 'Content', 'Popular'],
    featured: false,
    difficulty: 'Intermediate'
  },
  {
    id: 'fitness-coach',
    name: 'Personal Fitness Coach',
    category: 'Health & Wellness',
    description: 'AI fitness trainer providing personalized workout plans, nutrition advice, and motivation.',
    longDescription: 'Comprehensive fitness AI that creates customized workout routines, provides nutrition guidance, tracks progress, and offers motivation to help you achieve your health and fitness goals.',
    capabilities: [
      'Personalized workout plans',
      'Nutrition and meal planning',
      'Progress tracking',
      'Form correction and safety tips',
      'Motivation and accountability',
      'Injury prevention advice'
    ],
    personality: 'Motivating, knowledgeable, supportive, and focused on your success',
    useCase: 'Ideal for fitness enthusiasts, beginners starting their journey, and anyone seeking a personal trainer',
    iconGradient: 'from-red-400 via-pink-500 to-rose-600',
    backgroundGradient: 'from-red-900/20 via-pink-900/10 to-rose-900/20',
    tags: ['Health', 'Fitness', 'Coaching', 'Lifestyle'],
    featured: false,
    difficulty: 'Beginner'
  },
  {
    id: 'business-advisor',
    name: 'Business Strategy Advisor',
    category: 'Business',
    description: 'Strategic business consultant AI for startups, entrepreneurs, and business development.',
    longDescription: 'Expert business AI providing strategic advice, market analysis, business plan development, and growth strategies for entrepreneurs, startups, and established businesses looking to expand.',
    capabilities: [
      'Business plan development',
      'Market analysis and research',
      'Financial projections',
      'Growth strategy planning',
      'Competitive analysis',
      'Risk assessment and mitigation'
    ],
    personality: 'Strategic, analytical, experienced, and focused on practical business solutions',
    useCase: 'Perfect for entrepreneurs, startup founders, and business professionals seeking strategic guidance',
    iconGradient: 'from-gray-400 via-slate-500 to-zinc-600',
    backgroundGradient: 'from-gray-900/20 via-slate-900/10 to-zinc-900/20',
    tags: ['Business', 'Strategy', 'Consulting', 'Professional'],
    featured: false,
    difficulty: 'Advanced'
  },
  {
    id: 'language-teacher',
    name: 'Language Learning Companion',
    category: 'Education',
    description: 'Multi-language AI teacher for conversational practice, grammar, and cultural insights.',
    longDescription: 'Interactive language learning AI that provides conversational practice, grammar lessons, vocabulary building, cultural context, and pronunciation guidance for multiple languages.',
    capabilities: [
      'Conversational practice',
      'Grammar and syntax lessons',
      'Vocabulary building',
      'Pronunciation guidance',
      'Cultural context and insights',
      'Progress assessment'
    ],
    personality: 'Patient, encouraging, culturally aware, and passionate about language learning',
    useCase: 'Great for language learners, travelers, and anyone interested in cultural exchange',
    iconGradient: 'from-teal-400 via-cyan-500 to-blue-600',
    backgroundGradient: 'from-teal-900/20 via-cyan-900/10 to-blue-900/20',
    tags: ['Education', 'Languages', 'Culture', 'Learning'],
    featured: false,
    difficulty: 'Intermediate'
  },
  {
    id: 'tech-support',
    name: 'Tech Support Specialist',
    category: 'Technology',
    description: 'AI technical support agent for troubleshooting, software help, and IT guidance.',
    longDescription: 'Knowledgeable technical support AI that helps troubleshoot hardware issues, provides software guidance, explains technical concepts, and offers IT solutions for various technology problems.',
    capabilities: [
      'Hardware troubleshooting',
      'Software installation and setup',
      'Network configuration',
      'Security recommendations',
      'Performance optimization',
      'Technical education'
    ],
    personality: 'Patient, knowledgeable, thorough, and dedicated to solving technical problems',
    useCase: 'Ideal for anyone needing technical support, IT professionals, and technology enthusiasts',
    iconGradient: 'from-slate-400 via-gray-500 to-stone-600',
    backgroundGradient: 'from-slate-900/20 via-gray-900/10 to-stone-900/20',
    tags: ['Technology', 'Support', 'IT', 'Troubleshooting'],
    featured: false,
    difficulty: 'Advanced'
  },
  {
    id: 'social-media-manager',
    name: 'Social Media Manager',
    category: 'Marketing',
    description: 'AI-powered social media strategist for content creation, engagement, and growth.',
    longDescription: 'Comprehensive social media AI that creates engaging content, develops posting strategies, analyzes performance metrics, and helps grow your online presence across multiple platforms.',
    capabilities: [
      'Content creation and curation',
      'Posting schedule optimization',
      'Hashtag research and strategy',
      'Engagement analysis',
      'Trend identification',
      'Brand voice development'
    ],
    personality: 'Creative, trend-aware, engaging, and focused on authentic brand building',
    useCase: 'Perfect for influencers, small businesses, marketers, and content creators',
    iconGradient: 'from-violet-400 via-purple-500 to-fuchsia-600',
    backgroundGradient: 'from-violet-900/20 via-purple-900/10 to-fuchsia-900/20',
    tags: ['Marketing', 'Social Media', 'Content', 'Growth'],
    featured: true,
    difficulty: 'Intermediate'
  },
  {
    id: 'data-scientist',
    name: 'Data Science Consultant',
    category: 'Technology',
    description: 'Advanced AI for data analysis, machine learning insights, and statistical modeling.',
    longDescription: 'Expert-level data science AI that performs complex statistical analysis, creates predictive models, visualizes data patterns, and provides actionable insights from large datasets.',
    capabilities: [
      'Statistical analysis and modeling',
      'Machine learning implementation',
      'Data visualization',
      'Predictive analytics',
      'A/B testing design',
      'Data cleaning and preprocessing'
    ],
    personality: 'Analytical, methodical, detail-oriented, and passionate about data-driven insights',
    useCase: 'Ideal for researchers, analysts, business intelligence teams, and data-driven decision makers',
    iconGradient: 'from-emerald-400 via-teal-500 to-cyan-600',
    backgroundGradient: 'from-emerald-900/20 via-teal-900/10 to-cyan-900/20',
    tags: ['Technology', 'Data Science', 'Analytics', 'ML'],
    featured: true,
    difficulty: 'Advanced'
  },
  {
    id: 'legal-advisor',
    name: 'Legal Research Assistant',
    category: 'Professional',
    description: 'AI legal researcher for case analysis, document review, and legal guidance.',
    longDescription: 'Specialized legal AI that assists with legal research, document analysis, case law review, and provides general legal information while emphasizing the need for professional consultation.',
    capabilities: [
      'Legal document analysis',
      'Case law research',
      'Contract review assistance',
      'Legal terminology explanation',
      'Compliance guidance',
      'Legal writing support'
    ],
    personality: 'Precise, thorough, ethical, and committed to accuracy in legal matters',
    useCase: 'Valuable for lawyers, paralegals, law students, and businesses needing legal research',
    iconGradient: 'from-amber-400 via-yellow-500 to-orange-600',
    backgroundGradient: 'from-amber-900/20 via-yellow-900/10 to-orange-900/20',
    tags: ['Professional', 'Legal', 'Research', 'Compliance'],
    featured: false,
    difficulty: 'Advanced'
  },
  {
    id: 'meditation-guide',
    name: 'Mindfulness & Meditation Guide',
    category: 'Health & Wellness',
    description: 'Peaceful AI companion for meditation, mindfulness practices, and stress reduction.',
    longDescription: 'Calming mindfulness AI that guides meditation sessions, teaches breathing techniques, provides stress relief exercises, and helps develop sustainable wellness practices.',
    capabilities: [
      'Guided meditation sessions',
      'Breathing exercise instruction',
      'Mindfulness practice guidance',
      'Stress reduction techniques',
      'Sleep meditation support',
      'Wellness habit tracking'
    ],
    personality: 'Calm, peaceful, wise, and deeply committed to inner wellness and tranquility',
    useCase: 'Perfect for stress management, meditation beginners, and anyone seeking inner peace',
    iconGradient: 'from-indigo-400 via-purple-500 to-pink-600',
    backgroundGradient: 'from-indigo-900/20 via-purple-900/10 to-pink-900/20',
    tags: ['Health', 'Wellness', 'Meditation', 'Mindfulness'],
    featured: false,
    difficulty: 'Beginner'
  }
];

const categories = ['All', 'Finance', 'Health & Wellness', 'Education', 'Creative', 'Business', 'Technology', 'Marketing', 'Professional'];

export default function PresetsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState<AgentTemplate | null>(null);

  const filteredTemplates = selectedCategory === 'All' 
    ? agentTemplates 
    : agentTemplates.filter(template => template.category === selectedCategory);

  const featuredTemplates = agentTemplates.filter(template => template.featured);

  const handleCloneTemplate = (template: AgentTemplate) => {
    // In a real app, this would pre-populate the create form with template data
    router.push(`/create?template=${template.id}`);
  };

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
              <Link className="text-blue-400 hover:text-white hover:bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm transition-all duration-300 font-semibold" href="/presets">Presets</Link>
              <Link className="text-blue-200 hover:text-white hover:bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm transition-all duration-300" href="/docs">Docs</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Agent Templates
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choose from our curated collection of AI agent templates. Each template comes pre-configured with specialized capabilities, 
            personality traits, and use cases. Clone and customize to create your perfect AI companion.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className="px-4 py-2 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm">
              🔧 Lower Entry Barrier
            </span>
            <span className="px-4 py-2 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-300 text-sm">
              ⚡ Quick Start
            </span>
            <span className="px-4 py-2 rounded-2xl bg-green-600/20 border border-green-500/30 text-green-300 text-sm">
              🎯 Professional Quality
            </span>
          </div>
        </div>
      </div>

      {/* Featured Templates */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-16">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white/20 rounded"></div>
          </div>
          Featured Templates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTemplates.map((template) => (
            <div key={template.id} className="group rounded-3xl bg-black/20 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all duration-300 overflow-hidden hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20">
              <div className={`h-32 bg-gradient-to-br ${template.backgroundGradient} flex items-center justify-center relative overflow-hidden`}>
                <div className={`w-16 h-16 bg-gradient-to-br ${template.iconGradient} rounded-2xl flex items-center justify-center shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500`}>
                  <div className="w-8 h-8 bg-white/30 rounded-lg backdrop-blur-sm"></div>
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  <div className="absolute top-4 left-4 w-3 h-3 bg-white/10 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-6 right-8 w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute top-8 right-6 w-1 h-1 bg-white/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
                <div className={`absolute bottom-2 left-2 px-2 py-1 rounded-md text-xs font-medium bg-gradient-to-r ${template.iconGradient} text-white shadow-lg`}>
                  {template.difficulty}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
                    {template.name}
                  </h3>
                  <span className="px-2 py-1 rounded-lg bg-yellow-600/20 border border-yellow-500/30 text-yellow-300 text-xs">
                    Featured
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{template.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 rounded-lg bg-white/10 text-gray-300 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedTemplate(template)}
                    className="flex-1 px-4 py-2 rounded-2xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300 text-sm"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleCloneTemplate(template)}
                    className="flex-1 px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm"
                  >
                    Clone & Customize
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-12">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-2xl transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* All Templates Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-16">
        <h2 className="text-3xl font-bold mb-8">
          {selectedCategory === 'All' ? 'All Templates' : `${selectedCategory} Templates`}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="group rounded-2xl bg-black/20 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all duration-300 overflow-hidden hover:scale-[1.02]">
              <div className={`h-24 bg-gradient-to-br ${template.backgroundGradient} flex items-center justify-center relative`}>
                <div className={`w-12 h-12 bg-gradient-to-br ${template.iconGradient} rounded-xl flex items-center justify-center shadow-md transform rotate-6 group-hover:rotate-0 transition-transform duration-300`}>
                  <div className="w-6 h-6 bg-white/30 rounded-md"></div>
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  <div className="absolute top-2 left-2 w-2 h-2 bg-white/10 rounded-full"></div>
                  <div className="absolute bottom-2 right-3 w-1 h-1 bg-white/20 rounded-full"></div>
                </div>
                <div className={`absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-xs font-medium bg-gradient-to-r ${template.iconGradient} text-white opacity-80`}>
                  {template.difficulty.charAt(0)}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-200 transition-colors">
                  {template.name}
                </h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{template.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedTemplate(template)}
                    className="flex-1 px-3 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-300 text-sm"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleCloneTemplate(template)}
                    className="flex-1 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm"
                  >
                    Clone
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Template Detail Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl bg-black/90 backdrop-blur-xl border border-white/20">
            <button
              onClick={() => setSelectedTemplate(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors z-10"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className={`h-48 bg-gradient-to-br ${selectedTemplate.backgroundGradient} flex items-center justify-center relative overflow-hidden`}>
              <div className={`w-24 h-24 bg-gradient-to-br ${selectedTemplate.iconGradient} rounded-3xl flex items-center justify-center shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500`}>
                <div className="w-12 h-12 bg-white/30 rounded-xl backdrop-blur-sm"></div>
              </div>
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-8 left-8 w-4 h-4 bg-white/10 rounded-full animate-pulse"></div>
                <div className="absolute bottom-12 right-16 w-3 h-3 bg-white/20 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute top-16 right-12 w-2 h-2 bg-white/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-8 left-16 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
              </div>
              <div className={`absolute bottom-4 left-4 px-3 py-1 rounded-lg text-sm font-medium bg-gradient-to-r ${selectedTemplate.iconGradient} text-white shadow-lg`}>
                {selectedTemplate.difficulty}
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedTemplate.name}</h2>
                  <span className="px-3 py-1 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm">
                    {selectedTemplate.category}
                  </span>
                </div>
                {selectedTemplate.featured && (
                  <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-300 text-sm flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                    Featured
                  </span>
                )}
              </div>
              
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">{selectedTemplate.longDescription}</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                      <div className="w-3 h-3 bg-white/30 rounded"></div>
                    </div>
                    Capabilities
                  </h3>
                  <ul className="space-y-2">
                    {selectedTemplate.capabilities.map((capability, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-300">
                        <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                      <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    </div>
                    Personality
                  </h3>
                  <p className="text-gray-300 mb-6">{selectedTemplate.personality}</p>
                  
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                      <div className="w-3 h-3 bg-white/30 rounded-sm"></div>
                    </div>
                    Best For
                  </h3>
                  <p className="text-gray-300">{selectedTemplate.useCase}</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-lg bg-white/10 text-gray-300 text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                >
                  Close
                </button>
                <button
                  onClick={() => handleCloneTemplate(selectedTemplate)}
                  className="flex-1 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <span>🎯</span>
                  Clone & Customize This Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
