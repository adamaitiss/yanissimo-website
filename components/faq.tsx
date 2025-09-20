"use client";

import { trackEvent } from "@/lib/analytics";
import { SECTION_IDS } from "@/lib/constants";
import type { FAQSection } from "@/lib/content";
import type { PlaceholderMap } from "@/lib/text";
import { RichText } from "@/components/rich-text";

export type FAQProps = {
  section: FAQSection;
  replacements: PlaceholderMap;
};

export const FAQ = ({ section, replacements }: FAQProps) => {
  return (
    <section
      id={SECTION_IDS.faq}
      aria-labelledby="faq-heading"
      className="bg-muted py-20"
    >
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <h2 id="faq-heading" className="text-3xl font-semibold text-foreground md:text-4xl">
          FAQ
        </h2>
        <div className="mt-10 space-y-4">
          {section.items.map((item, index) => (
            <details
              key={index}
              className="group rounded-xl border border-border bg-white px-5 py-4 text-foreground shadow-sm transition-shadow hover:shadow-md"
              onToggle={(event) => {
                if (event.currentTarget.open) {
                  trackEvent("faq_item_open", { question: item.question });
                }
              }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-medium md:text-lg">
                <span>{item.question}</span>
                <span className="text-accent transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                <RichText text={item.answer} replacements={replacements} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
