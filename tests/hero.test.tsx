import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Hero } from "@/components/hero";
import { EVENT_DATES_SHORT } from "@/lib/constants";

const props = {
  title: "YOGA + OCEAN",
  location: "Мальдивы",
  datesLine: EVENT_DATES_SHORT,
  primaryCta: { label: "СТОИМОСТЬ", href: "#pricing" },
  secondaryCta: { label: "ЗАБРОНИРОВАТЬ", href: "#booking-form" },
};

describe("Hero", () => {
  it("renders title, location and CTAs", () => {
    render(<Hero {...props} />);
    expect(screen.getByRole("heading", { level: 1, name: /YOGA \+ OCEAN/i })).toBeInTheDocument();
    expect(screen.getByText(EVENT_DATES_SHORT)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "СТОИМОСТЬ" })).toHaveAttribute("href", "#pricing");
    expect(screen.getByRole("link", { name: "ЗАБРОНИРОВАТЬ" })).toHaveAttribute("href", "#booking-form");
  });
});
