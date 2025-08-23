"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ConnectWallet from "../../components/ConnectWallet";
import { fetchAvailableListings, type ListingWithMetadata, buyListing } from "@/lib/aiAgentMarketplace";

const CATEGORIES = [
  "Customer Support",
  "Sales & Outreach",
  "Research & Summarization",
  "Code Assistant",
  "Data Analysis",
  "Marketing & Social",
  "DevOps & Infra",
  "Finance & Ops",
] as const;

type UiAgent = {
  listingId: string;
  tokenId: string;
  name: string;
  image?: string;
  owner: string;
  priceEth: string;
  nftContract: string;
  priceWei: string;
};

export default function MarketplacePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | "all">("all");
  const [sort, setSort] = useState<"popular" | "new" | "priceAsc" | "priceDesc">("popular");
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<ListingWithMetadata[]>([]);
  const [buyingId, setBuyingId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
  const items = await fetchAvailableListings();
  if (mounted) setListings(items);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  function ipfsToHttp(url?: string) {
    if (!url) return url;
    if (url.startsWith("ipfs://")) {
      return url.replace("ipfs://", "https://ipfs.io/ipfs/");
    }
    return url;
  }

  const data = useMemo(() => {
    let d: UiAgent[] = listings.map((m) => ({
      listingId: m.listingId,
      tokenId: m.tokenId,
      name: m.metadata?.name || `Agent #${m.tokenId}`,
      image: ipfsToHttp(m.metadata?.image),
      owner: m.seller,
      priceEth: m.priceEth,
      nftContract: m.nftContract,
      priceWei: m.priceWei,
    }));
  // Category filtering not wired yet; keep 'all' for now
    if (query.trim()) {
      const q = query.toLowerCase();
      d = d.filter((a) => a.name.toLowerCase().includes(q) || a.owner.toLowerCase().includes(q));
    }
    switch (sort) {
      case "priceAsc":
        d.sort((a, b) => Number(a.priceEth) - Number(b.priceEth));
        break;
      case "priceDesc":
        d.sort((a, b) => Number(b.priceEth) - Number(a.priceEth));
        break;
      case "new":
        d = d.reverse();
        break;
      default:
        break;
    }
    return d;
  }, [query, sort, listings]);

  const total = data.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageData = data.slice((page - 1) * pageSize, page * pageSize);

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

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" 
               style={{
                 backgroundImage: `
                   linear-gradient(rgba(38, 167, 245, 0.1) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(38, 167, 245, 0.1) 1px, transparent 1px)
                 `,
                 backgroundSize: '50px 50px'
               }}
          />
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-60"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 23) % 100}%`,
                animationDelay: `${(i * 0.1) % 3}s`,
                animationDuration: `${2 + (i % 3)}s`
              }}
            />
          ))}
        </div>
      </div>

      <section className="relative px-6 md:px-10 lg:px-16 xl:px-24 py-10 md:py-12">
        <div className="flex flex-col gap-3 mb-8">
          <h1 className="h3-work-sans text-[38px] bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">Marketplace</h1>
          <p className="body-work-sans text-blue-200/80 text-lg">Browse and discover AI Agents from top builders.</p>
        </div>

        {/* Enhanced Controls */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch lg:items-center justify-between mb-8 p-6 rounded-3xl bg-black/20 backdrop-blur-xl border border-blue-500/20">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
            <div className="relative group">
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search agents or builders..."
                className="h-12 w-full rounded-2xl px-6 bg-blue-950/50 text-white placeholder:text-blue-300/60 outline-none border border-blue-400/30 focus:border-blue-400/60 focus:bg-blue-950/70 transition-all duration-300 backdrop-blur-sm"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-blue-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <select
              value={sort}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSort(e.target.value as typeof sort)}
              className="h-12 rounded-2xl px-6 bg-blue-950/50 text-white outline-none border border-blue-400/30 focus:border-blue-400/60 hover:bg-blue-950/70 transition-all duration-300 backdrop-blur-sm"
            >
              <option value="popular">Most Popular</option>
              <option value="new">Newest</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
          <div className="overflow-x-auto no-scrollbar lg:overflow-visible">
            <div className="flex gap-3 lg:flex-wrap">
              <button
                onClick={() => {
                  setCategory("all");
                  setPage(1);
                }}
                className={`px-4 h-10 rounded-2xl whitespace-nowrap font-medium transition-all duration-300 ${
                  category === "all" 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
                    : "bg-blue-950/50 text-blue-200 hover:bg-blue-900/50 border border-blue-400/20"
                }`}
              >
                All
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCategory(c);
                    setPage(1);
                  }}
                  className={`px-4 h-10 rounded-2xl whitespace-nowrap font-medium transition-all duration-300 ${
                    category === c 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
                      : "bg-blue-950/50 text-blue-200 hover:bg-blue-900/50 border border-blue-400/20"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results summary */}
        <div className="body-space-mono text-sm text-blue-300/70 mb-6 px-2">
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              Loading…
            </div>
          ) : (
            `${total} results${category !== "all" ? ` in ${category}` : ""}`
          )}
        </div>

        {/* Enhanced Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pageData.map((a) => (
            <div key={a.listingId} className="group rounded-3xl overflow-hidden bg-blue-950/30 backdrop-blur-sm border border-blue-400/20 hover:border-blue-400/40 hover:bg-blue-950/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="relative aspect-square bg-gradient-to-br from-blue-900/50 to-blue-950/50 grid place-items-center overflow-hidden">
                {a.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.image} alt={a.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="text-blue-300/70 text-lg font-medium">{a.name}</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <div className="h5-work-sans text-[22px] text-white group-hover:text-blue-200 transition-colors duration-300">{a.name}</div>
                <div className="flex items-center gap-3 mt-3">
                  <div className="size-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-md" />
                  <div className="body-work-sans text-blue-300/80">{a.owner.slice(0, 6)}…{a.owner.slice(-4)}</div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="body-space-mono text-blue-400/70 mb-1">Price</div>
                    <div className="body-space-mono text-white font-semibold">{a.priceEth} AVAX</div>
                  </div>
                  <div className="text-right">
                    <div className="body-space-mono text-blue-400/70 mb-1">Category</div>
                    <div className="body-space-mono text-blue-300">—</div>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    disabled={buyingId === a.listingId}
                    onClick={async () => {
                      try {
                        setBuyingId(a.listingId);
                        const tx = await buyListing(a.listingId, a.priceWei);
                        await tx.wait();
                        // Refresh listings
                        const items = await fetchAvailableListings();
                        setListings(items);
                      } catch (e) {
                        console.error(e);
                        alert("Purchase failed");
                      } finally {
                        setBuyingId(null);
                      }
                    }}
                    className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:scale-105"
                  >
                    {buyingId === a.listingId ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Buying…
                      </div>
                    ) : (
                      "Buy"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Pagination */}
        <div className="flex items-center justify-between mt-12 p-6 rounded-3xl bg-black/20 backdrop-blur-xl border border-blue-500/20">
          <button
            className="h-12 px-6 rounded-2xl bg-blue-950/50 text-blue-200 border border-blue-400/30 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-900/50 hover:border-blue-400/50 transition-all duration-300"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            ← Previous
          </button>
          <div className="body-space-mono text-sm text-blue-300/80 px-4 py-2 rounded-xl bg-blue-950/30">
            Page {page} of {totalPages}
          </div>
          <button
            className="h-12 px-6 rounded-2xl bg-blue-950/50 text-blue-200 border border-blue-400/30 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-900/50 hover:border-blue-400/50 transition-all duration-300"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next →
          </button>
        </div>
      </section>
    </main>
  );
}
