"use client";

import { useState } from "react";
import { useMintAgentNFT } from '@/lib/mint-nft-real';

export default function AgentsPage() {
  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    systemPrompt: "",
    walletAddress: "",
  });
  const [ipfsUrl, setIpfsUrl] = useState("");
  const [step, setStep] = useState<'form' | 'mint' | 'done'>('form');
  const { mint, minting, txHash, error } = useMintAgentNFT();
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep('mint');
    setSuccess(null);
    try {
      // Upload metadata to Pinata via backend
      const res = await fetch("/api/nft/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to create agent");
      setIpfsUrl(data.ipfsUrl);
      // Mint NFT using user's wallet
        await mint({
          name: form.name,
          image: form.image,
          description: form.description,
          systemPrompt: form.systemPrompt,
          tokenURI: data.ipfsUrl,
          provider: window.ethereum,
        });
      setStep('done');
      setSuccess(`Agent NFT minted! Transaction: ${txHash}`);
      setForm({ name: "", image: "", description: "", systemPrompt: "", walletAddress: "" });
    } catch (err: any) {
      setStep('form');
      setSuccess(null);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-10 md:py-12">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="h3-work-sans text-[38px]">Create a new AI Agent</h1>
          <p className="body-work-sans text-[#858584] max-w-2xl">
            Provide a name, image URL, description, and an optional system prompt to guide your agent’s behavior.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6 items-start rounded-[20px] bg-[var(--background-secondary)] p-6 md:p-10">
          {/* Preview card */}
          <div className="rounded-[16px] overflow-hidden bg-background">
            <div className="relative aspect-[4/3] grid place-items-center text-[#858584]">
              {form.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.image} alt="Agent" className="object-cover w-full h-full" />
              ) : (
                <span>Image preview</span>
              )}
            </div>
            <div className="p-6">
              <div className="h5-work-sans text-[22px]">{form.name || "Agent Name"}</div>
              <p className="body-work-sans text-[#858584] mt-2 line-clamp-3 min-h-[3.6em]">
                {form.description || "Short description of what your agent does."}
              </p>
            </div>
          </div>

          {/* Form and Minting Steps */}
          {step === 'form' && (
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 body-space-mono text-sm text-[#858584]">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full h-12 rounded-[14px] px-4 bg-background text-white placeholder:text-[#858584] outline-none border border-white/10"
                  placeholder="e.g., Research Scholar"
                />
              </div>
              <div>
                <label className="block mb-2 body-space-mono text-sm text-[#858584]">Image URL</label>
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  required
                  className="w-full h-12 rounded-[14px] px-4 bg-background text-white placeholder:text-[#858584] outline-none border border-white/10"
                  placeholder="https://..."
                />
                <p className="mt-2 text-xs text-[#858584]">Tip: You can also use our placeholders like /api/placeholder/chatbot</p>
              </div>
              <div>
                <label className="block mb-2 body-space-mono text-sm text-[#858584]">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full rounded-[14px] px-4 py-3 bg-background text-white placeholder:text-[#858584] outline-none border border-white/10"
                  placeholder="What can this agent do?"
                />
              </div>
              <div>
                <label className="block mb-2 body-space-mono text-sm text-[#858584]">System Prompt (optional)</label>
                <textarea
                  name="systemPrompt"
                  value={form.systemPrompt}
                  onChange={handleChange}
                  rows={6}
                  className="w-full rounded-[14px] px-4 py-3 bg-background text-white placeholder:text-[#858584] outline-none border border-white/10"
                  placeholder="Instructions that define the agent’s persona and behavior."
                />
              </div>
              <div>
                <label className="block mb-2 body-space-mono text-sm text-[#858584]">Wallet Address</label>
                <input
                  name="walletAddress"
                  value={form.walletAddress}
                  onChange={handleChange}
                  required
                  className="w-full h-12 rounded-[14px] px-4 bg-background text-white placeholder:text-[#858584] outline-none border border-white/10"
                  placeholder="0x..."
                />
              </div>
              {error && (
                <div className="rounded-[12px] border border-red-500/40 bg-red-500/10 text-red-300 px-4 py-3">
                  {error}
                </div>
              )}
              {success && (
                <div className="rounded-[12px] border border-green-500/40 bg-green-500/10 text-green-300 px-4 py-3">
                  {success}
                </div>
              )}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={minting}
                  className="inline-flex items-center justify-center h-12 px-6 rounded-[20px] bg-cta disabled:opacity-60"
                >
                  {minting ? "Minting…" : "Create Agent & Mint NFT"}
                </button>
                <a href="/marketplace" className="inline-flex items-center justify-center h-12 px-6 rounded-[20px] bg-background">
                  Cancel
                </a>
              </div>
            </form>
          )}
          {step === 'mint' && (
            <div>
              <p>Minting NFT... Please confirm the transaction in your wallet.</p>
              {minting && <p>Waiting for confirmation...</p>}
              {error && <p className="text-red-600">{error}</p>}
            </div>
          )}
          {step === 'done' && (
            <div>
              <p className="text-green-600 font-bold">Agent NFT Minted!</p>
              <p>Transaction Hash: <a href={`https://testnet.snowtrace.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">{txHash}</a></p>
              <p>IPFS Metadata: <a href={ipfsUrl} target="_blank" rel="noopener noreferrer">{ipfsUrl}</a></p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
