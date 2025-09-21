import { SECTION_IDS } from "@/lib/constants";
import type { BookingSection as BookingSectionContent } from "@/lib/content";
import type { PlaceholderMap } from "@/lib/text";
import { RichText } from "@/components/rich-text";

export type BookingStepsProps = {
  section: BookingSectionContent;
  replacements: PlaceholderMap;
};

export const BookingSteps = ({ replacements, section }: BookingStepsProps) => {
  return (
    <section
      id={SECTION_IDS.booking}
      aria-labelledby="booking-heading"
      className="bg-background py-20"
    >
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <h2 id="booking-heading" className="text-3xl font-semibold text-foreground md:text-4xl">
          {section.title}
        </h2>
        <ol className="mt-10 space-y-8">
          {section.steps.map((step, index) => (
            <li key={index} className="flex gap-4">
              <span className="mt-1 flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">
                {index + 1}
              </span>
              <div className="space-y-2 text-sm text-muted-foreground md:text-base">
                <p className="text-base font-medium tracking-[0.08em] text-foreground md:text-lg">
                  {step.title}
                </p>
                <RichText text={step.description} replacements={replacements} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
