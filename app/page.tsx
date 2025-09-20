import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { TextSection } from "@/components/text-section";
import { PricingSection } from "@/components/pricing-section";
import { Rooms } from "@/components/rooms";
import { BookingSteps } from "@/components/booking-steps";
import { FAQ } from "@/components/faq";
import { Teacher } from "@/components/teacher";
import { Contacts } from "@/components/contacts";
import { Footer } from "@/components/footer";
import { Gallery } from "@/components/gallery";
import { MobileCTABar } from "@/components/mobile-cta-bar";
import { BookingForm } from "@/components/booking-form";
import { getPageContent } from "@/lib/content";
import { formatDate } from "@/lib/dates";
import { extractPlainText } from "@/lib/text";
import { EVENT_DATES_FULL, EVENT_DATES_SHORT, EVENT_END, EVENT_START } from "@/lib/constants";

export default function HomePage() {
  const {
    site,
    intro,
    overview,
    hotel,
    program,
    rooms,
    gallery,
    pricing,
    booking,
    faq,
    teacher,
  } = getPageContent();

  const eventStartDay = formatDate(EVENT_START, "ru-RU", { day: "2-digit", month: "2-digit" });

  const replacements = {
    DEPOSIT: site.booking.deposit,
    BOOKING_DEADLINE: formatDate(site.booking.bookingDeadline),
    BALANCE_DUE: formatDate(site.booking.balanceDue),
    EVENT_DATES_FULL,
    EVENT_START_DAY: eventStartDay,
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
    startDate: EVENT_START,
    endDate: EVENT_END,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: site.event.location.name,
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
    offers: site.pricing.items.map((item) => ({
      "@type": "Offer",
      name: item.label,
      price: item.price,
      priceCurrency: site.pricing.currency,
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
        brand={site.hero.title}
        navItems={site.navigation}
        bookHref={site.booking.formUrl}
        bookLabel={site.hero.secondaryCta.label}
      />
      <main id="main" className="flex flex-col">
        <Hero
          title={site.hero.title}
          location={site.hero.location}
          datesLine={EVENT_DATES_SHORT}
          primaryCta={site.hero.primaryCta}
          secondaryCta={site.hero.secondaryCta}
        />
        <TextSection
          id={intro.id}
          eyebrow={intro.eyebrow}
          paragraphs={intro.paragraphs}
          replacements={replacements}
        />
        <TextSection
          id={overview.id}
          title={overview.title}
          paragraphs={overview.paragraphs}
          replacements={replacements}
        />
        <TextSection
          id={hotel.id}
          title={hotel.title}
          paragraphs={hotel.paragraphs}
          replacements={replacements}
          background="muted"
        />
        <TextSection
          id={program.id}
          title={program.title}
          paragraphs={program.paragraphs}
          replacements={replacements}
        />
        <Rooms section={rooms} />
        <Teacher section={teacher} />
        <PricingSection
          section={pricing}
          pricing={site.pricing}
          bookCta={{ href: site.booking.formUrl, label: site.hero.secondaryCta.label, external: true }}
          replacements={replacements}
        />
        <BookingForm />
        <Gallery section={gallery} replacements={replacements} />
        <BookingSteps section={booking} replacements={replacements} />
        <FAQ section={faq} replacements={replacements} />
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
