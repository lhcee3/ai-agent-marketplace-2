"use client";

import { useState } from "react";
import { ensureFujiNetwork, requestAccounts } from "@/lib/eth";
import { AI_AGENT_NFT_ADDRESS, getWriteContract } from "@/lib/aiAgentNft";

export default function CreateAgentPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [image, setImage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [tokenId, setTokenId] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
  // Ensure network and wallet access
      await ensureFujiNetwork();
  await requestAccounts();

      // Build metadata and pin to IPFS (Pinata)
      const metadata = {
        name,
        description,
        image,
        attributes: [
          { trait_type: "systemPrompt", value: systemPrompt },
        ],
      };
      const pinRes = await fetch("/api/pinata/pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(metadata),
      });
      if (!pinRes.ok) {
        const { error: em } = await pinRes.json().catch(() => ({ error: "Pin failed" }));
        throw new Error(typeof em === "string" ? em : "Pinning failed");
      }
      const { uri } = (await pinRes.json()) as { cid: string; uri: string };

      // Mint on-chain
      const contract = await getWriteContract();
      const tx = await contract.mintAgent(name, image, description, systemPrompt, uri);
      setTxHash(tx.hash);
      const receipt = await tx.wait();
      // Read tokenId from events (Transfer event from 0x0 -> minter)
      let mintedId: string | null = null;
      for (const log of receipt.logs ?? []) {
        if (log.address?.toLowerCase?.() !== AI_AGENT_NFT_ADDRESS.toLowerCase()) continue;
        try {
          const parsed = contract.interface.parseLog({ data: log.data, topics: log.topics });
          if (parsed?.name === "Transfer") {
            const id = parsed.args?.tokenId?.toString?.();
            if (id) { mintedId = id; break; }
          }
        } catch {}
      }
      setTokenId(mintedId);
      // Optionally clear form after success
      setName("");
      setDescription("");
      setSystemPrompt("");
      setImage("");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to create agent. Please try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="h1-work-sans text-[36px] md:text-[44px]">Create AI Agent</h1>
            <p className="body-work-sans text-white/80 mt-2 max-w-prose">
              Provide details for your agent. You can edit and publish after creation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
            {/* Form */}
            <form onSubmit={onSubmit} className="rounded-[20px] bg-[var(--background-secondary)] p-6 md:p-8">
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="block body-space-mono text-sm text-[#c9c9c9] mb-2">Name</label>
                  <input
                    className="h-12 w-full rounded-[16px] px-4 bg-background text-white placeholder:text-[#858584] outline-none border border-white/10"
                    placeholder="e.g. SupportBot Pro"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block body-space-mono text-sm text-[#c9c9c9] mb-2">Description</label>
                  <textarea
                    className="min-h-28 w-full rounded-[16px] p-4 bg-background text-white placeholder:text-[#858584] outline-none border border-white/10"
                    placeholder="What does your agent do?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block body-space-mono text-sm text-[#c9c9c9] mb-2">System Prompt</label>
                  <textarea
                    className="min-h-40 w-full rounded-[16px] p-4 bg-background text-white placeholder:text-[#858584] outline-none border border-white/10"
                    placeholder="You are a helpful AI assistant specialized in..."
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block body-space-mono text-sm text-[#c9c9c9] mb-2">Image URL</label>
                  <input
                    className="h-12 w-full rounded-[16px] px-4 bg-background text-white placeholder:text-[#858584] outline-none border border-white/10"
                    placeholder="https://..."
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                  <p className="mt-2 text-xs text-[#858584]">Paste a link to a hosted image (PNG, JPG, SVG).</p>
                </div>

                {error && (
                  <div className="rounded-[14px] border border-red-400/40 bg-red-400/10 text-red-200 p-3 body-space-mono text-sm">
                    {error}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="h-12 px-6 rounded-[20px] bg-cta text-white inline-flex items-center justify-center disabled:opacity-60"
                  >
                    {submitting ? "Creating..." : "Create Agent"}
                  </button>
                </div>
              </div>
            </form>

            {/* Preview */}
            <aside className="rounded-[20px] bg-[var(--background-secondary)] p-6 md:p-8">
              <div className="h5-work-sans text-[20px] mb-4">Preview</div>
              <div className="space-y-4">
                <div className="aspect-square w-full rounded-[16px] bg-background grid place-items-center overflow-hidden">
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image} alt="Agent preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-[#858584] body-work-sans">Image preview</div>
                  )}
                </div>
                <div>
                  <div className="h5-work-sans text-[22px]">{name || "Agent Name"}</div>
                  <p className="body-work-sans text-[#c9c9c9] mt-1 line-clamp-5">
                    {description || "A short description about your agent will appear here."}
                  </p>
                </div>
              </div>
            </aside>
          </div>

          {(txHash || tokenId) && (
            <div className="mt-6 rounded-[20px] bg-[var(--background-secondary)] p-6 md:p-8">
              <div className="h5-work-sans text-[20px] mb-2">Agent created successfully</div>
              <div className="space-y-2 body-space-mono text-sm text-[#c9c9c9]">
                {tokenId && (
                  <div>
                    Token ID: <span className="text-white">{tokenId}</span>
                  </div>
                )}
                {txHash && (
                  <div>
                    Tx: {" "}
                    <a
                      className="text-cta hover:underline"
                      target="_blank"
                      rel="noreferrer"
                      href={`https://testnet.snowtrace.io/tx/${txHash}`}
                    >
                      View on Snowtrace ↗
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
