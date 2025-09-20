import Image from "next/image";

import { SECTION_IDS } from "@/lib/constants";
import type { SiteCopy } from "@/lib/copy";
import type { PlaceholderMap } from "@/lib/text";
import { AnimatedSection } from "@/components/animated-section";
import { RichText } from "@/components/rich-text";

export type ProgramProps = {
  content: SiteCopy["program"];
  replacements: PlaceholderMap;
};

export const Program = ({ content, replacements }: ProgramProps) => {
  return (
    <section
      id={SECTION_IDS.program}
      className="bg-sand/80 py-16 scroll-mt-24"
    >
      <AnimatedSection>
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 sm:px-10 lg:flex-row">
          <div className="flex-1 space-y-6">
            <RichText
              as="h2"
              text={content.heading}
              replacements={replacements}
              className="font-display text-3xl font-semibold text-primary sm:text-4xl"
            />
            <RichText
              text={content.p1}
              replacements={replacements}
              className="text-lg leading-relaxed text-secondary-foreground"
            />
            <RichText
              text={content.p2}
              replacements={replacements}
              className="text-lg leading-relaxed text-secondary-foreground"
            />
          </div>
          <div className="flex flex-1 flex-col gap-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/images/program-yoga-deck.webp"
              alt="Open-air yoga deck, oceanfront"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/images/program-shala.webp"
                alt="Wooden-floor shala, meditation"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};
