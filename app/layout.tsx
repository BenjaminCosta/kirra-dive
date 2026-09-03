import type { Metadata, Viewport } from "next";
import { Open_Sans } from "next/font/google";
import { siteConfig } from "@/data/landing-content";
import "./globals.css";

/**
 * Open Sans is a variable font, so 400 / 600 / 700 all come from a single
 * self-hosted file — no extra requests, no layout shift.
 */
const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.metaTitle,
  description: siteConfig.metaDescription,
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.metaTitle,
    description: siteConfig.metaDescription,
    images: [
      {
        // PLACEHOLDER: swap for a real 1200x630 Kirra Dive share image.
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Sunlight through deep blue ocean water — Kirra Dive PADI Open Water Diver course.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.metaTitle,
    description: siteConfig.metaDescription,
    images: ["/images/og-cover.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#060606",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={`${openSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-clip">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
