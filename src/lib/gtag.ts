// src/lib/gtag.ts
// ---- SIN USAR -----
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
