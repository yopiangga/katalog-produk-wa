import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { store } from "@/config/store";
import { photo } from "@/lib/format";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(store.url),
  title: {
    default: `${store.name} · ${store.tagline}`,
    template: `%s · ${store.name}`,
  },
  description: store.description,
  openGraph: {
    type: "website",
    siteName: store.name,
    locale: "id_ID",
    images: [{ url: photo("1550614000-4895a10e1bfd", { w: 1200, h: 630, fy: 0.3 }), width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f7f3ee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable} antialiased`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
