import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PricingSection } from "@/components/pricing-section";
import { getPageContent } from "@/lib/content";

const { pricing: pricingSection, site } = getPageContent();

describe("PricingSection", () => {
  it("lists included items and four pricing lines", () => {
    render(<PricingSection section={pricingSection} pricing={site.pricing} />);

    expect(screen.getByRole("heading", { name: /Что включено/i })).toBeInTheDocument();
    expect(screen.getByText(/проживание в эко-отеле/i)).toBeInTheDocument();
    [
      "Beachside (single)",
      "Beachside (double)",
      "Beachfront (single)",
      "Beachfront (double)",
    ].forEach((label) => {
      const pattern = new RegExp(label.replace(/[()]/g, "\\$&"), "i");
      expect(screen.getByText(pattern)).toBeInTheDocument();
    });

    ["$2,690", "$2,210", "$2,890", "$2,350"].forEach((amount) => {
      expect(screen.getByText(amount)).toBeInTheDocument();
    });
  });
});
