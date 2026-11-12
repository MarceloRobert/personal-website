import { notFound } from "next/navigation";
import Portfolio from "../pages/portfolio/portfolio";
import { Locale, locales } from "@/i18n/locales";

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // get the locale from the params (url) because the `getLocale` does not work with page router
  // More refs at:
  // https://generaltranslation.com/en-US/docs/react/nextjs/reference/functions/get-locale
  // https://generaltranslation.com/en-US/docs/react/nextjs/reference/functions/get-translations
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return <Portfolio locale={locale as Locale} />;
}
