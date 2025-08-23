# 🤖 AI Agent Marketplace

A decentralized marketplace for discovering, testing, and trading AI agents as NFTs on the Avalanche blockchain. Built with Next.js 15, TypeScript, and smart contracts.

## 🌟 Features

### 🛒 **Marketplace**
- Browse 12+ specialized AI agents across 8 categories
- Interactive agent cards with detailed capabilities
- Real-time pricing in AVAX
- Purchase agents as NFTs for permanent ownership
- Demo mode to test agents before buying

### 🚀 **API Playground** 
- Interactive testing interface for all AI agents
- Generate demo API keys (24-hour expiry)
- Real-time API testing with sample prompts
- Code examples in JavaScript, Python, and React
- Live response preview and API documentation

### ⛓️ **Avalanche Integration**
- Built on Avalanche C-Chain for fast, low-cost transactions
- Core Wallet integration with automatic network switching
- Real-time network status and balance monitoring
- Smart contract deployment ready
- Links to essential Avalanche ecosystem tools

### 📚 **Documentation**
- Comprehensive user guides and API documentation
- Developer integration examples
- Mobile-optimized design
- Quick access to playground and blockchain info

## 🏗️ Architecture

### **Frontend (Next.js 15 + TypeScript)**
- `/marketplace` - Browse and purchase AI agents
- `/playground` - Interactive API testing environment
- `/avalanche` - Blockchain integration and tools
- `/docs` - Documentation and guides
- Responsive design with Tailwind CSS

### **Backend APIs**
- `/api/agents` - Agent metadata and search
- `/api/agents/demo-key` - Generate temporary API keys
- `/api/agents/[id]/interact` - Agent interaction endpoints
- `/api/auth/*` - Wallet authentication system
- `/api/placeholder/[type]` - Local SVG generation

### **Smart Contracts**
- `AIAgentNFT.sol` - ERC-721 NFT contract for agent ownership
- `AIAgentMarketplace.sol` - Marketplace contract for trading
- Deployed on Avalanche C-Chain (contract addresses TBD)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Core Wallet or MetaMask (for blockchain features)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lhcee3/ai-agent-marketplace-2.git
   cd ai-agent-marketplace-2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables:
   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   NEXT_PUBLIC_AVALANCHE_RPC=https://api.avax.network/ext/bc/C/rpc
   NEXT_PUBLIC_CONTRACT_ADDRESS=0x... # After deployment
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing the Platform

### 1. **Browse Marketplace**
- Visit `/marketplace` to see all 12 AI agents
- Categories include Customer Support, Development, Creative, Data Analysis, and more
- Each agent shows capabilities, pricing, and creator information

### 2. **Try the Playground**
- Visit `/playground` to test any agent interactively
- Generate demo API keys or use demo mode
- Test with sample prompts or custom messages
- View integration code examples

### 3. **Explore Avalanche Features**
- Visit `/avalanche` to see blockchain integration
- Connect your Core Wallet to view network status
- Explore ecosystem tools and smart contract information

## 🔗 Available AI Agents

| Agent | Category | Price (AVAX) | Capabilities |
|-------|----------|--------------|--------------|
| ChatBot Pro | Customer Support | 0.10 | Conversation, Q&A, Support |
| Code Assistant | Development | 0.15 | Coding, Debugging, Review |
| Creative Writer | Creative | 0.08 | Writing, Storytelling |
| Data Analyst Pro | Data Analysis | 0.25 | Analysis, Visualization |
| Marketing Genius | Marketing | 0.18 | Campaigns, SEO, Content |
| Sales Navigator | Sales | 0.22 | Lead Generation, Outreach |
| Research Scholar | Research | 0.20 | Literature Review, Analysis |
| DevOps Engineer | DevOps | 0.30 | CI/CD, Cloud Architecture |
| Financial Advisor | Finance | 0.35 | Budgeting, Investment |
| Language Tutor | Education | 0.12 | Language Learning, Translation |
| Health Assistant | Health | 0.14 | Fitness, Nutrition, Wellness |
| Legal Advisor | Legal | 0.40 | Contract Review, Compliance |

## 🛠️ Development

### **Project Structure**
```
src/
├── app/                 # Next.js app router pages
│   ├── marketplace/     # Agent browsing and purchasing
│   ├── playground/      # API testing interface
│   ├── avalanche/       # Blockchain integration
│   ├── docs/           # Documentation
│   └── api/            # Backend API routes
├── components/         # React components
│   ├── ConnectWallet.tsx
│   ├── AgentCard.tsx
│   └── AgentModal.tsx
├── lib/               # Utilities and services
│   ├── agent-service.ts
│   ├── types.ts
│   └── ipfs-service.ts
└── contracts/         # Smart contracts
    ├── AIAgentNFT.sol
    └── AIAgentMarketplace.sol
```

### **Key Technologies**
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Blockchain**: Avalanche C-Chain, Ethers.js, Core Wallet
- **Backend**: Next.js API routes, Node.js
- **Smart Contracts**: Solidity, Hardhat
- **Storage**: IPFS (for NFT metadata)

### **Build Commands**
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint checking
```

## 🔧 API Reference

### **Agent Interaction**
```javascript
// Demo mode (no authentication)
const response = await fetch('/api/agents/code-assistant/interact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Debug this function...' })
});

// With API key (after purchase)
const response = await fetch('/api/agents/code-assistant/interact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    message: 'Debug this function...',
    apiKey: 'your-api-key'
  })
});
```

### **Generate Demo Key**
```javascript
const response = await fetch('/api/agents/demo-key', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    agentId: 'agent-2',
    userAddress: '0x...'
  })
});
```

## 🚀 Deployment

### **Frontend Deployment (Vercel)**
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy with automatic builds on push

### **Smart Contract Deployment**
```bash
# Compile contracts
npx hardhat compile

# Deploy to Avalanche mainnet
npx hardhat run scripts/deploy.js --network avalanche

# Verify contracts
npx hardhat verify --network avalanche CONTRACT_ADDRESS
```

## 🌐 Live Demo

- **Frontend**: [https://ai-agent-marketplace-2.vercel.app](https://ai-agent-marketplace-2.vercel.app)
- **Documentation**: [/docs](https://ai-agent-marketplace-2.vercel.app/docs)
- **API Playground**: [/playground](https://ai-agent-marketplace-2.vercel.app/playground)
- **Avalanche Info**: [/avalanche](https://ai-agent-marketplace-2.vercel.app/avalanche)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Avalanche](https://avax.network/) - For the fast, low-cost blockchain infrastructure
- [Core Wallet](https://core.app/) - For seamless wallet integration
- [Next.js](https://nextjs.org/) - For the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) - For beautiful, responsive design

## 📞 Support

- **Documentation**: [/docs](https://ai-agent-marketplace-2.vercel.app/docs)
- **Issues**: [GitHub Issues](https://github.com/lhcee3/ai-agent-marketplace-2/issues)
- **Discord**: [Join our community](#)
- **Email**: support@aiagentmarketplace.com

---

**Built with ❤️ on Avalanche**
