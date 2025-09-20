import React, { type ComponentPropsWithoutRef } from "react";
import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

// Ensure React is available globally for components compiled in legacy JSX mode during tests
Object.assign(globalThis, { React });

class IntersectionObserverMock implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin = "0px";
  readonly thresholds = [0];

  constructor(public readonly callback: IntersectionObserverCallback) {}

  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

(globalThis as unknown as { IntersectionObserver: typeof IntersectionObserver }).IntersectionObserver =
  IntersectionObserverMock as unknown as typeof IntersectionObserver;

type NextImageMockProps = ComponentPropsWithoutRef<"img"> & {
  src: string | { src: string };
  fill?: boolean;
  priority?: boolean;
};

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...rest }: NextImageMockProps) => {
    const { fill, priority, ...imgProps } = rest;
    void fill;
    void priority;

    const resolvedSrc = typeof src === "string" ? src : src.src;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={resolvedSrc} alt={alt ?? ""} {...imgProps} />;
  },
}));
