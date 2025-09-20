import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { TextSection } from "@/components/text-section";
import { PricingSection } from "@/components/pricing-section";
import { BookingSteps } from "@/components/booking-steps";
import { FAQ } from "@/components/faq";
import { Teacher } from "@/components/teacher";
import { Contacts } from "@/components/contacts";
import { Footer } from "@/components/footer";
import { MobileCTABar } from "@/components/mobile-cta-bar";
import { getPageContent } from "@/lib/content";
import { formatDate } from "@/lib/dates";
import { extractPlainText } from "@/lib/text";

const parsePrice = (value: string) => {
  const digits = value.replace(/[^\d]/g, "");
  return digits ? Number(digits) : undefined;
};

export default function HomePage() {
  const {
    site,
    intro,
    overview,
    hotel,
    program,
    pricing,
    booking,
    faq,
    teacher,
  } = getPageContent();

  const replacements = {
    DEPOSIT: site.booking.deposit,
    BOOKING_DEADLINE: formatDate(site.booking.bookingDeadline),
    BALANCE_DUE: formatDate(site.booking.balanceDue),
  } as const;

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: site.event.name,
    description: site.event.description,
    image: [
      `${site.meta.siteUrl.replace(/\/$/, "")}${site.meta.ogImage}`,
      `${site.meta.siteUrl.replace(/\/$/, "")}/images/hero-aerial.webp`,
    ],
    startDate: site.event.startDate,
    endDate: site.event.endDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: site.event.location.hotel,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.event.location.island,
        addressRegion: site.event.location.atoll,
        addressCountry: site.event.location.countryCode,
      },
    },
    organizer: {
      "@type": "Organization",
      name: site.siteName,
      url: site.meta.siteUrl,
    },
    offers: [site.pricing.double, site.pricing.single].map((tier) => ({
      "@type": "Offer",
      price: parsePrice(tier.earlyBird.price) ?? parsePrice(tier.regular.price),
      priceCurrency: "USD",
      availability: "https://schema.org/LimitedAvailability",
      url: site.booking.formUrl,
    })),
  } as const;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: extractPlainText(item.answer, replacements),
      },
    })),
  };

  return (
    <div className="bg-background text-foreground">
      <Header
        brand={site.siteName}
        navItems={site.navigation}
        bookHref={site.booking.formUrl}
        bookLabel={site.hero.secondaryCta.label}
      />
      <main id="main" className="flex flex-col">
        <Hero
          title={site.hero.title}
          location={site.hero.location}
          datesLine={site.hero.datesLine}
          primaryCta={site.hero.primaryCta}
          secondaryCta={site.hero.secondaryCta}
        />
        <TextSection id={intro.id} eyebrow={intro.eyebrow} paragraphs={intro.paragraphs} />
        <TextSection id={overview.id} title={overview.title} paragraphs={overview.paragraphs} />
        <TextSection id={hotel.id} title={hotel.title} paragraphs={hotel.paragraphs} background="muted" />
        <TextSection id={program.id} title={program.title} paragraphs={program.paragraphs} />
        <PricingSection section={pricing} pricing={site.pricing} />
        <BookingSteps section={booking} replacements={replacements} />
        <FAQ section={faq} replacements={replacements} />
        <Teacher section={teacher} />
        <Contacts contact={site.contact} />
      </main>
      <Footer />
      <MobileCTABar
        primary={{ label: site.hero.secondaryCta.label, href: site.booking.formUrl, external: true }}
        secondary={{ label: "Telegram", href: site.contact.telegram, external: true }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </div>
  );
}
