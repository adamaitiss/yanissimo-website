import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PricingSection } from "@/components/pricing-section";

const section = {
  id: "pricing" as const,
  title: "Что включено",
  included: ["проживание", "трансферы"],
};

const unsortedPricing = {
  currency: "USD",
  items: [
    { label: "Beachfront (single)", price: 2890 },
    { label: "Beachside (double)", price: 2140 },
    { label: "Beachfront (double)", price: 2290 },
    { label: "Beachside (single)", price: 2690 },
  ],
};

describe("PricingSection", () => {
  it("displays pricing options in ascending order when provided with sorted data", () => {
    const pricing = {
      ...unsortedPricing,
      items: [...unsortedPricing.items].sort((a, b) => a.price - b.price),
    };

    render(<PricingSection section={section} pricing={pricing} />);
    const prices = screen.getAllByTestId("pricing-price").map((node) => node.textContent);
    expect(prices).toEqual(["$2,140", "$2,290", "$2,690", "$2,890"]);
  });
});
