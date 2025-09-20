"use client";

import { useCallback } from "react";

import { NAV_ITEMS, SECTION_IDS } from "@/lib/constants";
import { useSectionObserver } from "@/hooks/use-section-observer";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sectionOrder = NAV_ITEMS.map((item) => SECTION_IDS[item.id]);

type StickyNavProps = {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export const StickyNav = ({
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: StickyNavProps) => {
  const activeId = useSectionObserver(sectionOrder);

  const handleSmoothScroll = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    const targetId = event.currentTarget.getAttribute("data-target-id");
    if (!targetId) return;
    const element = document.getElementById(targetId);
    if (!element) return;

    event.preventDefault();
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <nav
      className="sticky top-0 z-40 hidden border-b border-white/10 bg-white/85 backdrop-blur-md md:flex"
      aria-label="Основная навигация"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <a href="#hero" className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Yanissimo Yoga
        </a>
        <ul className="flex items-center gap-6 text-sm text-secondary-foreground">
          {NAV_ITEMS.map((item) => {
            const sectionId = SECTION_IDS[item.id];
            const isActive = activeId === sectionId;
            return (
              <li key={item.id}>
                <a
                  href={`#${sectionId}`}
                  data-target-id={sectionId}
                  onClick={handleSmoothScroll}
                  className={cn(
                    "transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-secondary-foreground/80",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-2">
          {secondaryHref && secondaryLabel ? (
            <a
              href={secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-sm font-medium text-secondary-foreground/80 transition-colors hover:text-primary lg:block"
            >
              {secondaryLabel}
            </a>
          ) : null}
          <Button asChild size="sm" className="hidden min-w-[140px] bg-primary text-primary-foreground hover:bg-primary/90 lg:inline-flex">
            <a href={primaryHref} target="_blank" rel="noopener noreferrer">
              {primaryLabel}
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
};
