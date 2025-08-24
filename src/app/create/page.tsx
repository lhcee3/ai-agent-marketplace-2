"use client";

import { useState, ChangeEvent } from "react";
import Link from "next/link";
import ConnectWallet from "../../components/ConnectWallet";
import { ensureFujiNetwork, requestAccounts } from "@/lib/eth";
import { AI_AGENT_NFT_ADDRESS, getWriteContract } from "@/lib/aiAgentNft";
import { AI_AGENT_MARKETPLACE_ADDRESS, getListingFeeWei, listAgentForSale } from "@/lib/aiAgentMarketplace";

function ipfsToHttp(url?: string) {
  if (!url) return url;
  if (url.startsWith("ipfs://")) {
    return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  }
  return url;
}

export default function CreateAgentPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  // Handle image file upload to Pinata
  const handleImageUpload = async () => {
    if (!imageFile) {
      setError("No image file selected");
      return;
    }
    setError(null);
    setUploading(true);
    setUploadProgress(0);
    try {
      const formData = new FormData();
      formData.append("file", imageFile);

      // Use XMLHttpRequest for progress
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/pinata/upload");
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            setUploadProgress(Math.round((event.loaded / event.total) * 100));
          }
        };
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const { uri } = JSON.parse(xhr.responseText);
              setImage(uri);
              setUploadProgress(100);
              setShowToast(true);
              setTimeout(() => setShowToast(false), 2000);
              resolve();
            } catch {
              setError("Image upload failed");
              reject();
            }
          } else {
            setError("Image upload failed");
            reject();
          }
        };
        xhr.onerror = () => {
          setError("Image upload failed");
          reject();
        };
        xhr.send(formData);
      });
    } catch (err) {
      setError("Image upload failed");
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(null), 1500);
    }
  };

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [tokenId, setTokenId] = useState<string | null>(null);
  const [listAfterMint, setListAfterMint] = useState(false);
  const [priceEth, setPriceEth] = useState("");
  const [listingFeeEth, setListingFeeEth] = useState<string | null>(null);

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
      // Optionally list on marketplace
      if (listAfterMint && mintedId) {
        // fetch fee
        try {
          const fee = await getListingFeeWei();
          setListingFeeEth((Number(fee) / 1e18).toString());
        } catch {}
        if (!priceEth) throw new Error("Enter a price to list");
        const ltx = await listAgentForSale(AI_AGENT_NFT_ADDRESS, mintedId, priceEth);
        await ltx.wait();
      }

      // Clear form after success
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
    <main className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-black text-foreground font-sans pt-24">
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
              <Link className="text-blue-200 hover:text-white hover:bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm transition-all duration-300" href="/marketplace">Marketplace</Link>
              <Link className="text-blue-400 hover:text-white hover:bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm transition-all duration-300 font-semibold" href="/create">Create</Link>
              <Link className="text-blue-200 hover:text-white hover:bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm transition-all duration-300" href="/docs">Docs</Link>
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
          {Array.from({ length: 15 }).map((_, i) => (
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

      <section className="relative px-6 md:px-10 lg:px-16 xl:px-24 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h1 className="h1-work-sans text-[36px] md:text-[44px] bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">Create AI Agent</h1>
            <p className="body-work-sans text-blue-200/80 mt-3 max-w-prose text-lg">
              Provide details for your agent. You can edit and publish after creation.
            </p>
          </div>

          {showToast && (
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-2xl shadow-lg backdrop-blur-sm border border-green-400/30 animate-fade-in">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Image uploaded successfully!
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            {/* Enhanced Form */}
            <form onSubmit={onSubmit} className="rounded-3xl bg-blue-950/30 backdrop-blur-xl border border-blue-400/20 p-8 md:p-10 hover:border-blue-400/30 transition-all duration-300">
              <div className="grid grid-cols-1 gap-7">
                <div>
                  <label className="block body-space-mono text-sm text-blue-300/80 mb-3 font-medium">Name</label>
                  <input
                    className="h-14 w-full rounded-2xl px-6 bg-blue-950/50 text-white placeholder:text-blue-300/60 outline-none border border-blue-400/30 focus:border-blue-400/60 focus:bg-blue-950/70 transition-all duration-300 backdrop-blur-sm"
                    placeholder="e.g. SupportBot Pro"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block body-space-mono text-sm text-blue-300/80 mb-3 font-medium">Description</label>
                  <textarea
                    className="min-h-32 w-full rounded-2xl p-6 bg-blue-950/50 text-white placeholder:text-blue-300/60 outline-none border border-blue-400/30 focus:border-blue-400/60 focus:bg-blue-950/70 transition-all duration-300 backdrop-blur-sm resize-none"
                    placeholder="What does your agent do?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block body-space-mono text-sm text-blue-300/80 mb-3 font-medium">System Prompt</label>
                  <textarea
                    className="min-h-44 w-full rounded-2xl p-6 bg-blue-950/50 text-white placeholder:text-blue-300/60 outline-none border border-blue-400/30 focus:border-blue-400/60 focus:bg-blue-950/70 transition-all duration-300 backdrop-blur-sm resize-none"
                    placeholder="You are a helpful AI assistant specialized in..."
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block body-space-mono text-sm text-blue-300/80 mb-3 font-medium">Agent Image</label>
                  <div
                    className={`relative w-full rounded-2xl border-2 border-dashed transition-all duration-300 bg-blue-950/30 backdrop-blur-sm flex flex-col items-center justify-center py-10 cursor-pointer hover:bg-blue-950/50 ${
                      imageFile 
                        ? 'border-blue-400/60 bg-blue-950/40' 
                        : 'border-blue-400/40 hover:border-blue-400/60'
                    }`}
                    onClick={() => !uploading && document.getElementById('agent-image-input')?.click()}
                    onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
                    onDrop={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (uploading) return;
                      const file = e.dataTransfer.files?.[0];
                      if (file && file.type.startsWith('image/')) {
                        setImageFile(file);
                      }
                    }}
                  >
                    <input
                      id="agent-image-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={onImageChange}
                      disabled={uploading}
                    />
                    {!imageFile ? (
                      <>
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center">
                            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16v-8m0 0-3 3m3-3 3 3" />
                              <rect width="20" height="20" x="2" y="2" strokeWidth="2" rx="6" />
                            </svg>
                          </div>
                          <div className="text-center">
                            <span className="text-blue-200 text-base font-medium">Drag & drop or click to select image</span>
                            <p className="text-blue-300/60 text-sm mt-1">PNG, JPG, SVG up to 5MB</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <div className="aspect-square w-36 rounded-2xl bg-blue-950/50 border border-blue-400/30 overflow-hidden shadow-lg">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={URL.createObjectURL(imageFile)}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          className="text-sm text-red-400 hover:text-red-300 underline transition-colors duration-200"
                          onClick={e => { e.stopPropagation(); setImageFile(null); }}
                          disabled={uploading}
                        >
                          Remove Image
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-6">
                    <button
                      type="button"
                      className="h-12 px-8 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold inline-flex items-center justify-center disabled:opacity-60 shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 disabled:hover:scale-100"
                      onClick={handleImageUpload}
                      disabled={!imageFile || uploading}
                    >
                      {uploading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Uploading...
                        </span>
                      ) : "Upload to IPFS"}
                    </button>
                    {uploadProgress !== null && (
                      <div className="flex-1 max-w-40">
                        <div className="w-full bg-blue-950/50 rounded-full h-3 overflow-hidden border border-blue-400/30">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-blue-300/70 mt-1">{uploadProgress}% uploaded</p>
                      </div>
                    )}
                  </div>
                  {image && (
                    <div className="mt-4 p-4 rounded-2xl bg-blue-950/40 border border-blue-400/20">
                      <p className="text-xs text-blue-300/80 font-mono break-all">
                        <span className="text-blue-200 font-semibold">IPFS URI:</span> {image}
                      </p>
                    </div>
                  )}
                </div>

                {/* Enhanced Marketplace Listing Option */}
                <div className="mt-4 rounded-2xl border border-blue-400/30 bg-blue-950/20 backdrop-blur-sm p-6">
                  <label className="flex items-center gap-4 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={listAfterMint}
                        onChange={(e) => setListAfterMint(e.target.checked)}
                      />
                      <div className={`w-6 h-6 rounded-lg border-2 transition-all duration-300 ${
                        listAfterMint 
                          ? 'bg-blue-600 border-blue-600' 
                          : 'border-blue-400/50 hover:border-blue-400/80'
                      }`}>
                        {listAfterMint && (
                          <svg className="w-4 h-4 text-white absolute top-0.5 left-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="body-work-sans text-blue-200 font-medium">List on marketplace after mint</span>
                  </label>
                  {listAfterMint && (
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 mt-6 p-6 rounded-2xl bg-blue-950/30 border border-blue-400/20">
                      <div>
                        <label className="block body-space-mono text-sm text-blue-300/80 mb-3 font-medium">Price (AVAX)</label>
                        <input
                          className="h-14 w-full rounded-2xl px-6 bg-blue-950/50 text-white placeholder:text-blue-300/60 outline-none border border-blue-400/30 focus:border-blue-400/60 focus:bg-blue-950/70 transition-all duration-300 backdrop-blur-sm"
                          placeholder="0.1"
                          inputMode="decimal"
                          value={priceEth}
                          onChange={(e) => setPriceEth(e.target.value)}
                          required
                        />
                        {listingFeeEth && (
                          <p className="mt-3 text-sm text-blue-300/70 bg-blue-950/30 px-4 py-2 rounded-xl border border-blue-400/20">
                            <span className="font-semibold">Listing fee:</span> {listingFeeEth} AVAX
                          </p>
                        )}
                        <p className="mt-2 text-xs text-blue-300/60 font-mono">
                          Marketplace: {AI_AGENT_MARKETPLACE_ADDRESS.slice(0,6)}…{AI_AGENT_MARKETPLACE_ADDRESS.slice(-4)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="rounded-2xl border border-red-400/40 bg-red-400/10 backdrop-blur-sm text-red-200 p-6 body-space-mono text-sm">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{error}</span>
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="h-14 px-10 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold inline-flex items-center justify-center disabled:opacity-60 shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 disabled:hover:scale-100"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating Agent...
                      </span>
                    ) : "Create Agent"}
                  </button>
                </div>
              </div>
            </form>

            {/* Enhanced Preview */}
            <aside className="rounded-3xl bg-blue-950/30 backdrop-blur-xl border border-blue-400/20 p-8 md:p-10 hover:border-blue-400/30 transition-all duration-300">
              <div className="h5-work-sans text-[20px] mb-6 text-blue-200 font-semibold">Live Preview</div>
              <div className="space-y-6">
                <div className="aspect-square w-full rounded-2xl bg-blue-950/50 border border-blue-400/30 grid place-items-center overflow-hidden shadow-lg">
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={ipfsToHttp(image)} alt="Agent preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center mx-auto mb-3">
                        <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="text-blue-300/70 body-work-sans">Image preview</div>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <div className="h5-work-sans text-[22px] text-white">{name || "Agent Name"}</div>
                  <p className="body-work-sans text-blue-200/80 leading-relaxed line-clamp-6">
                    {description || "A detailed description about your agent's capabilities and features will appear here once you fill in the form."}
                  </p>
                  {systemPrompt && (
                    <div className="mt-4 p-4 rounded-2xl bg-blue-950/40 border border-blue-400/20">
                      <div className="text-sm text-blue-300/80 font-medium mb-2">System Prompt Preview</div>
                      <p className="text-xs text-blue-200/70 font-mono line-clamp-4">{systemPrompt}</p>
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </div>

          {/* Enhanced Success Message */}
          {(txHash || tokenId) && (
            <div className="mt-8 rounded-3xl bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-xl border border-green-400/30 p-8 md:p-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-green-600/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="h5-work-sans text-[20px] mb-3 text-white">Agent Created Successfully!</div>
                  <div className="space-y-3 body-space-mono text-sm">
                    {tokenId && (
                      <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-950/30 border border-blue-400/20">
                        <span className="text-blue-300">Token ID:</span>
                        <span className="text-white font-semibold">{tokenId}</span>
                      </div>
                    )}
                    {txHash && (
                      <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-950/30 border border-blue-400/20">
                        <span className="text-blue-300">Transaction:</span>
                        <a
                          className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200 flex items-center gap-2"
                          target="_blank"
                          rel="noreferrer"
                          href={`https://testnet.snowtrace.io/tx/${txHash}`}
                        >
                          View on Snowtrace
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
