import { SECTION_IDS } from "@/lib/constants";
import type { SiteCopy } from "@/lib/copy";
import type { PlaceholderMap } from "@/lib/text";
import { AnimatedSection } from "@/components/animated-section";
import { RichText } from "@/components/rich-text";

export type FAQProps = {
  content: SiteCopy["faq"];
  replacements: PlaceholderMap;
};

export const FAQ = ({ content, replacements }: FAQProps) => {
  return (
    <section
      id={SECTION_IDS.faq}
      className="mx-auto max-w-4xl scroll-mt-24 px-6 py-16 sm:px-10"
    >
      <AnimatedSection>
        <h2 className="font-display text-3xl font-semibold text-primary sm:text-4xl">FAQ</h2>
        <div className="mt-8 space-y-4">
          {content.map((item, index) => (
            <details
              key={index}
              className="group rounded-2xl border border-border/40 bg-white p-5 text-secondary-foreground shadow-sm transition-shadow hover:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold sm:text-lg">
                <RichText text={item.question} replacements={replacements} />
                <span className="text-primary transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="mt-3 text-secondary-foreground/90">
                <RichText text={item.answer} replacements={replacements} />
              </div>
            </details>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
};
