// lib/gtag.ts

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID ?? ""

// ---- Global window typing ----
declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js",
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void
  }
}

// ---- Page view tracking ----
export const pageview = (url: string): void => {
  if (!GA_TRACKING_ID || typeof window === "undefined" || !window.gtag) {
    return
  }

  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  })
}

// ---- Event tracking ----
export interface GtagEvent {
  action: string
  category?: string
  label?: string
  value?: number
}

export const event = ({
  action,
  category,
  label,
  value,
}: GtagEvent): void => {
  if (!GA_TRACKING_ID || typeof window === "undefined" || !window.gtag) {
    return
  }

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  })
}
