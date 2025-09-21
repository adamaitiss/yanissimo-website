"use client";

import { RichText } from "@/components/rich-text";
import { PricingViewTracker } from "@/components/pricing-view-tracker";
import { Button } from "@/components/ui/button";
import type { PricingSection as PricingSectionContent, SiteContent } from "@/lib/content";
import { SECTION_IDS, SCROLL_OFFSET_PX } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import type { PlaceholderMap } from "@/lib/text";

export type PricingSectionProps = {
  section: PricingSectionContent;
  pricing: SiteContent["pricing"];
  bookCta?: { href: string; label: string; external?: boolean };
  replacements?: PlaceholderMap;
};

const formatPrice = (value: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);
};

export const PricingSection = ({ bookCta, pricing, section, replacements }: PricingSectionProps) => {
  const resolvedBookCta = bookCta ?? {
    href: "#booking",
    label: "Забронировать",
    external: false,
  };

  const isAnchorLink = resolvedBookCta.href.startsWith("#");
  const isExternalLink = resolvedBookCta.external ?? (!isAnchorLink && /^https?:/i.test(resolvedBookCta.href));

  const handleAnchorScroll = () => {
    if (!isAnchorLink) return;
    const target = document.getElementById(resolvedBookCta.href.slice(1));
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET_PX;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section
      id={SECTION_IDS.pricing}
      className="bg-muted py-20"
      aria-labelledby="pricing-heading"
    >
      <PricingViewTracker sectionId={SECTION_IDS.pricing} />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1.2fr_1fr] md:px-10">
        <div>
          <h2 id="pricing-heading" className="text-3xl font-semibold text-foreground md:text-4xl">
            {section.title}
          </h2>
          <ul className="mt-8 space-y-3 text-base leading-relaxed text-muted-foreground md:text-lg">
            {section.included.map((item, index) => (
              <li key={index} className="flex gap-3">
                <span className="mt-2 size-1.5 flex-shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <RichText text={item} replacements={replacements} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <article className="rounded-3xl border border-border bg-white p-6 text-foreground shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <h3 className="text-lg font-semibold uppercase tracking-[0.2em] text-accent">
                  Стоимость участия
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  {section.badgeLabel ? (
                    <span className="rounded-full bg-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
                      {section.badgeLabel}
                    </span>
                  ) : null}
                  {section.secondaryBadgeLabel ? (
                    <span className="rounded-full bg-foreground/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground/80">
                      {section.secondaryBadgeLabel}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="space-y-4 text-sm text-muted-foreground">
                {pricing.items.map((item) => (
                  <div key={item.label} className="flex items-baseline justify-between gap-4">
                    <span className="text-xs uppercase tracking-[0.28em] text-muted-foreground/80">
                      {item.label}
                    </span>
                    <span className="text-2xl font-semibold text-foreground" data-testid="pricing-price">
                      {formatPrice(item.price, pricing.currency)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex flex-col items-stretch gap-4 md:flex-row md:justify-end">
                <Button asChild size="lg" className="w-full md:w-auto">
                  <a
                    href={resolvedBookCta.href}
                    target={isExternalLink ? "_blank" : undefined}
                    rel={isExternalLink ? "noopener noreferrer" : undefined}
                    onClick={(event) => {
                      trackEvent("pricing_cta_click", { source: "pricing-section" });
                      if (isAnchorLink) {
                        event.preventDefault();
                        handleAnchorScroll();
                      }
                    }}
                  >
                    {resolvedBookCta.label}
                  </a>
                </Button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
