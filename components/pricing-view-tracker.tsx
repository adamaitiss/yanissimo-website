"use client";

import { useEffect, useRef } from "react";

import { trackEvent } from "@/lib/analytics";

export const PricingViewTracker = ({ sectionId }: { sectionId: string }) => {
  const hasTracked = useRef(false);

  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !hasTracked.current) {
          hasTracked.current = true;
          trackEvent("pricing_section_view");
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionId]);

  return null;
};
