import { cn } from "@/lib/utils";
import type { PlaceholderMap } from "@/lib/text";
import { formatRichTextToHtml } from "@/lib/text";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type RichTextProps<T extends ElementType> = {
  as?: T;
  text: string;
  className?: string;
  replacements: PlaceholderMap;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export const RichText = <T extends ElementType = "p">({
  as,
  text,
  className,
  replacements,
  ...rest
}: RichTextProps<T>) => {
  const Component = (as ?? "p") as ElementType;
  const html = formatRichTextToHtml(text, replacements);

  return (
    <Component
      className={cn(className)}
      dangerouslySetInnerHTML={{ __html: html }}
      {...rest}
    />
  );
};
