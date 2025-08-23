
export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
  {/* Navbar is now global in RootLayout */}

      {/* Hero */}
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="h1-work-sans text-[42px] md:text-[51px] xl:text-[67px] tracking-tight">
              Discover, deploy, and trade AI Agents
            </h1>
            <p className="body-work-sans text-[16px] md:text-[22px] text-white/80 max-w-prose">
              Launch and monetize AI agents and chatbots for support, sales, research, and more. browse top builders, live demos, and transparent pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a href="#explore" className="inline-flex items-center justify-center h-12 px-6 rounded-[20px] bg-cta text-white h5-work-sans text-[16px] md:text-[22px]">
                Get Started
              </a>
              <a href="#how" className="inline-flex items-center justify-center h-12 px-6 rounded-[20px] bg-[var(--background-secondary)] text-white h5-work-sans text-[16px] md:text-[22px]">
                How it works
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-4">
              {[
                { v: "240k+", l: "Total Sale" },
                { v: "100k+", l: "Auctions" },
                { v: "240k+", l: "Artists" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="h4-space-mono text-[28px]">{s.v}</div>
                  <div className="body-work-sans text-[16px] text-[#858584]">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[20px] overflow-hidden bg-[var(--background-secondary)]">
            <div className="relative aspect-[4/3]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0" />
              <div className="absolute inset-0 grid place-items-center text-[#858584]">Featured Artwork</div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-neutral-500" />
                <div className="body-work-sans">Space Walking</div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="body-space-mono text-[#858584]">Price</div>
                  <div className="body-space-mono">1.63 ETH</div>
                </div>
                <div className="text-right">
                  <div className="body-space-mono text-[#858584]">Highest Bid</div>
                  <div className="body-space-mono">0.33 wETH</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

  {/* Trending Agents */}
      <section id="trending" className="px-6 md:px-10 lg:px-16 xl:px-24 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
    <h2 className="h2-work-sans h3-work-sans text-[38px]">Trending Agents</h2>
    <p className="body-work-sans text-[#858584]">Check out our weekly updated trending agents.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-[20px] overflow-hidden">
      <div className="aspect-square rounded-[20px] bg-[var(--background-secondary)]" />
              <div className="mt-4">
                <div className="h5-work-sans text-[22px]">Collection #{i}</div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="size-6 rounded-full bg-neutral-500" />
                  <div className="body-work-sans text-[#858584]">by Artist</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Creators */}
      <section id="creators" className="px-6 md:px-10 lg:px-16 xl:px-24 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="h3-work-sans text-[38px]">Top creators</h2>
            <p className="body-work-sans text-[#858584]">Checkout Top Rated Creators on the AI Agent Marketplace</p>
          </div>
          <a className="hidden md:inline-flex items-center h-12 px-6 rounded-[20px] bg-[var(--background-secondary)]" href="#">
            View Rankings
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div key={idx} className="rounded-[20px] bg-[var(--background-secondary)] p-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute -left-3 -top-3 size-6 grid place-items-center rounded-full bg-background text-[#858584] text-xs border border-white/10">
                    {idx + 1}
                  </div>
                  <div className="size-16 rounded-full bg-neutral-500" />
                </div>
                <div>
                  <div className="h5-work-sans text-[22px]">Creator #{idx + 1}</div>
                  <div className="body-space-mono text-[#858584]">Total Sales: <span className="text-white">{(34.5 - idx * 0.9).toFixed(2)} ETH</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-12">
        <h2 className="h3-work-sans text-[38px] mb-8">Browse AI Agent Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "Customer Support",
            "Sales & Outreach",
            "Research & Summarization",
            "Code Assistant",
            "Data Analysis",
            "Marketing & Social",
            "DevOps & Infra",
            "Finance & Ops",
          ].map((cat) => (
            <div key={cat} className="rounded-[20px] overflow-hidden bg-[var(--background-secondary)]">
              <div className="relative aspect-[4/3] grid place-items-center text-[#858584]">{cat} image</div>
              <div className="p-4 h5-work-sans text-[22px]">{cat}</div>
            </div>
          ))}
        </div>
      </section>

  {/* Discover More AI Agents */}
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="h3-work-sans text-[38px]">Discover More AI Agents</h2>
            <p className="body-work-sans text-[#858584]">Explore new trending AI Agents</p>
          </div>
          <a className="hidden md:inline-flex items-center h-12 px-6 rounded-[20px] bg-[var(--background-secondary)]" href="#">
            See All
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-[20px] overflow-hidden bg-[var(--background-secondary)]">
              <div className="relative aspect-square grid place-items-center text-[#858584]">Agent #{i + 1}</div>
              <div className="p-6">
                <div className="h5-work-sans text-[22px]">AstroFiction #{i + 1}</div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="size-6 rounded-full bg-neutral-500" />
                  <div className="body-work-sans text-[#858584]">MoonDancer</div>
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

      {/* Highlight / Live Auction */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cta to-background-secondary opacity-30" />
        <div className="relative px-6 md:px-10 lg:px-16 xl:px-24 py-16">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-[20px] bg-white/10 backdrop-blur body-space-mono mb-6">Live Auction</div>
            <h3 className="h3-work-sans text-[38px]">We are a community-driven marketplace</h3>
            <p className="body-work-sans text-white/80 mt-2 max-w-prose">Bid on unique digital assets with transparent ownership and creator royalties.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <a href="#bid" className="inline-flex items-center h-12 px-6 rounded-[20px] bg-cta">Place a bid</a>
              <a href="#view" className="inline-flex items-center h-12 px-6 rounded-[20px] bg-background">View item</a>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="px-6 md:px-10 lg:px-16 xl:px-24 py-12">
        <h2 className="h3-work-sans text-[38px] mb-8">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { t: "Setup your wallet", d: "Set up your wallet of choice. Connect it to the AI Agent marketplace by clicking the wallet icon." },
            { t: "Create collection", d: "Upload your work and setup your collection. Add a description, social links and floor price." },
            { t: "Start earning", d: "Choose between auctions, fixed-price listings, and declining-price listings." },
          ].map((s) => (
            <div key={s.t} className="rounded-[20px] bg-[var(--background-secondary)] p-6">
              <div className="size-16 rounded-full bg-cta/30 grid place-items-center mb-4" />
              <div className="h5-work-sans text-[22px] mb-2">{s.t}</div>
              <p className="body-work-sans text-[#858584]">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subscribe */}
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-12">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6 items-center rounded-[20px] bg-[var(--background-secondary)] p-6 md:p-10">
          <div className="relative aspect-[3/2] md:aspect-[4/3] rounded-[16px] bg-background grid place-items-center text-[#858584]">Newsletter image</div>
          <div>
            <h3 className="h3-work-sans text-[38px]">Join our weekly digest</h3>
            <p className="body-work-sans text-[#858584] mt-2">Get exclusive promotions & updates straight to your inbox.</p>
            <form className="mt-6 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
              <input className="h-12 rounded-[20px] px-4 bg-background text-white placeholder:text-[#858584] outline-none border border-white/10" placeholder="Enter your email" />
              <button type="submit" className="h-12 rounded-[20px] px-6 bg-cta">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-8 border-t border-white/10">
        <div className="px-6 md:px-10 lg:px-16 xl:px-24 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-md bg-cta" />
              <div className="h5-space-mono text-[22px]">AI Agent Marketplace</div>
            </div>
            <p className="body-work-sans text-[#858584] mt-4">The world’s first and largest digital marketplace for intelligent agents and autonomous AI capabilities.</p>
          </div>
          <div>
            <div className="h5-work-sans text-[22px] mb-4">Explore</div>
            <ul className="space-y-2 text-[#858584]">
              <li><a href="#">Marketplace</a></li>
              <li><a href="#">Rankings</a></li>
              <li><a href="#">Connect a wallet</a></li>
            </ul>
          </div>
          <div>
            <div className="h5-work-sans text-[22px] mb-4">Join our community</div>
            <div className="flex gap-3">
              <div className="size-9 rounded-full bg-[var(--background-secondary)]" />
              <div className="size-9 rounded-full bg-[var(--background-secondary)]" />
              <div className="size-9 rounded-full bg-[var(--background-secondary)]" />
              <div className="size-9 rounded-full bg-[var(--background-secondary)]" />
            </div>
          </div>
        </div>
  <div className="px-6 md:px-10 lg:px-16 xl:px-24 py-6 text-[#858584] border-t border-white/10 body-space-mono text-sm">© {new Date().getFullYear()} AI Agent Marketplace. All rights reserved.</div>
      </footer>
    </main>
  );
}
