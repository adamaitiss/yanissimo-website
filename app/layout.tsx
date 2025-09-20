import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/analytics";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yanissimoyoga.ru";
const ogImage = "/images/og-maldives-retreat.jpg";
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Yanissimo Yoga · Maldives Retreat",
    template: "%s · Yanissimo Yoga",
  },
  description:
    "7-дневный йога-ретрит Yanissimo Yoga в The Barefoot Eco Hotel: практика, бирюзовая лагуна и эко-подход на острове Ханимаадху.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Yanissimo Yoga · Maldives Retreat",
    description:
      "7 дней практик, море и эко-концепция The Barefoot Eco Hotel на острове Ханимаадху, Мальдивы.",
    url: siteUrl,
    siteName: "Yanissimo Yoga",
    locale: "ru_RU",
    type: "website",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Yanissimo Yoga Retreat at The Barefoot Eco Hotel" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yanissimo Yoga · Maldives Retreat",
    description:
      "Йога, море и эко-ретрит в The Barefoot Eco Hotel (Ханимаадху, Мальдивы).",
    images: [ogImage],
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
    <html lang="ru">
      <body className={`${inter.variable} ${playfair.variable} ${geistMono.variable} antialiased`}>
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
