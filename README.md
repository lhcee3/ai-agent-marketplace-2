# 🤖 Synaptica - AI Agent Marketplace

A decentralized marketplace for AI agents built on Avalanche blockchain, featuring NFT-based ownership, secure authentication, and interactive chat interfaces.

---

## What is Synaptica?
Synaptica is a decentralized web application that lets users create, own, buy, sell, and interact with AI agents as NFTs on the Avalanche blockchain. It combines blockchain technology, secure wallet authentication, and interactive AI chat interfaces to create a marketplace for digital agents.

## Features (Detailed)

### 1. Wallet Integration & Authentication
- Connect MetaMask or compatible Web3 wallet
- Authenticate via cryptographic message signing (no passwords)
- All transactions (minting, buying, selling) are signed and executed from the user's wallet

### 2. AI Agent Creation & Minting
- Create custom AI agents: name, description, avatar image, system prompt
- Mint agents as ERC-721 NFTs on Avalanche Fuji testnet
- Pay AVAX for gas fees
- Store agent metadata on IPFS for decentralization

### 3. Marketplace for AI Agents
- List agents for sale, set price in AVAX
- Browse all available agents with metadata, price, seller info
- Buy agents directly, transferring NFT ownership on-chain

### 4. Interactive Chat Interface
- Owners chat with their AI agents using built-in chat UI
- Agents respond based on their system prompt and capabilities
- Chat history and context maintained for personalized interactions

### 5. User Profiles & Dashboard
- Profile page shows owned and purchased agents
- Dashboard includes statistics (agents, purchases, sales) and recent activity
- Manage listings, view transaction history, access account settings

### 6. Secure Authentication & Session Management
- Wallet-based authentication using cryptographic signatures
- Secure session management, no passwords or sensitive data stored

### 7. Real-time Updates & State Management
- Marketplace and profile pages update dynamically
- React hooks and context for efficient state management

### 8. Glassmorphism & Modern UI/UX
- Frosted glass effects, gradients, backdrop blurs
- Responsive layouts for desktop, tablet, mobile
- Floating navigation bar, smooth transitions, micro-interactions

### 9. Analytics & Activity Tracking
- View statistics about activity, agent performance, marketplace trends
- Activity feed shows recent actions (minting, buying, selling, chatting)

### 10. IPFS Integration
- Agent metadata and images stored on IPFS
- App converts IPFS URLs to HTTP for browser compatibility

---

## Technical Details
- Frontend: Next.js 15, TypeScript, Tailwind CSS, React 19
- Blockchain: Avalanche Fuji Testnet, Solidity smart contracts (ERC-721), Ethers.js
- Backend: Next.js API routes for authentication, NFT operations, IPFS integration
- Smart Contracts: Custom contracts for agent minting, marketplace listing, transfers
- Storage: IPFS for agent metadata and images
- Security: Wallet-based authentication, input validation, error boundaries
- Performance: Turbopack, code splitting, image optimization
- Testing: ESLint, TypeScript type checking

---

## Example User Flow
1. Connect Wallet: Click "Connect Wallet" and sign in with MetaMask
2. Create Agent: Fill out agent details and mint as NFT
3. List for Sale: List agent on marketplace, set price
4. Buy Agent: Purchase agent, transfer ownership
5. Chat: Owner chats with agent via profile dashboard
6. Manage Profile: View stats, activity, manage agents

---

## Why is Synaptica Unique?
- Combines AI and blockchain for true digital ownership of intelligent agents
- Decentralized, censorship-resistant, user-controlled
- Modern, beautiful UI with advanced design and responsive features
- Secure, passwordless authentication and transaction management

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 15.5.0 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Icons**: Heroicons (SVG)
- **State Management**: React hooks and context

### Blockchain
- **Network**: Avalanche Fuji Testnet
- **Smart Contracts**: Solidity
- **Web3 Library**: Ethers.js 6.15.0
- **Development**: Hardhat 3.0.1

### Development Tools
- **Linting**: ESLint 9 with Next.js config
- **Build Tool**: Turbopack (Next.js)
- **Package Manager**: npm/yarn/pnpm

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm
- MetaMask or compatible Web3 wallet
- Avalanche Fuji testnet AVAX for transactions

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lhcee3/ai-agent-marketplace-2.git
   cd ai-agent-marketplace-2
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Setup

