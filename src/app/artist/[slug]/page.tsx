import React from "react";

type Props = { params: { slug: string } };

export default function ArtistPage({ params }: Props) {
  const name = decodeURIComponent(params.slug).replace(/-/g, " ");

  return (
    <main className="bg-background text-foreground">
      {/* Banner */}
      <section className="w-full h-[280px] md:h-[360px] bg-[var(--background-secondary)]" />

      {/* Profile */}
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 -mt-20 relative">
        <div className="flex flex-col md:flex-row md:items-end gap-6">
          <div className="size-32 md:size-40 rounded-[20px] bg-neutral-500 border-4 border-background" />
          <div className="flex-1 pb-4">
            <h1 className="h3-work-sans text-[32px] md:text-[38px]">{name || "Orbitian"}</h1>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl">
              <div>
                <div className="body-space-mono text-[#858584]">Volume</div>
                <div className="h4-space-mono text-[28px]">9,999 ETH</div>
              </div>
              <div>
                <div className="body-space-mono text-[#858584]">Agents Deployed</div>
                <div className="h4-space-mono text-[28px]">3.4K</div>
              </div>
              <div>
                <div className="body-space-mono text-[#858584]">Followers</div>
                <div className="h4-space-mono text-[28px]">42K</div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 pb-4">
            <a href="#follow" className="inline-flex items-center h-12 px-6 rounded-[20px] bg-cta">Follow</a>
            <a href="#share" className="inline-flex items-center h-12 px-6 rounded-[20px] bg-[var(--background-secondary)]">Share</a>
          </div>
        </div>
      </section>

      {/* Bio & Links */}
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <div className="h5-work-sans text-[22px] mb-2">Bio</div>
            <p className="body-work-sans text-[#858584] max-w-prose">
              {name || "Orbitian"} builds and deploys autonomous AI agents. Their portfolio spans multiple industries with production-grade agentic apps and custom marketplaces.
            </p>
          </div>
          <div>
            <div className="h5-work-sans text-[22px] mb-2">Links</div>
            <div className="flex gap-3">
              <div className="size-10 rounded-full bg-[var(--background-secondary)]" />
              <div className="size-10 rounded-full bg-[var(--background-secondary)]" />
              <div className="size-10 rounded-full bg-[var(--background-secondary)]" />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="flex items-center gap-6 border-b border-white/10 overflow-x-auto">
          {[
            { t: "Created", n: 302 },
            { t: "Owned", n: 67 },
            { t: "Collection", n: 4 },
          ].map((tab, i) => (
            <button key={tab.t} className={`relative py-4 px-1 h5-work-sans ${i === 0 ? 'text-white' : 'text-[#858584]'} whitespace-nowrap`}>
              {tab.t}
              <span className={`ml-2 body-space-mono text-sm px-2 py-0.5 rounded-full ${i === 0 ? 'bg-white/10 text-white' : 'bg-white/5 text-[#858584]'}`}>{tab.n}</span>
              {i === 0 && <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-cta" />}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="rounded-[20px] overflow-hidden bg-[var(--background-secondary)]">
              <div className="relative aspect-square grid place-items-center text-[#858584]">Artwork #{i + 1}</div>
              <div className="p-6">
                <div className="h5-work-sans text-[22px]">Mystic Cube #{i + 1}</div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="size-6 rounded-full bg-neutral-500" />
                  <div className="body-work-sans text-[#858584]">{name || "Orbitian"}</div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="body-space-mono text-[#858584]">Price</div>
                    <div className="body-space-mono">{(0.2 + i * 0.03).toFixed(2)} ETH</div>
                  </div>
                  <div className="text-right">
                    <div className="body-space-mono text-[#858584]">Highest Bid</div>
                    <div className="body-space-mono">{(0.1 + i * 0.02).toFixed(2)} wETH</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
