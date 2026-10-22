import { NextIntlClientProvider } from "next-intl";
import type { ComponentProps, ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type RootLayoutProps = {
  children: ReactNode;
  locale: string;
  messages: ComponentProps<typeof NextIntlClientProvider>["messages"];
};

export const BASE_METADATA = {
  title: "Marcelo Robert Santos | Portfolio",
  description: "Portfolio of Marcelo Robert Santos, a full-stack developer.",
};

export function RootLayout({ children, locale, messages }: RootLayoutProps) {
  return (
    <html
      lang={locale}
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
