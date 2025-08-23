"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Contract } from "ethers";
import { getPublicProvider } from "@/lib/eth";

type EthereumProvider = { request: (args: { method: string; params?: unknown[] }) => Promise<unknown> };
function getEthereum(): EthereumProvider | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { ethereum?: EthereumProvider }).ethereum;
}

function ipfsToHttp(uri?: string | null) {
  if (!uri) return undefined;
  if (uri.startsWith("ipfs://")) {
    return `https://ipfs.io/ipfs/${uri.slice("ipfs://".length)}`;
  }
  return uri;
}

export default function AgentDetailPage() {
  const params = useParams<{ nft: string; tokenId: string }>();
  const nft = params?.nft;
  const tokenId = params?.tokenId;

  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<{ name?: string; image?: string; description?: string } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const eth = getEthereum();
        if (eth) {
          const accounts = (await eth.request({ method: "eth_accounts" })) as string[];
          if (accounts?.[0]) setAddress(accounts[0]);
        }
      } catch {}
    })();
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!nft || !tokenId) return;
      setLoading(true);
      try {
        const provider = getPublicProvider();
        // owner
        try {
          const erc721 = new Contract(nft, [
            { inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }], name: "ownerOf", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
          ], provider);
          const o = (await erc721.ownerOf(BigInt(tokenId))) as string;
          if (mounted) setOwner(o);
        } catch {}

        // metadata: try getAgentMetadata, then tokenURI JSON
        let name: string | undefined;
        let image: string | undefined;
        let description: string | undefined;
        try {
          const agent = new Contract(nft, [
            { inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }], name: "getAgentMetadata", outputs: [{ components: [ { internalType: "string", name: "name", type: "string" }, { internalType: "string", name: "image", type: "string" }, { internalType: "string", name: "description", type: "string" }, { internalType: "string", name: "systemPrompt", type: "string" } ], internalType: "struct AIAgentNFT.AgentMetadata", name: "", type: "tuple" }], stateMutability: "view", type: "function" },
          ], provider);
          const md = await agent.getAgentMetadata(BigInt(tokenId));
          name = md.name as string;
          image = md.image as string;
          description = md.description as string;
        } catch {
          try {
            const erc721 = new Contract(nft, [
              { inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }], name: "tokenURI", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
            ], provider);
            const uri = (await erc721.tokenURI(BigInt(tokenId))) as string;
            const http = ipfsToHttp(uri);
            if (http) {
              const res = await fetch(http, { cache: "no-store" });
              if (res.ok) {
                const j = await res.json();
                name = j?.name ?? name;
                image = j?.image ? ipfsToHttp(j.image) : image;
                description = j?.description ?? description;
              }
            }
          } catch {}
        }
        if (mounted) setMetadata({ name, image, description });
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [nft, tokenId]);

  const canView = useMemo(() => {
    if (!address) return false;
    if (!owner) return false; // we only gate display by owner here; chat API enforces purchased-or-owner
    return owner.toLowerCase() === address.toLowerCase();
  }, [address, owner]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-10">
          <div className="rounded-[20px] bg-[var(--background-secondary)] p-6">Loading…</div>
        </section>
      </main>
    );
  }

  if (!canView) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-10">
          <div className="rounded-[20px] bg-[var(--background-secondary)] p-6">
            Access denied. Connect the wallet that owns this token to view details.
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8">
          <div className="rounded-[20px] overflow-hidden bg-[var(--background-secondary)]">
            <div className="relative aspect-square bg-background grid place-items-center overflow-hidden">
              {metadata?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={metadata.image} alt={metadata.name || "Agent"} className="w-full h-full object-cover" />
              ) : (
                <div className="text-[#858584]">No image</div>
              )}
            </div>
          </div>
          <div className="rounded-[20px] bg-[var(--background-secondary)] p-6">
            <div className="h3-work-sans text-[28px]">{metadata?.name || `Agent #${tokenId}`}</div>
            <div className="body-space-mono text-sm text-[#858584] mt-2">NFT: {nft?.slice(0,6)}…{nft?.slice(-4)} • Token #{tokenId}</div>
            {metadata?.description && (
              <p className="body-work-sans text-[#c9c9c9] mt-4 whitespace-pre-wrap">{metadata.description}</p>
            )}
            <div className="mt-6 flex gap-3">
              <Link href={`/chat/${nft}/${tokenId}`} className="h-12 px-6 rounded-[20px] bg-cta inline-flex items-center">Chat with Agent</Link>
              <Link href="/profile" className="h-12 px-6 rounded-[20px] bg-[var(--background-secondary)] inline-flex items-center">Back to Profile</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
