import { useTranslations } from "next-intl";

export const Footer = () => {
  const t = useTranslations("portfolio");

  return (
    <footer className="border-t px-8 py-6 text-center text-sm z-20 dark:bg-base-gray bg-light-gray">
      <p>{t("storageNotice")}</p>
      <p>
        General vectors and icons by{" "}
        <a
          href="https://www.svgrepo.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          SVG Repo
        </a>
        . Brand vectors by their respective owners.
      </p>
    </footer>
  );
};
