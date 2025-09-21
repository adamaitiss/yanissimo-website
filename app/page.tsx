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

  const bookingCta = {
    label: site.hero.secondaryCta.label,
    href: site.hero.secondaryCta.href,
  } as const;

  const introParagraphs = intro.paragraphs;
  const overviewCombined = [overview.paragraphs.join("\n\n")];
  const hotelCombined = [hotel.paragraphs.join("\n\n")];
  const programCombined = [program.paragraphs.join("\n\n")];

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
        bookHref={bookingCta.href}
        bookLabel={bookingCta.label}
      />
      <main id="main" className="flex flex-col">
        <Hero
          title={site.hero.title}
          location={site.hero.location}
          datesLine={EVENT_DATES_SHORT}
          primaryCta={site.hero.primaryCta}
          secondaryCta={bookingCta}
        />
        <TextSection
          id={intro.id}
          eyebrow={intro.eyebrow}
          paragraphs={introParagraphs}
          replacements={replacements}
          layout="split"
          sectionClassName="bg-background py-8 md:py-10"
          containerClassName="mx-auto max-w-5xl px-6 md:px-12"
          className="items-start gap-12 md:gap-16"
          eyebrowClassName="text-base font-semibold uppercase tracking-[0.3em] text-accent"
          paragraphClassName="text-lg leading-8 text-foreground/85 md:text-xl md:leading-9"
        />
        <TextSection
          id={overview.id}
          title={overview.title}
          paragraphs={overviewCombined}
          replacements={replacements}
          layout="cards"
          sectionClassName="bg-background py-8 md:py-10"
          containerClassName="relative mx-auto max-w-5xl px-6 md:px-12"
          titleClassName="mt-6 text-base font-semibold uppercase tracking-[0.3em] text-accent md:text-lg"
          paragraphClassName="text-base leading-7 text-foreground/90 md:text-lg md:leading-8"
        />
        <TextSection
          id={hotel.id}
          title={hotel.title}
          paragraphs={hotelCombined}
          replacements={replacements}
          layout="cards"
          sectionClassName="bg-background py-8 md:py-10"
          containerClassName="relative mx-auto max-w-5xl px-6 md:px-12"
          titleClassName="mt-6 text-base font-semibold uppercase tracking-[0.3em] text-accent md:text-lg"
          paragraphClassName="text-base leading-7 text-foreground/82 md:text-lg md:leading-8"
        />
        <TextSection
          id={program.id}
          title={program.title}
          paragraphs={programCombined}
          replacements={replacements}
          layout="timeline"
          sectionClassName="relative isolate bg-background py-8 md:py-10 before:absolute before:-top-24 before:right-[12%] before:h-[320px] before:w-[320px] before:rounded-full before:bg-[radial-gradient(circle_at_center,rgba(206,198,188,0.22),transparent_74%)] before:content-['']"
          containerClassName="relative mx-auto max-w-5xl px-6 md:px-12"
          titleClassName="mt-6 text-base font-semibold uppercase tracking-[0.3em] text-accent md:text-lg"
          paragraphClassName="text-base leading-7 text-foreground/90 md:text-lg md:leading-8"
        />
        <Rooms section={rooms} />
        <Teacher section={teacher} />
        <PricingSection
          section={pricing}
          pricing={site.pricing}
          bookCta={{ href: bookingCta.href, label: bookingCta.label, external: bookingCta.href.startsWith("#") ? false : undefined }}
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
        primary={{ label: bookingCta.label, href: bookingCta.href, external: bookingCta.href.startsWith("#") ? false : undefined }}
        secondary={{ label: "Telegram", href: site.contact.telegram, external: true }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </div>
  );
}
