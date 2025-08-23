import { v4 as uuidv4 } from 'uuid';
import { AgentMetadata } from '@/lib/types';

// Simple in-memory storage for demo (replace with database in production)
const agents: AgentMetadata[] = [
  {
    id: 'agent-1',
    name: 'ChatBot Pro',
    description: 'A professional conversational AI agent that can help with customer support, Q&A, and general assistance.',
    image: '/api/placeholder/chatbot',
    endpoint: '/api/agents/chatbot-pro/interact',
    category: 'Customer Support',
    capabilities: ['conversation', 'q-and-a', 'customer-support'],
    price: 0.1,
    creator: '0x1234567890123456789012345678901234567890',
    created_at: new Date().toISOString(),
  },
  {
    id: 'agent-2',
    name: 'Code Assistant',
    description: 'An AI coding assistant that helps with programming questions, code review, and debugging.',
    image: '/api/placeholder/code',
    endpoint: '/api/agents/code-assistant/interact',
    category: 'Development',
    capabilities: ['coding', 'debugging', 'code-review'],
    price: 0.15,
    creator: '0x1234567890123456789012345678901234567890',
    created_at: new Date().toISOString(),
  },
  {
    id: 'agent-3',
    name: 'Creative Writer',
    description: 'A creative AI that helps with writing stories, poems, and creative content generation.',
    image: '/api/placeholder/creative',
    endpoint: '/api/agents/creative-writer/interact',
    category: 'Creative',
    capabilities: ['writing', 'storytelling', 'creative-content'],
    price: 0.08,
    creator: '0x1234567890123456789012345678901234567890',
    created_at: new Date().toISOString(),
  },
  {
    id: 'agent-4',
    name: 'Data Analyst Pro',
    description: 'Advanced data analysis and visualization agent for business intelligence and research insights.',
    image: '/api/placeholder/data',
    endpoint: '/api/agents/data-analyst/interact',
    category: 'Data Analysis',
    capabilities: ['data-analysis', 'visualization', 'statistics', 'reporting'],
    price: 0.25,
    creator: '0x2345678901234567890123456789012345678901',
    created_at: new Date().toISOString(),
  },
  {
    id: 'agent-5',
    name: 'Marketing Genius',
    description: 'Strategic marketing AI that creates campaigns, analyzes market trends, and optimizes content.',
    image: '/api/placeholder/marketing',
    endpoint: '/api/agents/marketing-genius/interact',
    category: 'Marketing & Social',
    capabilities: ['campaign-creation', 'market-analysis', 'content-optimization', 'seo'],
    price: 0.18,
    creator: '0x3456789012345678901234567890123456789012',
    created_at: new Date().toISOString(),
  },
  {
    id: 'agent-6',
    name: 'Sales Navigator',
    description: 'AI-powered sales assistant for lead generation, outreach strategies, and deal closure optimization.',
    image: '/api/placeholder/sales',
    endpoint: '/api/agents/sales-navigator/interact',
    category: 'Sales & Outreach',
    capabilities: ['lead-generation', 'outreach', 'sales-strategy', 'crm-optimization'],
    price: 0.22,
    creator: '0x4567890123456789012345678901234567890123',
    created_at: new Date().toISOString(),
  },
  {
    id: 'agent-7',
    name: 'Research Scholar',
    description: 'Academic and professional research agent that summarizes papers, conducts literature reviews, and analyzes trends.',
    image: '/api/placeholder/research',
    endpoint: '/api/agents/research-scholar/interact',
    category: 'Research & Summarization',
    capabilities: ['literature-review', 'trend-analysis', 'summarization', 'fact-checking'],
    price: 0.20,
    creator: '0x5678901234567890123456789012345678901234',
    created_at: new Date().toISOString(),
  },
  {
    id: 'agent-8',
    name: 'DevOps Engineer',
    description: 'Infrastructure and deployment specialist for CI/CD, cloud architecture, and system optimization.',
    image: '/api/placeholder/devops',
    endpoint: '/api/agents/devops-engineer/interact',
    category: 'DevOps & Infra',
    capabilities: ['ci-cd', 'cloud-architecture', 'monitoring', 'automation'],
    price: 0.30,
    creator: '0x6789012345678901234567890123456789012345',
    created_at: new Date().toISOString(),
  },
  {
    id: 'agent-9',
    name: 'Financial Advisor',
    description: 'Personal and business finance expert for budgeting, investment analysis, and financial planning.',
    image: '/api/placeholder/finance',
    endpoint: '/api/agents/financial-advisor/interact',
    category: 'Finance & Ops',
    capabilities: ['budgeting', 'investment-analysis', 'financial-planning', 'risk-assessment'],
    price: 0.35,
    creator: '0x7890123456789012345678901234567890123456',
    created_at: new Date().toISOString(),
  },
  {
    id: 'agent-10',
    name: 'Language Tutor',
    description: 'Multilingual AI tutor for language learning, translation, and cultural communication guidance.',
    image: '/api/placeholder/language',
    endpoint: '/api/agents/language-tutor/interact',
    category: 'Education',
    capabilities: ['language-learning', 'translation', 'grammar-check', 'cultural-guidance'],
    price: 0.12,
    creator: '0x8901234567890123456789012345678901234567',
    created_at: new Date().toISOString(),
  },
  {
    id: 'agent-11',
    name: 'Health Assistant',
    description: 'Wellness and health information agent for fitness planning, nutrition guidance, and health tracking.',
    image: '/api/placeholder/health',
    endpoint: '/api/agents/health-assistant/interact',
    category: 'Health & Wellness',
    capabilities: ['fitness-planning', 'nutrition-guidance', 'health-tracking', 'wellness-tips'],
    price: 0.14,
    creator: '0x9012345678901234567890123456789012345678',
    created_at: new Date().toISOString(),
  },
  {
    id: 'agent-12',
    name: 'Legal Advisor',
    description: 'Legal research and document analysis agent for contract review, compliance, and legal guidance.',
    image: '/api/placeholder/legal',
    endpoint: '/api/agents/legal-advisor/interact',
    category: 'Legal & Compliance',
    capabilities: ['contract-review', 'compliance-check', 'legal-research', 'document-analysis'],
    price: 0.40,
    creator: '0x0123456789012345678901234567890123456789',
    created_at: new Date().toISOString(),
  }
];

