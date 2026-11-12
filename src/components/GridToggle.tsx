"use client";

import { useTranslations } from "next-intl";
import { useGrid } from "@/components/GridContext";

export const GridToggle = () => {
  const t = useTranslations("portfolio");
  const { gridEnabled, setGridEnabled } = useGrid();

  return (
    <button
      id="toggleGridButton"
      type="button"
      className="dark:bg-white dark:text-black bg-black px-4 py-2 text-lg text-white transition-all rounded-full"
      aria-pressed={gridEnabled}
      onClick={() => setGridEnabled((prev) => !prev)}
    >
      {gridEnabled ? t("gridHide") : t("gridShow")}
    </button>
  );
};
