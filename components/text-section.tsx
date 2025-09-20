import type { PlaceholderMap } from "@/lib/text";
import { RichText } from "@/components/rich-text";
import { cn } from "@/lib/utils";

export type TextSectionProps = {
  id: string;
  eyebrow?: string;
  title?: string;
  paragraphs: string[];
  replacements?: PlaceholderMap;
  background?: "default" | "muted";
  className?: string;
};

export const TextSection = ({
  id,
  eyebrow,
  title,
  paragraphs,
  replacements,
  background = "default",
  className,
}: TextSectionProps) => {
  return (
    <section
      id={id}
      className={cn(
        "py-20",
        background === "muted" ? "bg-muted" : "bg-background",
      )}
    >
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="mt-4 text-3xl font-semibold text-foreground md:text-4xl">{title}</h2>
        ) : null}
        <div className={cn("mt-8 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg", className)}>
          {paragraphs.map((paragraph, index) => (
            <RichText key={index} text={paragraph} replacements={replacements} />
          ))}
        </div>
      </div>
    </section>
  );
};
