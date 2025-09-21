import { describe, expect, it } from "vitest";

import { getPageContent } from "@/lib/content";
import { EVENT_DATES_FULL, EVENT_DATES_SHORT, EVENT_END, EVENT_START } from "@/lib/constants";

const content = getPageContent();

describe("content model", () => {
  it("exposes hero data", () => {
    expect(content.site.hero.title).toBe("YOGA + OCEAN");
    expect(content.site.hero.datesLine).toBe(EVENT_DATES_SHORT);
    expect(content.site.event.startDate).toBe(EVENT_START);
    expect(content.site.event.endDate).toBe(EVENT_END);
    expect(content.site.event.description).toContain(EVENT_DATES_FULL);
    expect(content.site.hero.secondaryCta.href).toBe("#booking-form");
  });

  it("provides gallery imagery", () => {
    expect(content.gallery.id).toBe("gallery");
    expect(content.gallery.images).toHaveLength(18);
    expect(content.gallery.images[0]).toEqual(
      expect.objectContaining({ src: "/gallery/arrival-pavilion-sunset.webp", width: 1920, height: 1440 }),
    );
  });

  it("provides pricing matrix with USD amounts", () => {
    expect(content.site.pricing.currency).toBe("USD");
    expect(content.site.pricing.items).toHaveLength(4);
    expect(content.site.pricing.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "Beachside (single)", price: 2690 }),
        expect.objectContaining({ label: "Beachside (double)", price: 2210 }),
        expect.objectContaining({ label: "Beachfront (single)", price: 2890 }),
        expect.objectContaining({ label: "Beachfront (double)", price: 2350 }),
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
