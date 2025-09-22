"use client";

import { type MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type LightboxImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  fullSrc?: string;
  thumbnailSrc?: string;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
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
        src: image.fullSrc ?? image.src,
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
  const activeSlide = slides[activeIndex];
  const totalSlides = slides.length;

  const showControls = totalSlides > 1;

  const handlePrev = useCallback(() => {
    setOpenIndex((current) => {
      if (current === null) return totalSlides - 1;
      return current === 0 ? totalSlides - 1 : current - 1;
    });
  }, [totalSlides]);

  const handleNext = useCallback(() => {
    setOpenIndex((current) => {
      if (current === null) return 0;
      return current === totalSlides - 1 ? 0 : current + 1;
    });
  }, [totalSlides]);

  useEffect(() => {
    if (openIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
      }
      if (!showControls) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [handleClose, handleNext, handlePrev, openIndex, showControls]);

  const handleBackdropClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        handleClose();
      }
    },
    [handleClose],
  );

  return (
    <>
      <div className={gridClassName}>
        {images.map((image, index) => {
          const thumbnailWidth = Math.max(1, image.thumbnailWidth ?? image.width);
          const thumbnailHeight = Math.max(1, image.thumbnailHeight ?? image.height);
          const derivedThumbnail = image.thumbnailSrc ?? image.src;

          return (
            <button
              key={`${image.src}-${index}`}
              type="button"
              onClick={() => handleOpen(index)}
              className={thumbnailWrapperClassName}
              aria-label={`Открыть фото ${index + 1} из ${images.length} для ${groupLabel}`}
            >
              <Image
                src={derivedThumbnail}
                alt={image.alt}
                width={thumbnailWidth}
                height={thumbnailHeight}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                sizes={thumbnailSizes}
                priority={priorityFirst && index === 0}
                loading={priorityFirst && index === 0 ? "eager" : "lazy"}
                decoding={priorityFirst && index === 0 ? undefined : "async"}
              />
            </button>
          );
        })}
      </div>
      {openIndex !== null && activeSlide ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={groupLabel}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={handleBackdropClick}
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Закрыть галерею"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          {showControls ? (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Предыдущее фото"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Следующее фото"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
              <span className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.3em] text-white">
                {activeIndex + 1}/{totalSlides}
              </span>
            </>
          ) : null}
          <div className="relative flex h-full w-full max-h-[90vh] max-w-[90vw] items-center justify-center">
            <Image
              src={activeSlide.src}
              alt={activeSlide.alt ?? groupLabel}
              fill
              sizes={lightboxSizes}
              className="object-contain"
              loading="eager"
              priority
            />
          </div>
        </div>
      ) : null}
    </>
  );
};
