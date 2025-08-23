// TypeScript definitions for Ethereum providers

export interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, handler: (...args: unknown[]) => void) => void;
  isAvalanche?: boolean;
  isMetaMask?: boolean;
}

export interface WindowWithEthereum extends Window {
  ethereum?: EthereumProvider;
  avalanche?: EthereumProvider;
}

// Helper function to get ethereum provider
export function getEthereumProvider(): EthereumProvider | null {
  if (typeof window === 'undefined') return null;
  const windowWithEth = window as WindowWithEthereum;
  return windowWithEth.ethereum || windowWithEth.avalanche || null;
}

// Helper function to check if ethereum is available
export function isEthereumAvailable(): boolean {
  return getEthereumProvider() !== null;
}
