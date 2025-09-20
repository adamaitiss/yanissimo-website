import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { Analytics } from "@/components/analytics";
import { getSiteContent } from "@/lib/content";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const site = getSiteContent();
const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteUrl = (envSiteUrl ?? site.meta.siteUrl).replace(/\/$/, "");
const ogImage = site.meta.ogImage;
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.meta.title,
    template: `%s · ${site.siteName}`,
  },
  description: site.meta.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    url: siteUrl,
    siteName: site.siteName,
    locale: "ru_RU",
    type: "website",
    images: [{ url: ogImage, width: 1200, height: 630, alt: site.meta.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.title,
    description: site.meta.description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: site.meta.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Перейти к содержанию
        </a>
        <Analytics gaId={gaId} plausibleDomain={plausibleDomain} />
        {children}
      </body>
    </html>
  );
}
