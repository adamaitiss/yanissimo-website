import type { SiteCopy } from "@/lib/copy";
import type { SiteConfig } from "@/lib/config";
import { SECTION_IDS } from "@/lib/constants";
import type { PlaceholderMap } from "@/lib/text";
import { extractPlainText } from "@/lib/text";
import { AnimatedSection } from "@/components/animated-section";
import { RichText } from "@/components/rich-text";
import { Button } from "@/components/ui/button";

export type CTASectionProps = {
  content: SiteCopy["cta"];
  replacements: PlaceholderMap;
  config: SiteConfig;
};

export const CTASection = ({ content, replacements, config }: CTASectionProps) => {
  const [primaryLabel, secondaryLabel] = content.buttons.map((label) =>
    extractPlainText(label, replacements),
  );

  return (
    <section
      id={SECTION_IDS.cta}
      className="mx-auto max-w-4xl scroll-mt-24 px-6 py-20 text-center sm:px-10"
    >
      <AnimatedSection>
        <div className="rounded-3xl bg-primary px-8 py-14 text-white shadow-xl">
          <RichText
            as="h2"
            text={content.heading}
            replacements={replacements}
            className="font-display text-3xl font-semibold sm:text-4xl"
          />
          <RichText
            text={content.p}
            replacements={replacements}
            className="mt-4 text-lg text-white/90"
          />
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="min-w-[180px] bg-sand text-primary hover:bg-sand/90">
              <a href={config.form_url} target="_blank" rel="noopener noreferrer">
                {primaryLabel}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-w-[200px] border-white/60 bg-transparent text-white hover:bg-white/15"
            >
              <a href={config.contact_tg} target="_blank" rel="noopener noreferrer">
                {secondaryLabel}
              </a>
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};
