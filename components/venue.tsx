import { SECTION_IDS } from "@/lib/constants";
import type { SiteCopy } from "@/lib/copy";
import type { PlaceholderMap } from "@/lib/text";
import { AnimatedSection } from "@/components/animated-section";
import { RichText } from "@/components/rich-text";

export type VenueProps = {
  content: SiteCopy["venue"];
  replacements: PlaceholderMap;
};

export const Venue = ({ content, replacements }: VenueProps) => {
  return (
    <section
      id={SECTION_IDS.venue}
      className="mx-auto max-w-5xl scroll-mt-24 px-6 py-16 sm:px-10"
    >
      <AnimatedSection>
        <RichText
          as="h2"
          text={content.heading}
          replacements={replacements}
          className="font-display text-3xl font-semibold text-primary sm:text-4xl"
        />
        <ul className="mt-8 grid gap-5 text-base text-secondary-foreground sm:text-lg">
          {content.bullets.map((bullet, index) => (
            <li key={index} className="rounded-xl border border-primary/10 bg-white/70 p-5 shadow-sm">
              <RichText text={bullet} replacements={replacements} className="leading-relaxed" />
            </li>
          ))}
        </ul>
      </AnimatedSection>
    </section>
  );
};
