"use client";

import { useState, ChangeEvent } from "react";
import { ensureFujiNetwork, requestAccounts } from "@/lib/eth";
import { AI_AGENT_NFT_ADDRESS, getWriteContract } from "@/lib/aiAgentNft";
import { AI_AGENT_MARKETPLACE_ADDRESS, getListingFeeWei, listAgentForSale } from "@/lib/aiAgentMarketplace";

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
    <main className="min-h-screen bg-background text-foreground font-sans">
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="h1-work-sans text-[36px] md:text-[44px]">Create AI Agent</h1>
            <p className="body-work-sans text-white/80 mt-2 max-w-prose">
              Provide details for your agent. You can edit and publish after creation.
            </p>
          </div>

          {showToast && (
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in">
              Image uploaded successfully!
            </div>
          )}
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
                  <label className="block body-space-mono text-sm text-[#c9c9c9] mb-2">Agent Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="h-12 w-full rounded-[16px] px-4 bg-background text-white outline-none border border-white/10"
                    onChange={onImageChange}
                  />
                  <button
                    type="button"
                    className="mt-2 h-10 px-4 rounded-[16px] bg-cta text-white inline-flex items-center justify-center disabled:opacity-60"
                    onClick={handleImageUpload}
                    disabled={!imageFile || uploading}
                  >
                    {uploading ? "Uploading..." : "Upload Image to IPFS"}
                  </button>
                  {uploadProgress !== null && (
                    <div className="mt-2 w-full bg-[#222] rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-cta h-3 rounded-full transition-all"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  )}
                  <p className="mt-2 text-xs text-[#858584]">Upload an image (PNG, JPG, SVG). It will be pinned to IPFS.</p>
                  {image && (
                    <p className="mt-2 text-xs text-[#858584]">IPFS URI: {image}</p>
                  )}
                </div>

                {/* Optional list on marketplace */}
                <div className="mt-2 rounded-[16px] border border-white/10 p-4">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="size-4"
                      checked={listAfterMint}
                      onChange={(e) => setListAfterMint(e.target.checked)}
                    />
                    <span className="body-work-sans">List on marketplace after mint</span>
                  </label>
                  {listAfterMint && (
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 mt-3 items-end">
                      <div>
                        <label className="block body-space-mono text-sm text-[#c9c9c9] mb-2">Price (AVAX)</label>
                        <input
                          className="h-12 w-full rounded-[16px] px-4 bg-background text-white placeholder:text-[#858584] outline-none border border-white/10"
                          placeholder="0.1"
                          inputMode="decimal"
                          value={priceEth}
                          onChange={(e) => setPriceEth(e.target.value)}
                          required
                        />
                        {listingFeeEth && (
                          <p className="mt-2 text-xs text-[#858584]">Listing fee: {listingFeeEth} AVAX</p>
                        )}
                        <p className="mt-1 text-xs text-[#858584]">Marketplace: {AI_AGENT_MARKETPLACE_ADDRESS.slice(0,6)}…{AI_AGENT_MARKETPLACE_ADDRESS.slice(-4)}</p>
                      </div>
                    </div>
                  )}
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
