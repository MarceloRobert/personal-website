import en from "@messages/en.json";
import ptBr from "@messages/pt-br.json";

export const locales = ["en", "pt-br"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = locales[0];

export const messages = {
  en,
  "pt-br": ptBr,
};
