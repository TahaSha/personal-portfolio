import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { siteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Taha Shalaby | AI Engineer & Educator",
  description:
    "Full-Stack AI Engineer and Cambridge Mathematics & Computing Educator. I ship production AI systems and teach the next generation how they work.",
  keywords: [
    "AI engineer",
    "machine learning",
    "LLM agents",
    "Cambridge educator",
    "mathematics teacher",
    "computing teacher",
    "full-stack developer",
    "Cairo",
  ],
  authors: [{ name: "Taha-Yassen Shalaby" }],
  openGraph: {
    title: "Taha Shalaby | AI Engineer & Educator",
    description:
      "I ship production AI systems and teach the next generation how they work.",
    url: siteUrl,
    siteName: "Taha Shalaby",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taha Shalaby | AI Engineer & Educator",
    description:
      "I ship production AI systems and teach the next generation how they work.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
