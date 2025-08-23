"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchRecentMintedAgents, type MintedAgent } from "@/lib/aiAgentNft";

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
  id: string;
  name: string;
  image?: string;
  owner: string;
  category?: string;
  priceEth?: number;
};

export default function MarketplacePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | "all">("all");
  const [sort, setSort] = useState<"popular" | "new" | "priceAsc" | "priceDesc">("popular");
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const [loading, setLoading] = useState(true);
  const [minted, setMinted] = useState<MintedAgent[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const items = await fetchRecentMintedAgents(100);
        if (mounted) setMinted(items);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const data = useMemo(() => {
    let d: UiAgent[] = minted.map((m) => ({
      id: m.tokenId,
      name: m.metadata?.name || `Agent #${m.tokenId}`,
      image: m.metadata?.image,
      owner: m.owner,
    }));
    if (category !== "all") d = d.filter((a) => a.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      d = d.filter((a) => a.name.toLowerCase().includes(q) || a.owner.toLowerCase().includes(q));
    }
    switch (sort) {
      case "priceAsc":
        d.sort((a, b) => (a.priceEth ?? Infinity) - (b.priceEth ?? Infinity));
        break;
      case "priceDesc":
        d.sort((a, b) => (b.priceEth ?? -Infinity) - (a.priceEth ?? -Infinity));
        break;
      case "new":
        d = d.reverse();
        break;
      default:
        break;
    }
    return d;
  }, [category, query, sort, minted]);

  const total = data.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageData = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-10 md:py-12">
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="h3-work-sans text-[38px]">Marketplace</h1>
          <p className="body-work-sans text-[#858584]">Browse and discover AI Agents from top builders.</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch lg:items-center justify-between mb-6">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search agents or builders"
              className="h-12 rounded-[20px] px-4 bg-[var(--background-secondary)] text-white placeholder:text-[#858584] outline-none border border-white/10"
            />
            <select
              value={sort}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSort(e.target.value as typeof sort)}
              className="h-12 rounded-[20px] px-4 bg-[var(--background-secondary)] text-white outline-none border border-white/10"
            >
              <option value="popular">Most Popular</option>
              <option value="new">Newest</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
          <div className="overflow-x-auto no-scrollbar lg:overflow-visible">
            <div className="flex gap-2 lg:flex-wrap">
              <button
                onClick={() => {
                  setCategory("all");
                  setPage(1);
                }}
                className={`px-3 h-10 rounded-[14px] whitespace-nowrap ${
                  category === "all" ? "bg-cta" : "bg-[var(--background-secondary)]"
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
                  className={`px-3 h-10 rounded-[14px] whitespace-nowrap ${
                    category === c ? "bg-cta" : "bg-[var(--background-secondary)]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results summary */}
        <div className="body-space-mono text-sm text-[#858584] mb-4">
          {loading ? "Loading…" : `${total} results${category !== "all" ? ` in ${category}` : ""}`}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageData.map((a) => (
            <div key={a.id} className="rounded-[20px] overflow-hidden bg-[var(--background-secondary)]">
              <div className="relative aspect-square bg-background grid place-items-center overflow-hidden">
                {a.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.image} alt={a.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-[#858584]">{a.name}</div>
                )}
              </div>
              <div className="p-6">
                <div className="h5-work-sans text-[22px]">{a.name}</div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="size-6 rounded-full bg-neutral-500" />
                  <div className="body-work-sans text-[#858584]">{a.owner.slice(0, 6)}…{a.owner.slice(-4)}</div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="body-space-mono text-[#858584]">Price</div>
                    <div className="body-space-mono">—</div>
                  </div>
                  <div className="text-right">
                    <div className="body-space-mono text-[#858584]">Category</div>
                    <div className="body-space-mono">—</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-8">
          <button
            className="h-10 px-4 rounded-[14px] bg-[var(--background-secondary)] disabled:opacity-50"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <div className="body-space-mono text-sm text-[#858584]">
            Page {page} of {totalPages}
          </div>
          <button
            className="h-10 px-4 rounded-[14px] bg-[var(--background-secondary)] disabled:opacity-50"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
}
