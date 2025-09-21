import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Hero } from "@/components/hero";
import { EVENT_DATES_SHORT } from "@/lib/constants";

const baseProps = {
  title: "YOGA + OCEAN",
  location: "Мальдивы",
  datesLine: EVENT_DATES_SHORT,
  secondaryCta: { label: "ЗАБРОНИРОВАТЬ", href: "#booking-form" },
} as const;

describe("Hero", () => {
  it("renders title, location and booking CTA", () => {
    render(<Hero {...baseProps} />);
    expect(screen.getByRole("heading", { level: 1, name: /YOGA \+ OCEAN/i })).toBeInTheDocument();
    expect(screen.getByText(EVENT_DATES_SHORT)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "ЗАБРОНИРОВАТЬ" })).toHaveAttribute("href", "#booking-form");
    expect(screen.queryByRole("link", { name: "СТОИМОСТЬ" })).not.toBeInTheDocument();
  });

  it("renders a primary CTA when provided", () => {
    render(
      <Hero
        {...baseProps}
        primaryCta={{ label: "СТОИМОСТЬ", href: "#pricing" }}
      />,
    );
    expect(screen.getByRole("link", { name: "СТОИМОСТЬ" })).toHaveAttribute("href", "#pricing");
  });
});
