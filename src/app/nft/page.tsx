"use client";

// Temporary assets from Figma Dev Mode export (localhost served). Replace with real images as needed.
const IMG_BG = "http://localhost:3845/assets/9acf2677568b38bc98ba36dbd43c768c40de6716.png";

export default function AgentLanding() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <div className="space-y-6">
            <h1 className="h1-work-sans text-[42px] md:text-[51px] xl:text-[67px] tracking-tight">
              Discover, deploy, and trade AI Agents
            </h1>
            <p className="body-work-sans text-[16px] md:text-[22px] text-[#ffffff]/80 max-w-prose">
              AI Agent marketplace UI created with Next.js and Tailwind, matching your Figma template styles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#explore"
                className="inline-flex items-center justify-center h-12 px-6 rounded-[20px] bg-cta text-white h5-work-sans text-[16px] md:text-[22px]"
              >
                Get Started
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center h-12 px-6 rounded-[20px] bg-[var(--background-secondary)] text-white h5-work-sans text-[16px] md:text-[22px]"
              >
                How it works
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { v: "240k+", l: "Total Sale" },
                { v: "100k+", l: "Auctions" },
                { v: "240k+", l: "Artists" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl">
                  <div className="h4-space-mono text-[28px]">{s.v}</div>
                  <div className="body-work-sans text-[16px] text-[#858584]">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Card */}
          <div className="rounded-[20px] overflow-hidden bg-[var(--background-secondary)]">
            <div className="relative aspect-[4/3] w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG_BG} alt="Featured" className="object-cover w-full h-full" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-neutral-500" />
                <div className="body-work-sans">Space Walking</div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="caption body-space-mono text-[#858584]">Price</div>
                  <div className="body-space-mono">1.63 ETH</div>
                </div>
                <div className="text-right">
                  <div className="caption body-space-mono text-[#858584]">Highest Bid</div>
                  <div className="body-space-mono">0.33 wETH</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
