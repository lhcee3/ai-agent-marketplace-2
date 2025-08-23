// IPFS metadata service for AI Agents
import { NFTMetadata, AgentMetadata } from '@/lib/types';
import axios from 'axios';

export class IPFSService {
  // For demo purposes, we'll use a simple approach
  // In production, you'd integrate with IPFS/Pinata/NFT.Storage
  
  static generateNFTMetadata(agent: AgentMetadata): NFTMetadata {
    return {
      name: agent.name,
      description: agent.description,
      image: agent.image,
      external_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/agents/${agent.id}`,
      agent_endpoint: agent.endpoint,
      attributes: [
        {
          trait_type: "Category",
          value: agent.category
        },
        {
          trait_type: "Price",
          value: `${agent.price} ETH`
        },
        {
          trait_type: "Creator",
          value: agent.creator
        },
        {
          trait_type: "Capabilities Count",
          value: agent.capabilities.length.toString()
        },
        ...agent.capabilities.map(capability => ({
          trait_type: "Capability",
          value: capability
        }))
      ]
    };
  }

  static async uploadToIPFS(metadata: NFTMetadata): Promise<string> {
    // Real Pinata upload with group
    const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
    try {
      const res = await axios.post(url, {
        pinataOptions: {
          pinataApp: "Avalanche"
        },
        pinataContent: metadata
      }, {
        headers: {
          'pinata_api_key': process.env.PINATA_API_KEY!,
          'pinata_secret_api_key': process.env.PINATA_SECRET_API_KEY!,
        },
      });
      return res.data.IpfsHash;
    } catch (error: any) {
      console.error('Pinata upload failed:', error?.response?.data || error);
      throw new Error('Failed to upload metadata to Pinata');
    }
  }

  static getIPFSUrl(hash: string): string {
    return `https://ipfs.io/ipfs/${hash}`;
  }

  static async mintAgentNFT(agent: AgentMetadata): Promise<{
    success: boolean;
    ipfsHash?: string;
    tokenURI?: string;
    error?: string;
  }> {
    try {
      // Generate NFT metadata
      const metadata = this.generateNFTMetadata(agent);
      
      // Upload to IPFS
      const ipfsHash = await this.uploadToIPFS(metadata);
      const tokenURI = this.getIPFSUrl(ipfsHash);
      
      return {
        success: true,
        ipfsHash,
        tokenURI
      };
    } catch (error) {
      console.error('Error minting agent NFT:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
