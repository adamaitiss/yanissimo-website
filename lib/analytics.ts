declare global {
  interface Window {
    gtag?: (...args: Array<string | Record<string, unknown>>) => void;
    plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
  }
}

export const trackEvent = (name: string, props?: Record<string, unknown>) => {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", name, props ?? {});
  }

  if (typeof window.plausible === "function") {
    window.plausible(name, props ? { props } : undefined);
  }
};
export {};
