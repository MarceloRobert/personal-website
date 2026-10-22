import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const THEME_STORAGE_KEY = "personal-website-theme";
type Theme = "light" | "dark";

export const ThemeToggle = () => {
  const t = useTranslations("portfolio");
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === "light" || savedTheme === "dark") {
      // Since Next is intended to work with SSR, it serves the default theme first and then we check the theme in localStorage. This can cause a mismatch, meaning that the page will render as dark theme, and then rerender as light theme. However, catching the localStorage before the first render is not really possible specially for a website that's static in the end and doing so would cause a hidration error (server serves dark theme, localStorage is different, code changes, render happens, but how did the rendered page is different than what the server sent? that's an issue).
      // So for now I will compromise this problem and let the double-rendering happen, but in the future I could change from SSG to SSR and that would fix it.
      // A reference: https://stackoverflow.com/questions/54819721/next-js-access-localstorage-before-rendering-page
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(savedTheme);
      document.documentElement.dataset.theme = savedTheme;
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  };

  const isDark = theme === "dark";

  return (
    <button
      id="toggleThemeButton"
      className="flex relative items-center gap-1 border rounded-full p-1 transition-colors bg-light-gray hover:bg-on-light-gray dark:bg-base-gray dark:hover:bg-on-base-gray"
      aria-label={isDark ? t("themeLight") : t("themeDark")}
      aria-pressed={!isDark}
      onClick={toggleTheme}
    >
      <span
        className={twMerge(
          "rounded-full p-2 transition-colors z-30",
          isDark && "opacity-30",
        )}
        aria-hidden="true"
      >
        <Image
          className="size-5"
          src={`${BASE_PATH}/icons/sun-svgrepo-com.svg`}
          alt="sun icon"
          width="20"
          height="20"
        />
      </span>
      <span
        className={twMerge(
          "rounded-full p-2 transition-colors z-30",
          !isDark && "opacity-30",
        )}
        aria-hidden="true"
      >
        <Image
          className="size-5"
          src={`${BASE_PATH}/icons/moon-svgrepo-com.svg`}
          alt="moon icon"
          width="20"
          height="20"
        />
      </span>
      <div
        className={twMerge(
          "absolute size-9 rounded-full transition-all duration-500",
          isDark
            ? "translate-x-13/12 bg-white/80"
            : "translate-x-0 bg-black/80",
        )}
        aria-hidden="true"
      />
    </button>
  );
};
