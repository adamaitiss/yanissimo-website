"use client";

import Image from "next/image";
import { useCallback } from "react";

import { trackEvent } from "@/lib/analytics";
import { SECTION_IDS, SCROLL_OFFSET_PX } from "@/lib/constants";
import { IMAGE_PLACEHOLDERS } from "@/lib/generated/image-placeholders";

export type HeroProps = {
  title: string;
  location: string;
  datesLine: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export const Hero = ({ datesLine, location, primaryCta, secondaryCta, title }: HeroProps) => {
  const scrollToAnchor = useCallback((href: string) => {
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET_PX;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const handleAnchorClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      const anchor = event.currentTarget.getAttribute("href");
      if (!anchor?.startsWith("#")) return;
      event.preventDefault();
      scrollToAnchor(anchor);
      trackEvent("pricing_cta_click", { source: "hero" });
    },
    [scrollToAnchor],
  );

  const handleBookClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      trackEvent("book_cta_click", { source: "hero" });
      if (!secondaryCta.href.startsWith("#")) {
        return;
      }
      event.preventDefault();
      scrollToAnchor(secondaryCta.href);
    },
    [scrollToAnchor, secondaryCta.href],
  );

  return (
    <section
      id={SECTION_IDS.hero}
      className="relative isolate flex min-h-[92vh] items-end overflow-hidden bg-black text-white"
    >
      <picture className="pointer-events-none absolute inset-0">
        <source srcSet="/images/hero-aerial.avif" type="image/avif" />
        <source srcSet="/images/hero-aerial.webp" type="image/webp" />
        <Image
          src="/images/hero-aerial-original.jpg"
          alt="Мальдивы, вид на лагуну и пляж"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={IMAGE_PLACEHOLDERS.hero}
          className="object-cover"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/75" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 pb-24 pt-40 md:px-10 md:pb-28">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-white/80">{location}</p>
          <h1 className="text-5xl font-semibold leading-tight md:text-6xl">{title}</h1>
          <p className="text-lg font-medium tracking-[0.12em] text-white/80 md:text-xl">{datesLine}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={primaryCta.href}
            onClick={handleAnchorClick}
            className="inline-flex min-w-[160px] items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-white/85"
          >
            {primaryCta.label}
          </a>
          <a
            href={secondaryCta.href}
            target={secondaryCta.href.startsWith("#") ? undefined : "_blank"}
            rel={secondaryCta.href.startsWith("#") ? undefined : "noopener noreferrer"}
            onClick={handleBookClick}
            className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-white/70 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
          >
            {secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
};
