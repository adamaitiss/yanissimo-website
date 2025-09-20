import Image from "next/image";

import { SECTION_IDS } from "@/lib/constants";
import type { SiteCopy } from "@/lib/copy";
import type { PlaceholderMap } from "@/lib/text";
import { AnimatedSection } from "@/components/animated-section";
import { RichText } from "@/components/rich-text";

export type RoomsProps = {
  content: SiteCopy["rooms"];
  replacements: PlaceholderMap;
};

export const Rooms = ({ content, replacements }: RoomsProps) => {
  return (
    <section
      id={SECTION_IDS.rooms}
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16 sm:px-10"
    >
      <AnimatedSection>
        <RichText
          as="h2"
          text={content.heading}
          replacements={replacements}
          className="font-display text-3xl font-semibold text-primary sm:text-4xl"
        />
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {content.cards.map((card, index) => (
            <article
              key={index}
              className="overflow-hidden rounded-3xl border border-border/40 bg-white shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="relative h-60 w-full">
                <Image
                  src={`/images/${card.image}`}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="space-y-3 px-6 py-6">
                <RichText
                  as="h3"
                  text={card.title}
                  replacements={replacements}
                  className="font-display text-2xl font-semibold text-secondary-foreground"
                />
                <RichText
                  text={card.description}
                  replacements={replacements}
                  className="text-base leading-relaxed text-secondary-foreground/90"
                />
              </div>
            </article>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
};
