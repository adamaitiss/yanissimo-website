import { describe, expect, it } from "vitest";

import { getPageContent } from "@/lib/content";

const content = getPageContent();

describe("content model", () => {
  it("exposes hero data", () => {
    expect(content.site.hero.title).toBe("YOGA + OCEAN");
    expect(content.site.hero.datesLine).toBe("27 февраля – 6 марта 2026");
    expect(content.site.hero.secondaryCta.href).toContain("forms.gle");
  });

  it("provides pricing matrix with USD amounts", () => {
    expect(content.site.pricing.currency).toBe("USD");
    expect(content.site.pricing.items).toHaveLength(4);
    expect(content.site.pricing.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "Beachside (single)", price: 2690 }),
        expect.objectContaining({ label: "Beachside (double)", price: 2140 }),
        expect.objectContaining({ label: "Beachfront (single)", price: 2890 }),
        expect.objectContaining({ label: "Beachfront (double)", price: 2290 }),
      ]),
    );
  });

  it("keeps booking deadlines and deposit", () => {
    expect(content.site.booking.deposit).toBe("$400");
    expect(content.site.booking.bookingDeadline).toBe("2025-12-25");
    expect(content.site.booking.balanceDue).toBe("2026-01-25");
  });

  it("mirrors FAQ entries", () => {
    const questions = content.faq.items.map((item) => item.question);
    expect(questions).toContain("Что не входит в стоимость тура?");
    expect(questions).toContain("Что взять с собой?");
  });
});
