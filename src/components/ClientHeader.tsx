"use client";
import Link from "next/link";
import ConnectWallet from "./ConnectWallet";

export default function ClientHeader() {
  return (
    <nav className="hidden md:flex items-center gap-6 h5-work-sans text-[16px]">
      <Link className="hover:opacity-80" href="/marketplace">Marketplace</Link>
      <Link className="hover:opacity-80" href="/#creators">Rankings</Link>
      <Link className="hover:opacity-80" href="/#how">How it works</Link>
      <ConnectWallet />
    </nav>
  );
}
