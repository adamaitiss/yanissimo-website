"use client";

import { useEffect, useState } from "react";

import { trackEvent } from "@/lib/analytics";
import { SCROLL_OFFSET_PX } from "@/lib/constants";
import { Button } from "@/components/ui/button";

type CTAConfig = {
  label: string;
  href: string;
  external?: boolean;
};

export type MobileCTABarProps = {
  primary: CTAConfig;
  secondary: CTAConfig;
};

export const MobileCTABar = ({ primary, secondary }: MobileCTABarProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 220);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isPrimaryAnchor = primary.href.startsWith("#");
  const primaryProps = primary.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const secondaryProps = secondary.external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  const handleAnchorScroll = (href: string) => {
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    const offset = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET_PX;
    window.scrollTo({ top: offset, behavior: "smooth" });
  };

  return (
    <div
      className="fixed inset-x-0 bottom-4 z-40 flex translate-y-[120%] items-center justify-center md:hidden"
      aria-hidden={!visible}
    >
      <div
        className={`mx-auto flex w-[calc(100%-2rem)] max-w-lg items-center gap-2 rounded-full border border-border bg-background/98 px-3 py-3 shadow-xl transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-[120%]"}`}
      >
        <Button asChild className="flex-1" size="lg">
          <a
            href={primary.href}
            onClick={(event) => {
              trackEvent("book_cta_click", { source: "mobile-bar" });
              if (isPrimaryAnchor) {
                event.preventDefault();
                handleAnchorScroll(primary.href);
              }
            }}
            {...primaryProps}
          >
            {primary.label}
          </a>
        </Button>
        <Button asChild size="lg" variant="outline" className="flex-1">
          <a
            href={secondary.href}
            onClick={() => trackEvent("contact_click", { source: "mobile-bar", channel: secondary.label })}
            {...secondaryProps}
          >
            {secondary.label}
          </a>
        </Button>
      </div>
    </div>
  );
};
