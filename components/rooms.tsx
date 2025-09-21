import { SECTION_IDS } from "@/lib/constants";
import type { RoomsSection } from "@/lib/content";
import { RoomGallery } from "@/components/room-gallery";

export type RoomsProps = {
  section: RoomsSection;
};

export const Rooms = ({ section }: RoomsProps) => {
  return (
    <section
      id={SECTION_IDS.rooms}
      aria-labelledby="rooms-heading"
      className="bg-background py-20"
    >
      <div className="mx-auto max-w-6xl space-y-10 px-6 md:px-10">
        <div className="max-w-3xl">
          <h2 id="rooms-heading" className="text-3xl font-semibold text-foreground md:text-4xl">
            {section.title}
          </h2>
        </div>
        <div className="space-y-10">
          {section.cards.map((card) => (
            <article
              key={card.title}
              className="grid gap-6 rounded-3xl border border-border bg-white p-6 text-muted-foreground shadow-sm md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-10"
            >
              <div className="space-y-4">
                <h3 className="text-lg font-semibold uppercase tracking-[0.2em] text-accent">
                  {card.title}
                </h3>
                <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted-foreground/80">
                  {card.size}
                </p>
                <p className="text-base leading-relaxed text-foreground md:text-lg">
                  {card.description}
                </p>
              </div>
              <RoomGallery roomTitle={card.title} images={card.images} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
