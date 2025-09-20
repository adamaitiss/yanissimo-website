import { CTASection } from "@/components/cta-section";
import { FAQ } from "@/components/faq";
import { Hero } from "@/components/hero";
import { MobileCTABar } from "@/components/mobile-cta-bar";
import { Pricing } from "@/components/pricing";
import { Program } from "@/components/program";
import { Rooms } from "@/components/rooms";
import { SiteFooter } from "@/components/site-footer";
import { StickyNav } from "@/components/navigation/sticky-nav";
import { Teacher } from "@/components/teacher";
import { Venue } from "@/components/venue";
import { getCopy } from "@/lib/copy";
import { getSiteConfig, getPlaceholderMap } from "@/lib/config";
import { extractPlainText } from "@/lib/text";

const parsePrice = (value: string) => {
  const digits = value.replace(/[^\d]/g, "");
  return digits ? Number(digits) : undefined;
};

export default function HomePage() {
  const config = getSiteConfig();
  const copy = getCopy("ru");
  const replacements = getPlaceholderMap(config);
  const primaryTopCta = extractPlainText(copy.hero.cta_primary, replacements);
  const secondaryTopCta = extractPlainText(copy.hero.cta_secondary, replacements);

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://yanissimoyoga.ru").replace(/\/$/, "");
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Yanissimo Yoga Retreat · The Barefoot Eco Hotel",
    description:
      "7-дневный йога-ретрит Yanissimo Yoga в The Barefoot Eco Hotel на острове Ханимаадху (Мальдивы).",
    image: [
      `${siteUrl}/images/og-maldives-retreat.jpg`,
      `${siteUrl}/images/hero-aerial.webp`,
    ],
    startDate: config.start_date,
    endDate: config.end_date,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "The Barefoot Eco Hotel",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Naseemee Magu",
        addressLocality: "Hanimaadhoo",
        addressRegion: "Haa Dhaalu Atoll",
        addressCountry: "MV",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Yanissimo Yoga",
      url: siteUrl,
    },
    offers: [
      {
        "@type": "Offer",
        price: parsePrice(config.price_double),
        priceCurrency: "EUR",
        availability: "https://schema.org/LimitedAvailability",
        url: config.form_url,
      },
      {
        "@type": "Offer",
        price: parsePrice(config.price_single),
        priceCurrency: "EUR",
        availability: "https://schema.org/LimitedAvailability",
        url: config.form_url,
      },
    ],
  };

  return (
    <div className="relative bg-background text-secondary-foreground">
      <StickyNav
        primaryHref={config.form_url}
        primaryLabel={primaryTopCta}
        secondaryHref={config.contact_tg}
        secondaryLabel={secondaryTopCta}
      />
      <main id="main" className="flex flex-col gap-0 pb-28 md:pb-0">
        <Hero content={copy.hero} replacements={replacements} config={config} />
        <Venue content={copy.venue} replacements={replacements} />
        <Program content={copy.program} replacements={replacements} />
        <Rooms content={copy.rooms} replacements={replacements} />
        <Pricing content={copy.pricing} replacements={replacements} />
        <FAQ content={copy.faq} replacements={replacements} />
        <Teacher content={copy.teacher} replacements={replacements} />
        <CTASection content={copy.cta} replacements={replacements} config={config} />
      </main>
      <SiteFooter content={copy.footer} replacements={replacements} config={config} />
      <MobileCTABar heroContent={copy.hero} replacements={replacements} config={config} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
    </div>
  );
}
