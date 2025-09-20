import { SECTION_IDS } from "@/lib/constants";
import type { SiteCopy } from "@/lib/copy";
import type { PlaceholderMap } from "@/lib/text";
import { AnimatedSection } from "@/components/animated-section";
import { RichText } from "@/components/rich-text";
import { Separator } from "@/components/ui/separator";

export type PricingProps = {
  content: SiteCopy["pricing"];
  replacements: PlaceholderMap;
};

export const Pricing = ({ content, replacements }: PricingProps) => {
  return (
    <section
      id={SECTION_IDS.pricing}
      className="bg-primary/5 py-16 scroll-mt-24"
    >
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <RichText
            as="h2"
            text={content.heading}
            replacements={replacements}
            className="font-display text-3xl font-semibold text-primary sm:text-4xl"
          />
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-semibold text-secondary-foreground">
                  Включено
                </h3>
                <ul className="mt-4 space-y-3 text-secondary-foreground/90">
                  {content.included_list.map((item, index) => (
                    <li key={`inc-${index}`} className="leading-relaxed">
                      <RichText text={item} replacements={replacements} />
                    </li>
                  ))}
                </ul>
              </div>
              <Separator className="bg-primary/20" />
              <div>
                <h3 className="text-xl font-semibold text-secondary-foreground">
                  Не включено
                </h3>
                <ul className="mt-4 space-y-3 text-secondary-foreground/90">
                  {content.not_included_list.map((item, index) => (
                    <li key={`not-${index}`} className="leading-relaxed">
                      <RichText text={item} replacements={replacements} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-white/70 p-6 text-sm text-secondary-foreground">
                <RichText text={content.note} replacements={replacements} />
              </div>
            </div>
            <div className="space-y-6 rounded-3xl border border-primary/20 bg-white p-8 text-secondary-foreground shadow-md">
              <h3 className="text-xl font-semibold">Стоимость</h3>
              <ul className="space-y-4 text-base">
                {content.prices.map((price, index) => (
                  <li key={`price-${index}`} className="leading-relaxed">
                    <RichText text={price} replacements={replacements} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};
