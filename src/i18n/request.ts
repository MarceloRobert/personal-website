import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { defaultLocale, Locale, locales, messages } from "./locales";

export default getRequestConfig(async ({ locale }) => {
  // In the case of outputing "export" (static files), this function only runs when Next is building the pages. When next runs in the server, it is called when the first internationalized component is rendered.
  // Check https://next-intl.dev/docs/usage/configuration

  // Since I'm currently using static generation, the settings here will be simple.

  const safeLocale: Locale =
    locale && hasLocale(locales, locale) ? locale : defaultLocale;

  return {
    locale: safeLocale,
    messages: messages[safeLocale], // in this case I know that locale is of Locale type
  };
});