Create a `.env.local` file in the root directory:
```env
# Add your environment variables here
NEXT_PUBLIC_CHAIN_ID=43113
NEXT_PUBLIC_RPC_URL=https://api.avax-test.network/ext/bc/C/rpc
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── chat/          # Chat functionality
│   │   ├── nft/           # NFT operations
│   │   └── pinata/        # IPFS integration
│   ├── artist/            # Artist profile pages
│   ├── chat/              # Chat interface
│   ├── create/            # AI agent creation
│   ├── docs/              # Documentation
│   ├── marketplace/       # Marketplace browsing
│   └── profile/           # User dashboard
├── components/            # Reusable React components
│   └── ConnectWallet.tsx  # Wallet connection component
├── lib/                   # Utility libraries
│   ├── aiAgentMarketplace.ts
│   ├── aiAgentNft.ts
│   ├── eth.ts
│   └── mint-nft-real.ts
contracts/                 # Smart contracts
├── AiAgentMarketplace.sol
└── AiAgentNFT.sol
public/                    # Static assets
└── README.md
```

## 🎮 Usage Guide

### 1. Connect Your Wallet
- Click "Connect Wallet" in the navigation
- Approve the connection in MetaMask
- Sign the authentication message

### 2. Create an AI Agent
- Navigate to "Create" page
- Fill in agent details (name, description, capabilities)
- Upload avatar image
- Mint as NFT (requires AVAX for gas fees)

### 3. Browse Marketplace
- Explore available AI agents
- View detailed agent profiles
- Purchase agents with AVAX

### 4. Chat with Agents
- Access owned agents from your profile
- Start conversations in the chat interface
- Enjoy personalized AI interactions

### 5. Manage Profile
- View your statistics and activity
- Monitor owned and created agents
- Access account settings

## 🔧 Key Components

### ConnectWallet Component
- Handles wallet connection and authentication
- Manages user session state
- Provides secure sign-in flow

### Profile Dashboard
- User statistics and analytics
- Activity feed with recent actions
- Quick access to main features
- Account settings and preferences

### Artist Pages
- Public profiles for each user
- Wallet address-based routing
- Clean, minimal design focus

### Chat Interface
- Real-time conversations with AI agents
- Message history and context
- Responsive design for all devices

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) to Purple (#8B5CF6) gradients
- **Background**: Black (#000000) with transparency layers
- **Text**: White (#FFFFFF) with various opacity levels
- **Accents**: Blue-200, Purple-400, Green-400, Yellow-400

### Typography
- **Headings**: Space Mono font family
- **Body**: Work Sans font family
- **Display**: Gradient text effects with bg-clip-text

### Effects
- **Glassmorphism**: backdrop-blur-xl with transparent backgrounds
- **Animations**: Smooth transitions and hover effects
- **Shadows**: Layered shadow effects with color variants

## 🔒 Security Features

- **Wallet Authentication**: Cryptographic signature verification
- **Session Management**: Secure token-based sessions
- **Input Validation**: Type-safe form handling
- **Error Boundaries**: Graceful error handling

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Adaptive layouts for tablets
- **Desktop Enhanced**: Full feature set on desktop
- **Touch Friendly**: Large tap targets and gestures

## 🚀 Performance Optimizations

- **Next.js 15**: Latest framework with automatic optimizations
- **Turbopack**: Fast development builds
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Tree Shaking**: Unused code elimination

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 📦 Build and Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🛠️ Development Notes

### Next.js 15 Compatibility
- Uses React 19 with concurrent features
- Async params handled with React.use()
- App Router with server/client components

### Blockchain Integration
- Avalanche Fuji testnet deployment
- ERC-721 NFT standards
- Gas-optimized smart contracts

### Performance Considerations
- Lazy loading for heavy components
- Optimized asset delivery
- Efficient re-rendering patterns

## 📞 Support

For support, email [support@synaptica.ai](mailto:support@synaptica.ai) or create an issue in the GitHub repository.

## 🎯 Roadmap

- [ ] Mobile app development
- [ ] AI model training integration
- [ ] Cross-chain compatibility
- [ ] Advanced chat features
- [ ] Marketplace analytics
- [ ] Social features and communities

---

**Built with ❤️ by the Synaptica Team**
