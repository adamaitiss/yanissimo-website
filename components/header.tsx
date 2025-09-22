"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { SCROLL_OFFSET_PX } from "@/lib/constants";
import { useSectionObserver } from "@/hooks/use-section-observer";
import { cn } from "@/lib/utils";

export type HeaderNavItem = {
  id: string;
  label: string;
};

export type HeaderProps = {
  brand: string;
  navItems: HeaderNavItem[];
  bookLabel: string;
  bookHref: string;
};

export const Header = ({ brand, navItems, bookHref, bookLabel }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const observedIds = useMemo(() => navItems.map((item) => item.id), [navItems]);
  const activeId = useSectionObserver(observedIds);

  const scrollToSection = useCallback((targetId: string) => {
    const element = document.getElementById(targetId);
    if (!element) return;
    const top =
      element.getBoundingClientRect().top + window.scrollY - (targetId === "hero" ? 0 : SCROLL_OFFSET_PX);
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const handleNavClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      const targetId = event.currentTarget.dataset.anchorId;
      if (!targetId) return;
      event.preventDefault();
      setMenuOpen(false);
      scrollToSection(targetId);
    },
    [scrollToSection],
  );

  const isBookAnchor = bookHref.startsWith("#");
  const isBookExternal = /^https?:/i.test(bookHref);

  const createBookClickHandler = useCallback(
    (source: "header" | "header-mobile") => {
      return (event: React.MouseEvent<HTMLAnchorElement>) => {
        trackEvent("book_cta_click", { source });
        if (!isBookAnchor) {
          return;
        }
        event.preventDefault();
        setMenuOpen(false);
        const targetId = bookHref.slice(1);
        scrollToSection(targetId);
      };
    },
    [bookHref, isBookAnchor, scrollToSection],
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-background/95 backdrop-blur transition-shadow",
        isScrolled ? "shadow-[0_1px_0_rgba(0,0,0,0.08)]" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#hero"
          onClick={(event) => {
            event.preventDefault();
            scrollToSection("hero");
          }}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground"
        >
          {brand}
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-anchor-id={item.id}
              onClick={handleNavClick}
              className={cn(
                "transition-colors hover:text-foreground",
                activeId === item.id ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <a
              href={bookHref}
              target={isBookExternal ? "_blank" : undefined}
              rel={isBookExternal ? "noopener noreferrer" : undefined}
              onClick={createBookClickHandler("header")}
            >
              {bookLabel}
            </a>
          </Button>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-full border border-border text-sm text-foreground md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <span className="text-lg">{menuOpen ? "×" : "≡"}</span>
          </button>
        </div>
      </div>
      {menuOpen ? (
        <div
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:backdrop-blur md:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            className="ml-auto flex h-full w-full max-w-sm flex-col justify-between bg-background px-6 py-10 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <nav className="space-y-4 text-lg text-foreground">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  data-anchor-id={item.id}
                  onClick={handleNavClick}
                  className="block"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <Button asChild size="lg" className="w-full">
              <a
                href={bookHref}
                target={isBookExternal ? "_blank" : undefined}
                rel={isBookExternal ? "noopener noreferrer" : undefined}
                onClick={createBookClickHandler("header-mobile")}
              >
                {bookLabel}
              </a>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
};
