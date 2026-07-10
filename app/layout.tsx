import type { Metadata, Viewport } from "next";
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
  alternates: {
    canonical: "/",
  },
  title: "Taha Shalaby | AI Engineer & Mathematics Teacher in Cairo",
  description:
    "Taha Shalaby is a full-stack AI engineer and Cambridge Mathematics & Computing teacher in Cairo, Egypt. He ships production AI systems and teaches how they work.",
  keywords: [
    "Taha Shalaby",
    "Taha-Yassen Shalaby",
    "طه شلبي",
    "Taha Shalaby AI engineer",
    "Taha Shalaby teacher",
    "AI engineer",
    "machine learning",
    "LLM agents",
    "Cambridge mathematics teacher",
    "mathematics teacher",
    "computing teacher",
    "full-stack developer",
    "Cairo",
    "Egypt",
  ],
  authors: [{ name: "Taha-Yassen Shalaby", url: siteUrl }],
  openGraph: {
    title: "Taha Shalaby | AI Engineer & Mathematics Teacher in Cairo",
    description:
      "I ship production AI systems and teach the next generation how they work.",
    url: siteUrl,
    siteName: "Taha Shalaby",
    type: "profile",
    firstName: "Taha-Yassen",
    lastName: "Shalaby",
    username: "tahashalaby",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taha Shalaby | AI Engineer & Mathematics Teacher in Cairo",
    description:
      "I ship production AI systems and teach the next generation how they work.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#fbfbf9",
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
