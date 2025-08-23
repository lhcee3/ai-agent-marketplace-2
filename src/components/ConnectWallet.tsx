"use client";

import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";

function ProfileDropdown({ address, onLogout }: { address: string; onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[var(--background-secondary)] hover:bg-gray-200 focus:outline-none"
        aria-label="Profile"
      >
        {/* Simple profile icon (SVG) */}
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4" fill="#888" />
          <rect x="6" y="16" width="12" height="4" rx="2" fill="#888" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
          <a
            href={`/artist/${address}`}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            My Profile
          </a>
          <button
            onClick={() => { setOpen(false); onLogout(); }}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, handler: (...args: unknown[]) => void) => void;
  isAvalanche?: boolean;
  isMetaMask?: boolean;
};

declare global {
  interface Window { 
    ethereum?: EthereumProvider;
    avalanche?: EthereumProvider;
  }
}

// Avalanche C-Chain configuration
const AVALANCHE_CHAIN_ID = '0xa86a'; // 43114 in hex
const AVALANCHE_NETWORK = {
  chainId: AVALANCHE_CHAIN_ID,
  chainName: 'Avalanche Network',
  nativeCurrency: {
    name: 'AVAX',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://snowtrace.io/'],
};

function short(addr?: string) {
  return addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : "";
}

export default function ConnectWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [authAddress, setAuthAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // Detect existing connection and auth
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (window.ethereum) {
          const accounts = (await window.ethereum.request({ method: "eth_accounts" })) as string[];
          if (mounted && accounts?.[0]) setAddress(accounts[0]);
        }
      } catch {}
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (mounted && data?.authenticated && data.address) setAuthAddress(data.address);
      } catch {}
      setInitializing(false);
    })();
    const handler = (accs: unknown) => {
      const a = Array.isArray(accs) ? (accs as string[]) : [];
      setAddress(a?.[0] ?? null);
      setAuthAddress(null);
    };
    if (window.ethereum?.on) {
      window.ethereum.on("accountsChanged", handler);
    }
    return () => {
      mounted = false;
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener("accountsChanged", handler as (...args: unknown[]) => void);
      }
    };
  }, []);

  const isConnected = !!address;
  const isAuthenticated = !!authAddress;

  const connect = useCallback(async () => {
    // Try Core Wallet first (for Avalanche), then fallback to other wallets
    const provider = window.avalanche || window.ethereum;
    
    if (!provider) {
      alert("No wallet detected. Please install Core Wallet (https://core.app/) or MetaMask.");
      return;
      const [initializing, setInitializing] = useState(true);
    }

    try {
      // Check if we're on Avalanche network, if not, try to switch
      try {
        const chainId = await provider.request({ method: 'eth_chainId' });
        if (chainId !== AVALANCHE_CHAIN_ID) {
          try {
            await provider.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: AVALANCHE_CHAIN_ID }],
            });
          } catch (switchError: unknown) {
            // If network doesn't exist, add it
            if (switchError && typeof switchError === 'object' && 'code' in switchError && switchError.code === 4902) {
              await provider.request({
                method: 'wallet_addEthereumChain',
                params: [AVALANCHE_NETWORK],
              });
            }
          }
        }
      } catch (networkError) {
        console.warn('Could not switch to Avalanche network:', networkError);
      }

      const accounts = (await provider.request({ method: "eth_requestAccounts" })) as string[];
      setAddress(accounts?.[0] ?? null);
    } catch (e: unknown) {
      console.error(e);
      const msg = e instanceof Error ? e.message : "Failed to connect wallet";
      alert(msg);
    }
  }, []);

  const signIn = useCallback(async () => {
    if (!window.ethereum || !address) return;
    setLoading(true);
    try {
      const nr = await fetch("/api/auth/nonce", { method: "POST" });
      const { nonce } = await nr.json();
      const ts = new Date().toISOString();
      const message = `AI Agent Marketplace wants you to sign in\n\nAddress: ${address}\nNonce: ${nonce}\nTimestamp: ${ts}`;
      const hexMessage = '0x' + Buffer.from(message, 'utf8').toString('hex');
      const signature = (await window.ethereum.request({
        method: "personal_sign",
        params: [hexMessage, address],
      })) as string;
      const resp = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, signature, nonce, ts }),
      });
      if (!resp.ok) throw new Error("Verification failed");
      const data = await resp.json();
      setAuthAddress(data?.address ?? address);
    } catch (e: unknown) {
      console.error(e);
      const msg = e instanceof Error ? e.message : "Sign-in failed";
      alert(msg);
    } finally {
      setLoading(false);
    }
  }, [address]);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setAuthAddress(null);
      // Also clear local connection state so button shows "Connect Wallet"
      setAddress(null);
    } catch {}
  }, []);

  const statusLabel = useMemo(() => {
    if (!isConnected) return "Connect Wallet";
    if (!isAuthenticated) return `Sign In ${short(address ?? undefined)}`;
    return short(authAddress ?? undefined);
  }, [isConnected, isAuthenticated, address, authAddress]);

  const onClick = useCallback(() => {
    if (!isConnected) return connect();
    if (!isAuthenticated) return signIn();
  }, [isConnected, isAuthenticated, connect, signIn]);


  return (
    <div className="flex items-center gap-2 relative">
      {initializing ? (
        <div className="ml-2 h-10 flex items-center">
          <svg className="animate-spin h-6 w-6 text-gray-400" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <span className="ml-2 text-gray-400">Loading...</span>
        </div>
      ) : (
        <>
          <button
            disabled={loading}
            onClick={onClick}
            className="ml-2 inline-flex items-center h-10 px-4 rounded-[20px] bg-cta disabled:opacity-60"
          >
            {loading ? "Please wait…" : statusLabel}
          </button>
          {isAuthenticated && (
            <ProfileDropdown address={authAddress ?? address ?? ""} onLogout={logout} />
          )}
        </>
      )}
    </div>
  );
}