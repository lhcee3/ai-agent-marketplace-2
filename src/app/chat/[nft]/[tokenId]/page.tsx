"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Contract } from "ethers";
import { getPublicProvider } from "@/lib/eth";

type Message = { role: "user" | "assistant"; content: string };

type EthereumProvider = { request: (args: { method: string; params?: unknown[] }) => Promise<unknown> };
function getEthereum(): EthereumProvider | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { ethereum?: EthereumProvider }).ethereum;
}

export default function ChatPage() {
  const params = useParams<{ nft: string; tokenId: string }>();
  const nft = params?.nft;
  const tokenId = params?.tokenId;

  const [address, setAddress] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);
  const [agentName, setAgentName] = useState<string | undefined>(undefined);

  function ipfsToHttp(uri?: string | null) {
    if (!uri) return undefined;
    if (uri.startsWith("ipfs://")) return `https://ipfs.io/ipfs/${uri.slice("ipfs://".length)}`;
    return uri;
  }

  useEffect(() => {
    (async () => {
      try {
        const eth = getEthereum();
        if (!eth) return;
        const accounts = (await eth.request({ method: "eth_accounts" })) as string[];
        if (accounts?.[0]) setAddress(accounts[0]);
      } catch {}
    })();
  }, []);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, sending]);

  // Load agent name (no system prompt exposure)
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!nft || !tokenId) return;
      try {
        const provider = getPublicProvider();
        // Try getAgentMetadata
        try {
          const agent = new Contract(nft, [
            { inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }], name: "getAgentMetadata", outputs: [{ components: [ { internalType: "string", name: "name", type: "string" }, { internalType: "string", name: "image", type: "string" }, { internalType: "string", name: "description", type: "string" }, { internalType: "string", name: "systemPrompt", type: "string" } ], internalType: "struct AIAgentNFT.AgentMetadata", name: "", type: "tuple" }], stateMutability: "view", type: "function" },
          ], provider);
          const md = await agent.getAgentMetadata(BigInt(tokenId));
          if (mounted) setAgentName((md.name as string) || undefined);
          return;
        } catch {}
        // Fallback to tokenURI
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
              if (mounted) setAgentName(j?.name || undefined);
            }
          }
        } catch {}
      } catch {}
    })();
    return () => { mounted = false; };
  }, [nft, tokenId]);

  async function send() {
    if (!input.trim() || !nft || !tokenId) return;
    const userText = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", content: userText }]);
    setSending(true);
    try {
      const res = await fetch(`/api/chat/${nft}/${tokenId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(address ? { "x-wallet-address": address } : {}),
        },
        body: JSON.stringify({ messages: [...messages, { role: "user", content: userText }] }),
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Chat failed");
      }
      const data = await res.json();
      const reply: string = data?.reply ?? "";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (e) {
      console.error(e);
      setMessages((m) => [...m, { role: "assistant", content: "Sorry, I couldn’t respond." }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-10">
        <div className="max-w-3xl mx-auto rounded-[20px] bg-[var(--background-secondary)] p-6">
          <div className="h5-work-sans text-[20px] mb-4">Chat with {agentName || `Agent #${tokenId}`}</div>
          <div className="h-[50vh] overflow-y-auto rounded-[12px] bg-background p-4 space-y-3">
            {messages.map((m, i) => {
              // Format message content: bullet points and bold
              let formatted = m.content
                // Bullet points: lines starting with *
                .replace(/^\*\s+(.*)$/gm, '<li>$1</li>')
                // Bold: text between ** and **
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
              // If any <li> tags, wrap in <ul>
              if (/<li>/.test(formatted)) {
                formatted = `<ul style='list-style-type:disc;padding-left:1.5em;'>${formatted}</ul>`;
              }
              return (
                <div key={i} className={`p-3 rounded-[12px] ${m.role === "user" ? "bg-cta/30" : "bg-white/5"}`}>
                  <div className="body-space-mono text-xs text-[#858584] mb-1">{m.role}</div>
                  <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: formatted }} />
                </div>
              );
            })}
            <div ref={endRef} />
          </div>
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Type your message"
              className="h-12 rounded-[12px] px-4 bg-background text-white outline-none border border-white/10"
            />
            <button disabled={sending} onClick={send} className="h-12 px-6 rounded-[12px] bg-cta disabled:opacity-60">Send</button>
          </div>
        </div>
      </section>
    </main>
  );
}
