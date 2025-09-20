import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PricingSection } from "@/components/pricing-section";
import { getPageContent } from "@/lib/content";

const { pricing: pricingSection, site } = getPageContent();

describe("PricingSection", () => {
  it("lists included items and pricing tiers", () => {
    render(<PricingSection section={pricingSection} pricing={site.pricing} />);

    expect(screen.getByRole("heading", { name: /Что включено/i })).toBeInTheDocument();
    expect(screen.getByText(/проживание в эко-отеле/i)).toBeInTheDocument();
    expect(screen.getByText((text) => text.includes("1 880$"))).toBeInTheDocument();
    expect(screen.getByText((text) => text.includes("2 390$"))).toBeInTheDocument();
  });
});
