import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, messages, type Locale } from "@/i18n/locales";
import { BASE_METADATA, RootLayout } from "@/components/RootLayout";

export const metadata: Metadata = {
  title: BASE_METADATA.title,
  description: BASE_METADATA.description,
};

export function generateStaticParams() {
  // Though english is supported, it is served in the root path
  // so we don't need to generate a separate static page for it.
  return locales
    .filter((locale) => locale !== "en")
    .map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <RootLayout locale={locale} messages={messages[locale as Locale]}>
      {children}
    </RootLayout>
  );
}
