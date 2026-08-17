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
    "Applied AI",
    "AI Engineering",
    "Enterprise AI",
    "Generative AI",
    "Agentic AI",
    "AI Agents",
    "AI Automation",
    "Intelligent Automation",
    "Data Analytics",
    "Business Intelligence",
    "Power BI",
    "Tableau",
    "Python",
    "SQL",
    "LLM Applications",
    "Enterprise Automation",
    personal.name,
  ],

  authors: [
    {
      name: personal.name,
    },
  ],

  creator: personal.name,

  openGraph: {
    title: seo.title,

    description: seo.description,

    url: seo.url,

    siteName: `${personal.name} | AI Data Analyst`,

    type: "website",

    locale: "en_IN",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${personal.name} — AI, Data, Agents and Automation`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: seo.title,

    description: seo.description,

    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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