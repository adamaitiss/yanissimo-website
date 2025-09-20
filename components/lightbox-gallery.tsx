"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export type LightboxImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type LightboxGalleryProps = {
  images: LightboxImage[];
  groupLabel: string;
  gridClassName?: string;
  thumbnailWrapperClassName?: string;
  thumbnailSizes?: string;
  lightboxSizes?: string;
  priorityFirst?: boolean;
};

export const LightboxGallery = ({
  images,
  groupLabel,
  gridClassName = "grid gap-4 sm:grid-cols-2",
  thumbnailWrapperClassName = "group relative overflow-hidden rounded-2xl bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  thumbnailSizes = "(max-width: 768px) 100vw, 50vw",
  lightboxSizes = "90vw",
  priorityFirst = false,
}: LightboxGalleryProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const slides = useMemo(
    () =>
      images.map((image) => ({
        src: image.src,
        alt: image.alt,
        width: image.width,
        height: image.height,
      })),
    [images],
  );

  const handleOpen = useCallback((index: number) => {
    setOpenIndex(index);
  }, []);

  const handleClose = useCallback(() => {
    setOpenIndex(null);
  }, []);

  const activeIndex = openIndex ?? 0;

  return (
    <>
      <div className={gridClassName}>
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => handleOpen(index)}
            className={thumbnailWrapperClassName}
            aria-label={`Открыть фото ${index + 1} из ${images.length} для ${groupLabel}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              sizes={thumbnailSizes}
              priority={priorityFirst && index === 0}
              loading={priorityFirst && index === 0 ? "eager" : "lazy"}
            />
          </button>
        ))}
      </div>
      <Lightbox
        open={openIndex !== null}
        close={handleClose}
        index={activeIndex}
        slides={slides}
        controller={{ closeOnBackdropClick: true }}
        render={{
          slide: ({ slide }) => (
            <div className="flex h-full w-full items-center justify-center bg-black">
              <div className="relative h-full w-full max-h-[90vh] max-w-[90vw]">
                <Image
                  src={slide.src}
                  alt={slide.alt ?? groupLabel}
                  fill
                  sizes={lightboxSizes}
                  className="object-contain"
                />
              </div>
            </div>
          ),
        }}
      />
    </>
  );
};
