import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const LanguageSelector = () => {
  const locale = useLocale();
  const t = useTranslations("portfolio");

  return (
    <details className="relative">
      <summary
        className="flex h-full items-center border rounded-full p-2 cursor-pointer transition-colors bg-light-gray hover:bg-on-light-gray dark:bg-base-gray dark:hover:bg-on-base-gray [&::-webkit-details-marker]:hidden"
        aria-label={t("languageLabel")}
      >
        <span className="flex items-center gap-1">
          <Image
            className="size-7 inline dark:invert"
            src={`${BASE_PATH}/icons/translation-svgrepo-com.svg`}
            alt="translation icon"
            width="20"
            height="20"
          />
          <span className="hidden sm:inline">{t("languageLabel")}</span>
        </span>
      </summary>
      <div className="absolute right-0 top-full z-20 mt-2 flex min-w-max w-full flex-col gap-1 rounded-xl border bg-light-gray p-1 shadow-lg dark:bg-base-gray">
        <Link
          href="/"
          className={twMerge(
            "flex gap-2 rounded-lg px-3 py-2 transition-colors",
            locale === "en"
              ? "bg-black/15 dark:bg-white/20"
              : "hover:bg-black/10 dark:hover:bg-white/10",
          )}
          aria-label={t("languageEnglish")}
          aria-current={locale === "en" ? "page" : undefined}
        >
          <span aria-hidden="true">🇺🇸</span>
          EN
        </Link>
        <Link
          href="/pt-br"
          className={twMerge(
            "flex gap-2 rounded-lg px-3 py-2 transition-colors",
            locale === "pt-br"
              ? "bg-black/15 dark:bg-white/20"
              : "hover:bg-black/10 dark:hover:bg-white/10",
          )}
          aria-label={t("languagePortuguese")}
          aria-current={locale === "pt-br" ? "page" : undefined}
        >
          <span aria-hidden="true">🇧🇷</span>
          PT-BR
        </Link>
      </div>
    </details>
  );
};
