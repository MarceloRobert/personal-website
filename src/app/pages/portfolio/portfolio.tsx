"use client";

import "./portfolio.css";
import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { GlassContainer } from "@/components/GlassContainer";
import { LinkWithIcon } from "@/components/LinkWithIcon";
import { SocialLinksPill } from "@/components/SocialLinksPill";
import Image from "next/image";
import Link from "next/link";
import { ICONS } from "@/constants/icons";

// the css is specific to this page, so we can make a specific css file for it.
// It could be imported as a module (as in portfolio.module.css), which helps with scoping,
// but then we would have to use it as `import styles from "./portfolio.module.css"`,
// and use it like `styles.gridCell` instead of just `gridCell`, which is less convenient.
// But exactly because this is a specific css file, there's not much worry about scoping.
// So the easier use wins.

const SQUARE_WIDTH = 35;
const LTD_RANDOM_NUMS_LEN = 1000;
const UINT16_LIMIT = 65536;
const ANIMATION_OFFSET = 300; // in seconds, should be more than the animation duration in the css
const SHOW_DEV_TAG = process.env.NEXT_PUBLIC_SHOW_DEV_TAG === "true";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Portfolio() {
  const locale = useLocale();
  const t = useTranslations("portfolio");
  const [state, setState] = useState(0);
  const [gridCount, setGridCount] = useState({ columns: 0, rows: 0 });
  const [gridEnabled, setGridEnabled] = useState(true);
  // Array of random values that will be generated once and never changed again so to maintain purity
  const [limitedRandomNums] = useState(() =>
    Uint16Array.from({ length: LTD_RANDOM_NUMS_LEN }, () =>
      Math.floor(Math.random() * UINT16_LIMIT),
    ),
  );

  useEffect(() => {
    const updateGridSize = () => {
      setGridCount({
        columns: Math.ceil(window.innerWidth / SQUARE_WIDTH),
        rows: Math.ceil(window.innerHeight / SQUARE_WIDTH),
      });
    };

    updateGridSize();
    window.addEventListener("resize", updateGridSize);

    return () => window.removeEventListener("resize", updateGridSize);
    // returning a function definition means that the useEffect will run it as a CLEANUP function
    // the cleanup happens whenever the useEffect is re-run, or when the component is unmounted
    // Since this useEffect has no dependencies, it will only run once on mount,
    // and the cleanup will run on unmount
  }, []);

  const gridSquares = useMemo(() => {
    const squares = Array.from({ length: gridCount.columns * gridCount.rows });
    return squares.map((_, index) => (
      <div
        key={index}
        className="gridCell aspect-square"
        style={{
          animationDelay: `${-(limitedRandomNums[index % LTD_RANDOM_NUMS_LEN] / UINT16_LIMIT) * ANIMATION_OFFSET}s`,
        }}
      />
    ));
  }, [gridCount, limitedRandomNums]);

  return (
    <>
      {gridEnabled && (
        <section
          id="background"
          className="fixed h-screen w-screen"
          aria-hidden="true"
        >
          <div
            id="gridContainer"
            className="grid overflow-hidden gap-px h-full w-full"
            style={{
              gridTemplateColumns: `repeat(${gridCount.columns}, minmax(0, 1fr))`,
            }}
          >
            {gridSquares}
          </div>
        </section>
      )}
      <SocialLinksPill />
      <main className="portfolioMain min-h-screen min-w-0 w-full flex flex-col self-center z-10 font-mono text-center sm:max-w-9/10 lg:max-w-5/10 md:max-w-7/10 px-8 sm:px-16 py-16">
        <button
          id="toggleGridButton"
          className="fixed top-4 right-4 dark:bg-white dark:text-black bg-black text-white text-lg transition-all py-2 px-4 rounded-full"
          aria-pressed={gridEnabled}
          onClick={() => setGridEnabled((prev) => !prev)}
        >
          {gridEnabled ? t("gridHide") : t("gridShow")}
        </button>
        <nav
          className="fixed top-4 left-4 flex gap-2 text-sm"
          aria-label={t("languageLabel")}
        >
          <Link href="/" aria-current={locale === "en" ? "page" : undefined}>
            {t("languageEnglish")}
          </Link>
          <Link
            href="/pt-br"
            aria-current={locale === "pt-br" ? "page" : undefined}
          >
            {t("languagePortuguese")}
          </Link>
        </nav>

        <header className="self-center">
          <GlassContainer>
            <h1 className="text-5xl">Marcelo Robert Santos</h1>
          </GlassContainer>
          <nav
            id="links"
            className="flex justify-center gap-8 pt-4 pb-8"
            aria-label="Professional profiles"
          >
            {LinkWithIcon(ICONS.GITHUB)}
            {LinkWithIcon(ICONS.LINKEDIN)}
          </nav>
        </header>

        {SHOW_DEV_TAG && (
          <div>
            <span>{state} </span>
            <button onClick={() => setState((prev) => prev + 1)}>
              Change state
            </button>
          </div>
        )}

        <div id="summary" className="text-lg self-center">
          <p>{t("introduction")}</p>
        </div>

        {SHOW_DEV_TAG && (
          <div className="size-21 lg:bg-red-500 md:bg-amber-500 sm:bg-yellow-300 bg-green-200"></div>
        )}

        <section id="experience">
          <h2 className="portfolioHeading">{t("experienceTitle")}</h2>
          <article>
            <h3 className="portfolioSubheading">{t("kernelciTitle")}</h3>
            <div className="portfolioParagraph">
              <Image
                className="bg-white rounded-2xl mx-auto my-4 p-4 w-62.5"
                src={`${BASE_PATH}/images/portfolio/kernelci-logo-color.svg`}
                width={250}
                height={125}
                alt={t("kernelciLogoAlt")}
              />

              <p>
                {t.rich("kernelciIntro", {
                  profusion: (chunks) => (
                    <ExtLink href="https://profusion.mobi/">{chunks}</ExtLink>
                  ),
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>
              <p>{t("kernelciResponsibilities")}</p>
              <p>{t("kernelciFeaturesIntro")}</p>
              <ul className="portfolioList">
                <li>
                  {t.rich("kernelciFeaturesPages", {
                    featuresLink: (chunks) => (
                      <ExtLink href="https://github.com/kernelci/dashboard/pulls?q=is%3Apr+state%3Aclosed+author%3AMarceloRobert+Feat+-label%3ABackend%2Cbug%2CCI%2FCD%2Cdependencies%2CIngester">
                        {chunks}
                      </ExtLink>
                    ),
                  })}
                </li>
                <li>
                  {t.rich("kernelciFeaturesPerformance", {
                    performanceLink: (chunks) => (
                      <ExtLink href="https://github.com/kernelci/dashboard/pull/1562">
                        {chunks}
                      </ExtLink>
                    ),
                  })}
                </li>
                <li>
                  {t.rich("kernelciFeaturesCicd", {
                    cicdLink: (chunks) => (
                      <ExtLink href="https://github.com/kernelci/dashboard/pull/1777">
                        {chunks}
                      </ExtLink>
                    ),
                    coverageLink: (chunks) => (
                      <ExtLink href="https://github.com/kernelci/dashboard/tree/main/backend#backend-">
                        {chunks}
                      </ExtLink>
                    ),
                  })}
                </li>
                <li>{t("kernelciCeremonies")}</li>
              </ul>
              <p className="technologiesUsed">{t("kernelciTechnologies")}</p>
              <ProjectLink
                text={t("kernelciRepository")}
                href="https://github.com/kernelci/dashboard"
              />
            </div>
          </article>
        </section>
        <section id="projects">
          <h2 className="portfolioHeading">{t("projectsTitle")}</h2>
          <article>
            <h3 className="portfolioSubheading">{t("websiteTitle")}</h3>
            <div className="portfolioParagraph">
              <p>{t("websiteDescription")}</p>
              <p>{t("websiteFeaturesIntro")}</p>
              <ul className="portfolioList">
                <li>{t("websiteFeaturesOne")}</li>
                <li>{t("websiteFeaturesTwo")}</li>
                <li>{t("websiteFeaturesThree")}</li>
                <li>{t("websiteFeaturesFour")}</li>
              </ul>
              <p className="technologiesUsed">{t("websiteTechnologies")}</p>
              <ProjectLink
                text={t("websiteRepository")}
                href="https://github.com/MarceloRobert/personal-website"
              />
            </div>
          </article>
          <hr className="w-1/2 mx-auto my-8" />
          <article>
            <h3 className="portfolioSubheading">{t("hydroponicTitle")}</h3>
            <div className="portfolioParagraph">
              <p>{t("hydroponicDescription")}</p>
              <p>{t("hydroponicDetails")}</p>
              <p className="technologiesUsed">{t("hydroponicTechnologies")}</p>
              <ProjectLink
                text={t("hydroponicRepository")}
                href="https://github.com/MarceloRobert/hidroponic_app"
              />
            </div>
          </article>
          <hr className="w-1/2 mx-auto my-8" />
          <article>
            <h3 className="portfolioSubheading">
              {t("portfolioPlatformTitle")}
            </h3>
            <div className="portfolioParagraph">
              <p>{t("portfolioPlatformDescription")}</p>
              <p>{t("portfolioPlatformDetails")}</p>
              <p className="technologiesUsed">
                {t("portfolioPlatformTechnologies")}
              </p>
              <ProjectLink
                text={t("portfolioPlatformRepository")}
                href="https://github.com/MarceloRobert/web-portfolio"
              />
            </div>
          </article>
        </section>
        <section id="education">
          <h2 className="portfolioHeading">{t("educationTitle")}</h2>
          <h3 className="portfolioSubheading">{t("educationDegree")}</h3>
          <p>{t("educationInstitution")}</p>
          <p>{t("educationPeriod")}</p>
          <p className="mt-4">{t("educationSubjects")}</p>
        </section>
      </main>
    </>
  );
}

const ExtLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

const ProjectLink = ({ text, href }: { text: string; href: string }) => {
  return (
    <div className="text-center indent-0 mt-4">
      <p>{text}</p>
      <ExtLink href={href}>{href}</ExtLink>
    </div>
  );
};
