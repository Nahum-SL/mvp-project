// src/lib/gtag.ts
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
) => {
  if (typeof window !== "undefined" && "gtag" in window) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  }
};
