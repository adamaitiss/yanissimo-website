import { LightboxGallery } from "@/components/lightbox-gallery";
import { RichText } from "@/components/rich-text";
import { SECTION_IDS } from "@/lib/constants";
import type { GallerySection } from "@/lib/content";
import type { PlaceholderMap } from "@/lib/text";

export type GalleryProps = {
  section: GallerySection;
  replacements?: PlaceholderMap;
};

export const Gallery = ({ replacements, section }: GalleryProps) => {
  return (
    <section
      id={SECTION_IDS.gallery}
      aria-labelledby="gallery-heading"
      className="bg-background py-20"
    >
      <div className="mx-auto max-w-6xl space-y-6 px-6 md:px-10">
        <div className="space-y-4">
          <h2 id="gallery-heading" className="text-3xl font-semibold text-foreground md:text-4xl">
            {section.title}
          </h2>
          {section.description ? (
            <RichText
              as="p"
              text={section.description}
              className="text-base leading-relaxed text-muted-foreground md:text-lg"
              replacements={replacements}
            />
          ) : null}
        </div>
        <LightboxGallery
          images={section.images}
          groupLabel={`галереи «${section.title}»`}
          gridClassName="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          thumbnailSizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          priorityFirst
        />
      </div>
    </section>
  );
};
