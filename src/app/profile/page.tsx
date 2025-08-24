"use client";

import { useEffect, useState } from "react";
import { fetchMyPurchases, getListingFeeWei, listAgentForSale, type ListingWithMetadata } from "@/lib/aiAgentMarketplace";
import Link from "next/link";
import ConnectWallet from "../../components/ConnectWallet";
import { ensureFujiNetwork, requestAccounts } from "@/lib/eth";
import { formatEther } from "ethers";

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
  const [resellKey, setResellKey] = useState<string | null>(null);
  const [resellPrice, setResellPrice] = useState<string>("");
  const [resellLoading, setResellLoading] = useState(false);
  const [listingFeeEth, setListingFeeEth] = useState<string | null>(null);

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
    <main className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-black text-foreground pt-24">
      {/* Floating Navbar */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-7xl">
        <div className="relative mx-auto px-6 md:px-8 py-4 flex items-center justify-between rounded-3xl bg-black/10 backdrop-blur-2xl border border-white/20 shadow-2xl hover:shadow-blue-500/20 hover:bg-black/20 transition-all duration-500 group overflow-hidden">
          {/* Enhanced Glassmorphism Background Layers */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-blue-600/5 rounded-3xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 rounded-3xl" />
          <div className="absolute inset-0 backdrop-blur-3xl rounded-3xl" />
          {/* Animated Gradient Border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
          {/* Content */}
          <div className="relative z-10 flex items-center justify-between w-full">
            <Link href="/" className="flex items-center group/logo">
              <div className="h5-space-mono text-[22px] text-white group-hover/logo:text-blue-100 transition-colors duration-300">Synaptica</div>
            </Link>
            <nav className="hidden md:flex items-center gap-8 h5-work-sans text-[16px]">
              <Link className="text-blue-400 hover:text-white hover:bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm transition-all duration-300 font-semibold" href="/marketplace">Marketplace</Link>
              <Link className="text-blue-200 hover:text-white hover:bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm transition-all duration-300" href="/create">Create</Link>
              <div className="relative">
                <ConnectWallet />
              </div>
            </nav>
            <button className="md:hidden inline-flex items-center justify-center size-12 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/30 hover:bg-white/20 hover:border-white/50 hover:scale-110 transition-all duration-300 shadow-lg">
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-1.5">
                <div className="w-5 h-0.5 bg-white rounded-full" />
                <div className="w-5 h-0.5 bg-white rounded-full" />
                <div className="w-5 h-0.5 bg-white rounded-full" />
              </div>
            </button>
          </div>
          {/* Bottom Glow Effect */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </header>
  <section className="relative px-6 md:px-10 lg:px-16 xl:px-24 py-10 md:py-12">
        <div className="flex flex-col gap-3 mb-8">
          <h1 className="h3-work-sans text-[38px] bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">My Profile</h1>
          <p className="body-work-sans text-blue-200/80 text-lg">
            {address ? `Signed in as ${short(address)}` : "Connect your wallet to view purchases."}
          </p>
        </div>

        {!address ? (
          <div className="rounded-3xl bg-blue-950/30 backdrop-blur-sm border border-blue-400/20 p-8 text-blue-300/80 shadow-lg">
            <div className="body-work-sans mb-3 text-lg">You’re not connected.</div>
            <button
              className="h-12 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:scale-105"
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
            <div className="body-space-mono text-sm text-blue-300/70 mb-6 px-2 flex items-center justify-between">
              <span>{loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  Loading…
                </div>
              ) : `${total} purchased agent${total === 1 ? "" : "s"}`}</span>
              {!loading && (
                <button
                  className="h-8 px-3 rounded-2xl bg-blue-950/50 text-blue-200 border border-blue-400/20 font-medium transition-all duration-300 hover:bg-blue-900/50"
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
              <div className="rounded-3xl bg-blue-950/30 backdrop-blur-sm border border-blue-400/20 p-8 text-blue-300/80 shadow-lg">
                No purchases found for {short(address)}. Buy an agent from the Marketplace, then come back here.
              </div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((a) => (
                <div key={a.listingId} className="group rounded-3xl overflow-hidden bg-blue-950/30 backdrop-blur-sm border border-blue-400/20 hover:border-blue-400/40 hover:bg-blue-950/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20">
                  <div className="relative aspect-square bg-gradient-to-br from-blue-900/50 to-blue-950/50 grid place-items-center overflow-hidden">
                    {a.metadata?.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={a.metadata.image} alt={a.metadata.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="text-blue-300/70 text-lg font-medium">#{a.tokenId}</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <Link href={`/profile/agent/${a.nftContract}/${a.tokenId}`} className="h5-work-sans text-[22px] text-white group-hover:text-blue-200 transition-colors duration-300 hover:underline">
                      {a.metadata?.name || `Agent #${a.tokenId}`}
                    </Link>
                    <div className="body-space-mono text-sm text-blue-300/80 mt-1">Bought for {a.priceEth} AVAX</div>
                    {a.metadata?.description && (
                      <p className="body-work-sans text-blue-200/80 mt-2 line-clamp-3">{a.metadata.description}</p>
                    )}
                    <div className="mt-3 flex gap-3 flex-wrap items-center">
                      <Link href={`/chat/${a.nftContract}/${a.tokenId}`} className="h-10 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:scale-105 inline-flex items-center">
                        Chat
                      </Link>
                      <button
                        className="h-10 px-4 rounded-2xl bg-blue-950/50 text-blue-200 border border-blue-400/20 font-medium transition-all duration-300 hover:bg-blue-900/50"
                        disabled={resellLoading}
                        onClick={async () => {
                          const key = `${a.nftContract}:${a.tokenId}`;
                          setResellKey(key);
                          setResellPrice("");
                          try {
                            const fee = await getListingFeeWei();
                            setListingFeeEth(formatEther(fee));
                          } catch {
                            setListingFeeEth(null);
                          }
                        }}
                      >
                        Resell
                      </button>
                    </div>

                    {resellKey === `${a.nftContract}:${a.tokenId}` && (
                      <div className="mt-3 p-3 rounded-2xl border border-blue-400/20 bg-blue-950/50">
                        <div className="body-space-mono text-sm text-blue-300/80 mb-2">
                          {listingFeeEth ? `Listing fee: ${listingFeeEth} AVAX` : `Listing fee applies`}
                        </div>
                        <div className="grid grid-cols-[1fr_auto_auto] gap-2 items-center">
                          <input
                            className="h-10 rounded-2xl px-3 bg-blue-950/70 text-white outline-none border border-blue-400/20"
                            placeholder="Price in AVAX"
                            inputMode="decimal"
                            value={resellPrice}
                            onChange={(e) => setResellPrice(e.target.value)}
                          />
                          <button
                            disabled={resellLoading || !resellPrice}
                            onClick={async () => {
                              try {
                                setResellLoading(true);
                                await ensureFujiNetwork();
                                await requestAccounts();
                                const tx = await listAgentForSale(a.nftContract, a.tokenId, resellPrice);
                                await tx.wait();
                                alert("Listed on marketplace");
                                setResellKey(null);
                                setResellPrice("");
                              } catch (e) {
                                console.error(e);
                                alert("Failed to list");
                              } finally {
                                setResellLoading(false);
                              }
                            }}
                            className="h-10 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold disabled:opacity-60"
                          >
                            {resellLoading ? "Listing…" : "Confirm"}
                          </button>
                          <button
                            disabled={resellLoading}
                            onClick={() => { setResellKey(null); setResellPrice(""); }}
                            className="h-10 px-4 rounded-2xl bg-blue-950/50 text-blue-200 border border-blue-400/20 font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
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