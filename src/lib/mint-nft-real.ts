import { AI_AGENT_NFT_ABI, SMART_CONTRACTS } from '@/config/contracts';
import { useState } from 'react';

// React hook for agent NFT minting with user's wallet
export function useMintAgentNFT() {
  const [minting, setMinting] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Mint NFT using user's wallet
  const mint = async ({ name, image, description, systemPrompt, tokenURI, provider, contractAddress }: {
    name: string;
    image: string;
    description: string;
    systemPrompt: string;
    tokenURI: string;
    provider: any;
    contractAddress?: string;
  }) => {
    setMinting(true);
    setError(null);
    setTxHash(null);
    try {
      if (!provider) throw new Error('No wallet provider found');
      const ethersImport = await import('ethers');
      const { BrowserProvider, Contract, parseUnits } = ethersImport;
      const signer = await new BrowserProvider(provider).getSigner();
      const address = contractAddress || SMART_CONTRACTS.AI_AGENT_NFT;
      const contract = new Contract(address, AI_AGENT_NFT_ABI, signer);
      // Estimate gas fees automatically, fallback if zero or undefined
      const feeData = await signer.provider.getFeeData();
      const maxFeePerGas = feeData.maxFeePerGas && feeData.maxFeePerGas > 0 ? feeData.maxFeePerGas : parseUnits('50', 'gwei');
      const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas && feeData.maxPriorityFeePerGas > 0 ? feeData.maxPriorityFeePerGas : parseUnits('2', 'gwei');
      const tx = await contract.mintAgent(
        name,
        image,
        description,
        systemPrompt,
        tokenURI,
        {
          gasLimit: 500000,
          maxFeePerGas,
          maxPriorityFeePerGas
        }
      );
      await tx.wait();
      setTxHash(tx.hash);

      // Store NFT metadata in MongoDB
      await fetch('/api/nft/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tokenId: tx.hash, // or use a real tokenId if available
          name,
          image,
          description,
          systemPrompt,
          tokenURI,
          owner: await signer.getAddress(),
          txHash: tx.hash
        })
      });

      return { txHash: tx.hash };
    } catch (err: any) {
      setError(err.message || 'Minting failed');
      throw err;
    } finally {
      setMinting(false);
    }
  };

  return { mint, minting, txHash, error };
}

// Standalone utility for non-hook usage
export async function mintAgentNFTWithUserWallet({ walletAddress, tokenURI, provider, contractAddress }: {
  walletAddress: string;
  tokenURI: string;
  provider: any;
  contractAddress?: string;
}): Promise<{ txHash: string; tokenId: string }> {
  if (!provider) throw new Error('No wallet provider found');
  const ethersImport = await import('ethers');
  const { BrowserProvider, Contract, toBigInt, parseUnits } = ethersImport;
  const signer = await new BrowserProvider(provider).getSigner();
  const address = contractAddress || SMART_CONTRACTS.AI_AGENT_NFT;
  const contract = new Contract(address, AI_AGENT_NFT_ABI, signer);
  const tokenId = toBigInt(Date.now()).toString();
  // Estimate gas fees automatically, fallback if zero or undefined
  const feeData = await signer.provider.getFeeData();
  const maxFeePerGas = feeData.maxFeePerGas && feeData.maxFeePerGas > 0 ? feeData.maxFeePerGas : parseUnits('50', 'gwei');
  const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas && feeData.maxPriorityFeePerGas > 0 ? feeData.maxPriorityFeePerGas : parseUnits('2', 'gwei');
  const tx = await contract.mint(
    walletAddress,
    tokenId,
    tokenURI,
    {
      gasLimit: 500000,
      maxFeePerGas,
      maxPriorityFeePerGas
    }
  );
  await tx.wait();

  // Store NFT metadata in MongoDB
  await fetch('/api/nft/agents', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tokenId,
      tokenURI,
      owner: walletAddress,
      txHash: tx.hash
    })
  });

  return { txHash: tx.hash, tokenId };
}
