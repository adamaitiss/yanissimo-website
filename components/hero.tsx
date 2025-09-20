import Image from "next/image";

import type { SiteCopy } from "@/lib/copy";
import type { SiteConfig } from "@/lib/config";
import { SECTION_IDS } from "@/lib/constants";
import type { PlaceholderMap } from "@/lib/text";
import { extractPlainText } from "@/lib/text";
import { AnimatedSection } from "@/components/animated-section";
import { RichText } from "@/components/rich-text";
import { Button } from "@/components/ui/button";

export type HeroProps = {
  content: SiteCopy["hero"];
  replacements: PlaceholderMap;
  config: SiteConfig;
};

export const Hero = ({ content, replacements, config }: HeroProps) => {
  const primaryLabel = extractPlainText(content.cta_primary, replacements);
  const secondaryLabel = extractPlainText(content.cta_secondary, replacements);

  return (
    <section
      id={SECTION_IDS.hero}
      className="relative isolate overflow-hidden scroll-mt-20 md:scroll-mt-28"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero-aerial.webp"
          alt="Aerial view of Hanimaadhoo beachline"
          fill
          priority
          sizes="(min-width: 1024px) 100vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />
      </div>

      <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end gap-10 px-6 py-24 text-white sm:px-10 lg:px-12">
        <AnimatedSection>
          <div className="flex max-w-2xl flex-col gap-6">
            <RichText
              as="h1"
              text={content.title}
              replacements={replacements}
              className="font-display text-4xl font-semibold leading-tight md:text-5xl"
            />
            <RichText
              as="p"
              text={content.subtitle}
              replacements={replacements}
              className="text-lg md:text-xl"
            />
            <RichText
              as="p"
              text={content.meta}
              replacements={replacements}
              className="text-sm font-medium text-white/90 md:text-base"
            />
          </div>
        </AnimatedSection>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button asChild size="lg" className="min-w-[180px]">
            <a href={config.form_url} target="_blank" rel="noopener noreferrer">
              {primaryLabel}
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="min-w-[200px] border-white/50 bg-white/10 text-white hover:bg-white/20"
          >
            <a href={config.contact_tg} target="_blank" rel="noopener noreferrer">
              {secondaryLabel}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
