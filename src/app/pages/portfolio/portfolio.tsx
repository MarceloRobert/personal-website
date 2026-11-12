"use client";

import "./portfolio.css";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { GlassContainer } from "@/components/GlassContainer";
import { LinkWithIcon } from "@/components/LinkWithIcon";
import { SocialLinksPill } from "@/components/SocialLinksPill";
import Image from "next/image";
import { ICONS } from "@/constants/icons";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import { StateDebug } from "@/components/StateDebug";
import { PageControls } from "@/components/SettingsControl";

// the css is specific to this page, so we can make a specific css file for it.
// It could be imported as a module (as in portfolio.module.css), which helps with scoping,
// but then we would have to use it as `import styles from "./portfolio.module.css"`,
// and use it like `styles.gridCell` instead of just `gridCell`, which is less convenient.
// But exactly because this is a specific css file, there's not much worry about scoping.
// So the easier use wins.

const SHOW_DEV_TAG = process.env.NEXT_PUBLIC_SHOW_DEV_TAG === "true";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Portfolio() {
  const t = useTranslations("portfolio");
  const [gridEnabled, setGridEnabled] = useState(true);

  return (
    <>
      {gridEnabled && <BackgroundGrid />}
      <SocialLinksPill />
      <main className="portfolioMain min-h-screen min-w-0 w-full flex flex-col self-center z-10 font-mono text-center sm:max-w-9/10 lg:max-w-5/10 md:max-w-7/10 px-8 sm:px-16 pt-16 pb-24">
        <PageControls>
          <button
            id="toggleGridButton"
            className="dark:bg-white dark:text-black bg-black px-4 py-2 text-lg text-white transition-all rounded-full"
            aria-pressed={gridEnabled}
            onClick={() => setGridEnabled((prev) => !prev)}
          >
            {gridEnabled ? t("gridHide") : t("gridShow")}
          </button>
          <ThemeToggle />
          <LanguageSelector />
        </PageControls>
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

        {SHOW_DEV_TAG && <StateDebug />}

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
