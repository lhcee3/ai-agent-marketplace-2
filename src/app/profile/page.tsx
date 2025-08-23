"use client";

import { useEffect, useState } from "react";
import { fetchMyPurchases, type ListingWithMetadata } from "@/lib/aiAgentMarketplace";
import Link from "next/link";

type EthereumProvider = { request: (args: { method: string; params?: unknown[] }) => Promise<unknown> };

function getEthereum(): EthereumProvider | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { ethereum?: EthereumProvider }).ethereum;
}

function short(addr?: string) {
  return addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : "";
}

export default function ProfilePage() {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ListingWithMetadata[]>([]);
  const [searchedDeep, setSearchedDeep] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const eth = getEthereum();
        if (!eth) return;
        const accounts = (await eth.request({ method: "eth_accounts" })) as string[];
        if (accounts?.[0]) setAddress(accounts[0]);
      } catch {}
    })();
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!address) return;
      setLoading(true);
      try {
        // quick lookback first
        const data = await fetchMyPurchases(address, 10_000);
        if (mounted) setItems(data);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [address]);

  const total = items.length;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-10 md:py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="h3-work-sans text-[32px]">My Profile</h1>
            <p className="body-work-sans text-[#858584]">
              {address ? `Signed in as ${short(address)}` : "Connect your wallet to view purchases."}
            </p>
          </div>
        </div>

        {!address ? (
          <div className="rounded-[20px] bg-[var(--background-secondary)] p-6">
            <div className="body-work-sans mb-3">You’re not connected.</div>
            <button
              className="h-10 px-4 rounded-[14px] bg-cta"
              onClick={async () => {
                const eth = getEthereum();
                if (!eth) return alert("Please install MetaMask or a compatible wallet.");
                try {
                  const accounts = (await eth.request({ method: "eth_requestAccounts" })) as string[];
                  setAddress(accounts?.[0] ?? null);
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <>
            <div className="body-space-mono text-sm text-[#858584] mb-4 flex items-center justify-between">
              <span>{loading ? "Loading…" : `${total} purchased agent${total === 1 ? "" : "s"}`}</span>
              {!loading && (
                <button
                  className="h-8 px-3 rounded-[10px] bg-[var(--background-secondary)]"
                  disabled={searchedDeep}
                  onClick={async () => {
                    if (!address) return;
                    setLoading(true);
                    try {
                      const more = await fetchMyPurchases(address, 100_000);
                      setItems(more);
                      setSearchedDeep(true);
                    } catch (e) {
                      console.error(e);
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  {searchedDeep ? "Searched deep" : "Search deeper"}
                </button>
              )}
            </div>
            {items.length === 0 && !loading ? (
              <div className="rounded-[20px] bg-[var(--background-secondary)] p-6 text-[#858584]">
                No purchases found for {short(address)}. Buy an agent from the Marketplace, then come back here.
              </div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((a) => (
                <div key={a.listingId} className="rounded-[20px] overflow-hidden bg-[var(--background-secondary)]">
                  <div className="relative aspect-square bg-background grid place-items-center overflow-hidden">
                    {a.metadata?.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={a.metadata.image} alt={a.metadata.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-[#858584]">#{a.tokenId}</div>
                    )}
                  </div>
                  <div className="p-6">
                    <Link href={`/profile/agent/${a.nftContract}/${a.tokenId}`} className="h5-work-sans text-[22px] hover:underline">
                      {a.metadata?.name || `Agent #${a.tokenId}`}
                    </Link>
                    <div className="body-space-mono text-sm text-[#858584] mt-1">Bought for {a.priceEth} AVAX</div>
                    {a.metadata?.description && (
                      <p className="body-work-sans text-[#c9c9c9] mt-2 line-clamp-3">{a.metadata.description}</p>
                    )}
                    <div className="mt-3">
                      <Link href={`/chat/${a.nftContract}/${a.tokenId}`} className="h-10 px-4 rounded-[14px] bg-cta inline-flex items-center">
                        Chat
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
