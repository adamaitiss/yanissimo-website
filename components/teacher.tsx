import Image from "next/image";

import { SECTION_IDS } from "@/lib/constants";
import type { SiteCopy } from "@/lib/copy";
import type { PlaceholderMap } from "@/lib/text";
import { AnimatedSection } from "@/components/animated-section";
import { RichText } from "@/components/rich-text";

export type TeacherProps = {
  content: SiteCopy["teacher"];
  replacements: PlaceholderMap;
};

export const Teacher = ({ content, replacements }: TeacherProps) => {
  return (
    <section
      id={SECTION_IDS.teacher}
      className="bg-sand/60 py-16 scroll-mt-24"
    >
      <AnimatedSection>
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-6 sm:flex-row sm:px-10">
          <div className="relative aspect-square w-60 overflow-hidden rounded-full shadow-lg sm:w-72">
            <Image
              src="/images/teacher-yana.webp"
              alt={content.alt}
              fill
              sizes="(min-width: 768px) 18rem, 16rem"
              className="object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex-1 space-y-4 text-center sm:text-left">
            <RichText
              as="h2"
              text={content.heading}
              replacements={replacements}
              className="font-display text-3xl font-semibold text-primary sm:text-4xl"
            />
            <RichText
              as="h3"
              text={content.name}
              replacements={replacements}
              className="font-display text-xl font-semibold text-secondary-foreground"
            />
            <RichText
              text={content.bio_short}
              replacements={replacements}
              className="text-base leading-relaxed text-secondary-foreground/90"
            />
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};
