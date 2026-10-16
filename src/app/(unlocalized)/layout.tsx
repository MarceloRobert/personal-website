import type { Metadata } from "next";
import enMessages from "@messages/en.json";
import { BASE_METADATA, RootLayout } from "@/components/RootLayout";

export const metadata: Metadata = {
  title: BASE_METADATA.title,
  description: BASE_METADATA.description,
};

// In order to change the lang at html-tag level, we need a separate layout outside of [locale] because the html can't access the locale pathParam if it is outside of it.
export default function UnlocalizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootLayout locale="en" messages={enMessages}>
      {children}
    </RootLayout>
  );
}
