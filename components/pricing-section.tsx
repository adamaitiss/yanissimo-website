import { SECTION_IDS } from "@/lib/constants";
import type { PricingSection as PricingSectionContent, SiteContent } from "@/lib/content";
import { RichText } from "@/components/rich-text";
import { PricingViewTracker } from "@/components/pricing-view-tracker";

export type PricingSectionProps = {
  section: PricingSectionContent;
  pricing: SiteContent["pricing"];
};

const PricingCard = ({
  title,
  earlyBird,
  regular,
}: SiteContent["pricing"][keyof SiteContent["pricing"]]) => {
  return (
    <article className="rounded-3xl border border-border bg-white p-6 text-foreground shadow-sm">
      <h3 className="text-lg font-semibold uppercase tracking-[0.2em] text-accent">{title}</h3>
      <div className="mt-6 space-y-3 text-sm font-medium text-muted-foreground">
        <p>
          <span className="block text-xs uppercase tracking-[0.28em] text-muted-foreground/80">
            {earlyBird.label}
          </span>
          <span className="text-2xl font-semibold text-foreground">{earlyBird.price}</span>
        </p>
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground/80">
          {regular.label} {regular.price}
        </p>
      </div>
    </article>
  );
};

export const PricingSection = ({ pricing, section }: PricingSectionProps) => {
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
                <RichText text={item} />
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-6">
          <PricingCard {...pricing.double} />
          <PricingCard {...pricing.single} />
        </div>
      </div>
    </section>
  );
};
