"use client";

import { BrowserProvider, Eip1193Provider, JsonRpcProvider } from "ethers";

export const FUJI_CHAIN_ID_DEC = 43113;
export const FUJI_CHAIN_ID_HEX = "0xa869";

export const FUJI_PARAMS = {
  chainId: FUJI_CHAIN_ID_HEX,
  chainName: "Avalanche Fuji Testnet",
  nativeCurrency: { name: "Avalanche", symbol: "AVAX", decimals: 18 },
  rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
  blockExplorerUrls: ["https://testnet.snowtrace.io/"],
};

export function getEthereum(): Eip1193Provider | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { ethereum?: Eip1193Provider }).ethereum;
}

export function getProvider(): BrowserProvider {
  const eth = getEthereum();
  if (!eth) throw new Error("No wallet detected. Please install MetaMask or a compatible wallet.");
  const anyEth = eth as unknown as Record<string, unknown> & {
    on?: (...args: unknown[]) => unknown;
    off?: (...args: unknown[]) => unknown;
    removeListener?: (...args: unknown[]) => unknown;
    addListener?: (...args: unknown[]) => unknown;
  };
  // Ethers v6 may look for addListener/removeListener; shim them to on/off if missing
  if (typeof anyEth.addListener !== "function" && typeof anyEth.on === "function") {
    anyEth.addListener = anyEth.on.bind(eth);
  }
  if (typeof anyEth.removeListener !== "function" && typeof anyEth.off === "function") {
    anyEth.removeListener = anyEth.off.bind(eth);
  }
  if (typeof anyEth.off !== "function" && typeof anyEth.removeListener === "function") {
    anyEth.off = (anyEth.removeListener as (...args: unknown[]) => unknown).bind(eth);
  }
  return new BrowserProvider(anyEth as unknown as Eip1193Provider);
}

export async function getSigner() {
  const provider = getProvider();
  return provider.getSigner();
}

export async function getChainIdHex(): Promise<string> {
  const eth = getEthereum();
  if (!eth) throw new Error("Wallet not found");
  const id = (await eth.request({ method: "eth_chainId" })) as string;
  return id;
}

export async function ensureFujiNetwork(): Promise<void> {
  const eth = getEthereum();
  if (!eth) throw new Error("Wallet not found");
  const current = (await eth.request({ method: "eth_chainId" })) as string;
  if (current.toLowerCase() === FUJI_CHAIN_ID_HEX) return;
  try {
    await eth.request({ method: "wallet_switchEthereumChain", params: [{ chainId: FUJI_CHAIN_ID_HEX }] });
  } catch (e: unknown) {
    // 4902 = Unrecognized chain, try adding
    const code = (e as { code?: number }).code;
    if (code === 4902) {
      await eth.request({ method: "wallet_addEthereumChain", params: [FUJI_PARAMS] });
    } else {
      throw e;
    }
  }
}

export async function requestAccounts(): Promise<string[]> {
  const eth = getEthereum();
  if (!eth) throw new Error("Wallet not found");
  const accounts = (await eth.request({ method: "eth_requestAccounts" })) as string[];
  return accounts;
}

export function getPublicProvider(): JsonRpcProvider {
  return new JsonRpcProvider(FUJI_PARAMS.rpcUrls[0]);
}
