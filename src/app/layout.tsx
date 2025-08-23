import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Synaptica - AI Agent Marketplace",
  description: "Explore and trade AI agents on the Avalanche blockchain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html lang="en" suppressHydrationWarning>
  <body className={"antialiased font-sans"}>
        {children}
      </body>
    </html>
  );
}
