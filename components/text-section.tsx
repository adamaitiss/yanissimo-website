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
  eyebrowClassName?: string;
  titleClassName?: string;
  paragraphClassName?: string;
  sectionClassName?: string;
  containerClassName?: string;
  layout?: "stack" | "split" | "cards" | "timeline";
};

export const TextSection = ({
  id,
  eyebrow,
  title,
  paragraphs,
  replacements,
  background = "default",
  className,
  eyebrowClassName,
  titleClassName,
  paragraphClassName,
  sectionClassName,
  containerClassName,
  layout = "stack",
}: TextSectionProps) => {
  const paragraphTextClassName = cn(
    "text-base leading-7 text-foreground/85 md:text-lg md:leading-8",
    paragraphClassName,
  );

  const renderStack = () => (
    <div className={cn("mt-12 space-y-6", className)}>
      {paragraphs.map((paragraph, index) => (
        <RichText key={index} text={paragraph} replacements={replacements} className={paragraphTextClassName} />
      ))}
    </div>
  );

  const renderSplit = () => (
    <div className={cn("mt-12 grid gap-12 md:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]", className)}>
      {paragraphs.map((paragraph, index) => (
        <RichText
          key={index}
          text={paragraph}
          replacements={replacements}
          className={cn("text-lg leading-8 text-foreground/90 md:text-xl md:leading-9", paragraphClassName)}
        />
      ))}
    </div>
  );

  const renderCards = () => (
    <div
      className={cn(
        "mt-14 grid gap-8",
        paragraphs.length > 1 ? "md:grid-cols-2" : null,
        className,
      )}
    >
      {paragraphs.map((paragraph, index) => (
        <article
          key={index}
          className={cn(
            "mx-auto w-full rounded-[1.5rem] border border-border/60 bg-white p-8 shadow-sm md:shadow-md",
          )}
        >
          <RichText
            text={paragraph}
            replacements={replacements}
            className={cn("text-base leading-7 text-foreground/90 md:text-lg md:leading-8", paragraphClassName)}
          />
        </article>
      ))}
    </div>
  );

  const renderTimeline = () => (
    <div className={cn("relative mt-16", className)}>
      {paragraphs.length > 1 ? (
        <>
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-accent/45 via-accent/20 to-transparent" aria-hidden="true" />
          <div className="space-y-12 pl-9">
            {paragraphs.map((paragraph, index) => (
              <div
                key={index}
                className="relative rounded-[1.5rem] border border-border/60 bg-white p-8 shadow-sm md:shadow-md"
              >
                <span className="absolute -left-9 top-10 inline-flex h-4 w-4 -translate-y-1/2 items-center justify-center rounded-full bg-accent shadow-[0_0_0_10px_rgba(186,174,165,0.25)]" />
                <RichText
                  text={paragraph}
                  replacements={replacements}
                  className={cn("text-base leading-7 text-foreground/85 md:text-lg md:leading-8", paragraphClassName)}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <article className="mx-auto w-full rounded-[1.5rem] border border-border/60 bg-white p-8 shadow-sm md:shadow-md">
          <RichText
            text={paragraphs[0] ?? ""}
            replacements={replacements}
            className={cn("text-base leading-7 text-foreground/85 md:text-lg md:leading-8", paragraphClassName)}
          />
        </article>
      )}
    </div>
  );

  const paragraphContent = (() => {
    switch (layout) {
      case "split":
        return renderSplit();
      case "cards":
        return renderCards();
      case "timeline":
        return renderTimeline();
      case "stack":
      default:
        return renderStack();
    }
  })();

  return (
    <section
      id={id}
      className={cn(
        "py-24",
        background === "muted" ? "bg-muted" : "bg-background",
        sectionClassName,
      )}
    >
      <div className={cn("mx-auto max-w-4xl px-6 md:px-10", containerClassName)}>
        {eyebrow ? (
          <p className={cn("text-xs font-semibold tracking-[0.3em] text-accent", eyebrowClassName)}>
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className={cn("mt-4 text-3xl font-semibold text-foreground md:text-4xl", titleClassName)}>{title}</h2>
        ) : null}
        {paragraphContent}
      </div>
    </section>
  );
};