const apiKeys: { [key: string]: { agentId: string; userAddress: string; expiresAt: Date } } = {};

export class AgentService {
  static getAllAgents(): AgentMetadata[] {
    return agents;
  }

  static getAgentById(id: string): AgentMetadata | undefined {
    return agents.find(agent => agent.id === id);
  }

  static createAgent(agentData: Omit<AgentMetadata, 'id' | 'created_at'>): AgentMetadata {
    const newAgent: AgentMetadata = {
      ...agentData,
      id: uuidv4(),
      created_at: new Date().toISOString(),
    };
    agents.push(newAgent);
    return newAgent;
  }

  static generateAPIKey(agentId: string, userAddress: string): string {
    const apiKey = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour expiry
    
    apiKeys[apiKey] = { agentId, userAddress, expiresAt };
    return apiKey;
  }

  static validateAPIKey(apiKey: string): { valid: boolean; agentId?: string; userAddress?: string } {
    const keyData = apiKeys[apiKey];
    if (!keyData || keyData.expiresAt < new Date()) {
      if (keyData) delete apiKeys[apiKey]; // Clean up expired key
      return { valid: false };
    }
    return { valid: true, agentId: keyData.agentId, userAddress: keyData.userAddress };
  }

  static getAgentsByCategory(category: string): AgentMetadata[] {
    return agents.filter(agent => agent.category === category);
  }

  static searchAgents(query: string): AgentMetadata[] {
    const searchTerm = query.toLowerCase();
    return agents.filter(agent => 
      agent.name.toLowerCase().includes(searchTerm) ||
      agent.description.toLowerCase().includes(searchTerm) ||
      agent.capabilities.some(cap => cap.toLowerCase().includes(searchTerm))
    );
  }
}
