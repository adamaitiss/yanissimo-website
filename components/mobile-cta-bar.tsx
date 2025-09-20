"use client";

import { useMemo } from "react";

import type { SiteCopy } from "@/lib/copy";
import type { SiteConfig } from "@/lib/config";
import { extractPlainText } from "@/lib/text";
import type { PlaceholderMap } from "@/lib/text";
import { Button } from "@/components/ui/button";

export type MobileCTABarProps = {
  heroContent: SiteCopy["hero"];
  replacements: PlaceholderMap;
  config: SiteConfig;
};

export const MobileCTABar = ({ heroContent, replacements, config }: MobileCTABarProps) => {
  const [primaryLabel, secondaryLabel] = useMemo(() => {
    return [heroContent.cta_primary, heroContent.cta_secondary].map((text) =>
      extractPlainText(text, replacements),
    );
  }, [heroContent.cta_primary, heroContent.cta_secondary, replacements]);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center gap-2 border-t border-primary/20 bg-white px-4 py-3 shadow-2xl md:hidden">
      <Button asChild className="flex-1" size="lg">
        <a href={config.form_url} target="_blank" rel="noopener noreferrer">
          {primaryLabel}
        </a>
      </Button>
      <Button asChild size="lg" variant="outline" className="flex-1">
        <a href={config.contact_tg} target="_blank" rel="noopener noreferrer">
          {secondaryLabel}
        </a>
      </Button>
    </div>
  );
};
