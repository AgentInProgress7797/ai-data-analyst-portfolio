import type { Metadata } from "next";
import {
  Inter,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";

import CommandPalette from "@/components/CommandPalette";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import { personal, seo } from "@/data/profile";

import "./globals.css";

/* =========================================================
   FONT CONFIGURATION
========================================================= */

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

/* =========================================================
   SEO METADATA
========================================================= */

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),

  title: seo.title,
  description: seo.description,

  keywords: [
    "AI Data Analyst",
    "Data Analytics",
    "Business Intelligence",
    "Power BI",
    "Tableau",
    "Generative AI",
    "Agentic AI",
    personal.name,
  ],

  authors: [
    {
      name: personal.name,
    },
  ],

  openGraph: {
    title: seo.title,
    description: seo.description,
    url: seo.url,
    siteName: seo.title,
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },

  robots: {
    index: true,
    follow: true,
  },
};

/* =========================================================
   ROOT LAYOUT
========================================================= */

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`
        ${display.variable}
        ${body.variable}
        ${mono.variable}
      `}
    >
      <body>
        <CustomCursor />
        <ScrollProgress />
        <CommandPalette />
        {children}
      </body>
    </html>
  );
}