"use client";

import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const PageControls = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations("portfolio");
  const [controlsOpen, setControlsOpen] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-20 flex flex-col items-end gap-2">
      <button
        id="toggleControlButton"
        type="button"
        className={twMerge(
          "flex size-12 items-center justify-center rounded-full border bg-light-gray transition-all hover:bg-on-light-gray sm:hidden dark:bg-base-gray dark:hover:bg-on-base-gray",
          controlsOpen && "rotate-30",
        )}
        aria-controls="controlButtons"
        aria-expanded={controlsOpen}
        aria-label={controlsOpen ? t("controlMenuClose") : t("controlMenuOpen")}
        onClick={() => setControlsOpen((prev) => !prev)}
      >
        <Image
          className="size-7 dark:invert"
          src={`${BASE_PATH}/icons/settings-gear-part-2-svgrepo-com.svg`}
          alt="settings icon"
          width="28"
          height="28"
        />
      </button>
      <div
        id="controlButtons"
        className={
          controlsOpen
            ? "flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-4"
            : "hidden sm:flex sm:items-center sm:gap-4"
        }
      >
        {children}
      </div>
    </div>
  );
};
