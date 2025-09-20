import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Hero } from "@/components/hero";

const props = {
  title: "YOGA + OCEAN",
  location: "Мальдивы",
  datesLine: "27 февраля–6 марта 2026",
  primaryCta: { label: "СТОИМОСТЬ", href: "#pricing" },
  secondaryCta: { label: "ЗАБРОНИРОВАТЬ", href: "https://forms.gle/CQEx2U2KduZYjZ5SA" },
};

describe("Hero", () => {
  it("renders title, location and CTAs", () => {
    render(<Hero {...props} />);
    expect(screen.getByRole("heading", { level: 1, name: /YOGA \+ OCEAN/i })).toBeInTheDocument();
    expect(screen.getByText(/27 февраля–6 марта 2026/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "СТОИМОСТЬ" })).toHaveAttribute("href", "#pricing");
    expect(screen.getByRole("link", { name: "ЗАБРОНИРОВАТЬ" })).toHaveAttribute(
      "href",
      "https://forms.gle/CQEx2U2KduZYjZ5SA",
    );
  });
});
