// Web3 utilities for SYNAPTICA marketplace
// This file provides utilities for interacting with smart contracts on Avalanche

import { 
  AVALANCHE_CONFIG, 
  formatAddress,
  formatAvax,
  getExplorerUrl 
} from './contracts';
import { EthereumProvider, getEthereumProvider } from '../types/ethereum';

// Types for marketplace items
export interface MarketplaceItem {
  itemId: number;
  tokenId: number;
  seller: string;
  price: string; // In wei
  sold: boolean;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
  agent_type?: string;
  api_endpoint?: string;
  creator?: string;
}

// Simplified Web3 utilities for basic operations
export class Web3Utils {
  private provider: EthereumProvider | null = null;

  // Initialize Web3 connection
  async init(): Promise<EthereumProvider> {
    if (typeof window === 'undefined') {
      throw new Error('Web3 can only be used in browser environment');
    }

    const ethereum = getEthereumProvider();
    if (!ethereum) {
      throw new Error('No Web3 provider found. Please install Core Wallet or MetaMask.');
    }

    this.provider = ethereum;
    return this.provider;
  }

  // Get current account
  async getCurrentAccount(): Promise<string | null> {
    if (!this.provider) await this.init();
    if (!this.provider) return null;
    
    try {
      const accounts = await this.provider.request({ 
        method: 'eth_accounts' 
      }) as string[];
      return accounts[0] || null;
    } catch (error) {
      console.error('Error getting current account:', error);
      return null;
    }
  }

  // Request account access
  async requestAccounts(): Promise<string[]> {
    if (!this.provider) await this.init();
    if (!this.provider) throw new Error('Provider not initialized');
    
    try {
      const accounts = await this.provider.request({ 
        method: 'eth_requestAccounts' 
      }) as string[];
      return accounts;
    } catch (error) {
      console.error('Error requesting accounts:', error);
      throw error;
    }
  }

  // Check if on correct network
  async checkNetwork(): Promise<boolean> {
    if (!this.provider) await this.init();
    if (!this.provider) return false;
    
    try {
      const chainId = await this.provider.request({ 
        method: 'eth_chainId' 
      }) as string;
      return chainId === AVALANCHE_CONFIG.CHAIN_HEX;
    } catch (error) {
      console.error('Error checking network:', error);
      return false;
    }
  }

  // Switch to Avalanche network
  async switchToAvalanche(): Promise<boolean> {
    if (!this.provider) await this.init();
    if (!this.provider) return false;
    
    try {
      await this.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: AVALANCHE_CONFIG.CHAIN_HEX }],
      });
      return true;
    } catch (switchError: unknown) {
      // Network not added, try to add it
      if (switchError && typeof switchError === 'object' && 'code' in switchError && switchError.code === 4902) {
        try {
          await this.provider.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: AVALANCHE_CONFIG.CHAIN_HEX,
              chainName: AVALANCHE_CONFIG.NETWORK_NAME,
              nativeCurrency: {
                name: AVALANCHE_CONFIG.CURRENCY_SYMBOL,
                symbol: AVALANCHE_CONFIG.CURRENCY_SYMBOL,
                decimals: AVALANCHE_CONFIG.CURRENCY_DECIMALS,
              },
              rpcUrls: [AVALANCHE_CONFIG.RPC_URL],
              blockExplorerUrls: [AVALANCHE_CONFIG.EXPLORER_URL],
            }],
          });
          return true;
        } catch (addError) {
          console.error('Error adding Avalanche network:', addError);
          return false;
        }
      } else {
        console.error('Error switching to Avalanche network:', switchError);
        return false;
      }
    }
  }

  // Get AVAX balance
  async getBalance(address: string): Promise<string> {
    if (!this.provider) await this.init();
    if (!this.provider) return '0.0000';
    
    try {
      const balance = await this.provider.request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      }) as string;
      
      // Convert from wei to AVAX (simplified conversion)
      const avaxBalance = parseInt(balance, 16) / Math.pow(10, 18);
      return avaxBalance.toFixed(4);
    } catch (error) {
      console.error('Error getting balance:', error);
      return '0.0000';
    }
  }

  // Sign a message
  async signMessage(message: string, address: string): Promise<string> {
    if (!this.provider) await this.init();
    if (!this.provider) throw new Error('Provider not initialized');
    
    try {
      const hexMessage = '0x' + Buffer.from(message, 'utf8').toString('hex');
      const signature = await this.provider.request({
        method: 'personal_sign',
        params: [hexMessage, address],
      }) as string;
      return signature;
    } catch (error) {
      console.error('Error signing message:', error);
      throw error;
    }
  }
}

// Simplified contract utilities
export class ContractUtils {
  private web3Utils: Web3Utils;

  constructor() {
    this.web3Utils = new Web3Utils();
  }

  // Prepare for contract interaction
  async prepare(): Promise<void> {
    await this.web3Utils.init();
    
    const isCorrectNetwork = await this.web3Utils.checkNetwork();
    if (!isCorrectNetwork) {
      const switched = await this.web3Utils.switchToAvalanche();
      if (!switched) {
        throw new Error('Please switch to Avalanche network to interact with contracts');
      }
    }
  }

  // Mock contract interactions for demonstration
  async mintNFT(to: string, tokenId: number, metadataUri: string): Promise<string> {
    await this.prepare();
    console.log('Minting NFT:', { to, tokenId, metadataUri });
    
    // Return mock transaction hash
    return '0x' + Math.random().toString(16).substr(2, 64);
  }

  async listNFT(tokenId: number, priceInAvax: string): Promise<string> {
    await this.prepare();
    console.log('Listing NFT:', { tokenId, priceInAvax });
    
    // Return mock transaction hash
    return '0x' + Math.random().toString(16).substr(2, 64);
  }

  async purchaseNFT(itemId: number, priceInAvax: string): Promise<string> {
    await this.prepare();
    console.log('Purchasing NFT:', { itemId, priceInAvax });
    
    // Return mock transaction hash
    return '0x' + Math.random().toString(16).substr(2, 64);
  }

  async getMarketplaceItems(): Promise<MarketplaceItem[]> {
    await this.prepare();
    
    // Return mock marketplace items
    return [
      {
        itemId: 1,
        tokenId: 1,
        seller: '0x742d35Cc6635C0532925a3b8D591D2127fB8F8F8',
        price: '5000000000000000000', // 5 AVAX in wei
        sold: false
      }
    ];
  }
}

// IPFS utilities for metadata storage
export class IPFSUtils {
  static async uploadMetadata(metadata: NFTMetadata): Promise<string> {
    // Mock IPFS upload for demonstration
    console.log('Uploading metadata to IPFS:', metadata);
    
    // Return mock IPFS hash
    const mockHash = 'Qm' + Math.random().toString(36).substr(2, 44);
    return mockHash;
  }

  static async fetchMetadata(ipfsHash: string): Promise<NFTMetadata | null> {
    try {
      // In production, this would fetch from IPFS gateway
      const response = await fetch(`https://ipfs.io/ipfs/${ipfsHash}`);
      if (!response.ok) throw new Error('Failed to fetch metadata');
      return await response.json() as NFTMetadata;
    } catch (error) {
      console.error('Error fetching IPFS metadata:', error);
      return null;
    }
  }
}

// Export instances for use in components
export const web3Utils = new Web3Utils();
export const contractUtils = new ContractUtils();

// Re-export utility functions
export { formatAddress, formatAvax, getExplorerUrl };
