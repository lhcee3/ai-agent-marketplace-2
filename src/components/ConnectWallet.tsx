"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, handler: (...args: unknown[]) => void) => void;
};

declare global {
  interface Window { ethereum?: EthereumProvider }
}

function short(addr?: string) {
  return addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : "";
}

export default function ConnectWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [authAddress, setAuthAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    })();
    const handler = (accs: unknown) => {
      const a = Array.isArray(accs) ? (accs as string[]) : [];
      setAddress(a?.[0] ?? null);
      // If wallet account changes, require re-auth
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
    if (!window.ethereum) {
      alert("No wallet detected. Please install MetaMask or a compatible EVM wallet.");
      return;
    }
    try {
  const accounts = (await window.ethereum.request({ method: "eth_requestAccounts" })) as string[];
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
  const signature = (await window.ethereum.request({
        method: "personal_sign",
        params: [message, address],
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
    <div className="flex items-center gap-2">
      <button
        disabled={loading}
        onClick={onClick}
        className="ml-2 inline-flex items-center h-10 px-4 rounded-[20px] bg-cta disabled:opacity-60"
      >
        {loading ? "Please wait…" : statusLabel}
      </button>
      {isAuthenticated && (
        <button
          onClick={logout}
          className="hidden md:inline-flex items-center h-10 px-3 rounded-[14px] bg-[var(--background-secondary)]"
        >
          Logout
        </button>
      )}
    </div>
  );
}
