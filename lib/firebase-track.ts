import { analytics } from "./firebase";
import { logEvent } from "firebase/analytics";

export const trackPageView = (path: string) => {
  if (!analytics) return;
  logEvent(analytics, "page_view", {
    page_path: path,
  });
};

export const trackEvent = (
  name: string,
  params?: Record<string, any>
) => {
  if (!analytics) return;
  logEvent(analytics, name, params);
};
