import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Synaptica",
  description: "Explore and trade AI agents on the Avalanche blockchain.",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/logo.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html lang="en" suppressHydrationWarning>
    <head>
      <link rel="icon" href="/logo.png" type="image/png" />
      <link rel="shortcut icon" href="/logo.png" type="image/png" />
      <link rel="apple-touch-icon" href="/logo.png" />
      <meta name="msapplication-TileImage" content="/logo.png" />
    </head>
  <body className={"antialiased font-sans"}>
        {children}
      </body>
    </html>
  );
}
