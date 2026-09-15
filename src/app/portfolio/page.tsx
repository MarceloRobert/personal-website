'use client';

import "./portfolio.css";
import { useEffect, useMemo, useState } from "react";
import { GlassContainer } from "@/components/GlassContainer";
import { IconLink } from "@/components/IconLink";
import Image from "next/image";

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

export default function Portfolio() {
    const [state, setState] = useState(0);
    const [gridCount, setGridCount] = useState({ columns: 0, rows: 0 });
    const [gridEnabled, setGridEnabled] = useState(true);
    // Array of random values that will be generated once and never changed again so to maintain purity
    const [limitedRandomNums] = useState(() =>
        Uint16Array.from({ length: LTD_RANDOM_NUMS_LEN }, () => Math.floor(Math.random() * UINT16_LIMIT))
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
        ))
    }, [gridCount, limitedRandomNums]);


    console.debug("Rendering");

    return (
        <>
            {gridEnabled && <section id="background" className="fixed h-screen w-screen">
                <div id="gridContainer" className="grid overflow-hidden gap-px" style={{
                    gridTemplateColumns: `repeat(${gridCount.columns}, minmax(0, 1fr))`,
                }}>
                    {gridSquares}
                </div>
            </section>}
            <main className="min-h-screen flex flex-col px-16 bg-base-gray/90 z-10 font-mono text-center sm:max-w-9/10 lg:max-w-5/10 md:max-w-7/10 self-center pt-16 pb-16" style={{ boxShadow: "0px 0px 20px var(--color-base-gray)" }}>
                <button
                    id="toggleGridButton"
                    className="absolute top-4 right-4 dark:bg-white dark:text-black bg-black text-white text-lg transition-all py-2 px-4 rounded-full"
                    onClick={() => setGridEnabled((prev) => !prev)}
                >
                    Toggle grid
                </button>

                <GlassContainer>
                    <h1 className="text-5xl">Marcelo Robert Santos</h1>
                </GlassContainer>
                <div id="links" className="flex justify-center gap-8 pt-4 pb-8">
                    <IconLink
                        text="GitHub"
                        href="https://github.com/MarceloRobert"
                        iconSrc="/icons/GitHub_Invertocat_Black.svg"
                        iconAlt="GitHub logo"
                    />
                    <IconLink
                        text="LinkedIn"
                        href="https://www.linkedin.com/in/marcelorobert/"
                        iconSrc="/icons/InBug-Black.png"
                        iconAlt="LinkedIn logo"
                    />
                </div>

                {SHOW_DEV_TAG && <div>
                    <span>{state} </span>
                    <button
                        onClick={() => setState((prev) => prev + 1)}
                    >
                        Change state
                    </button>
                </div>}

                <div id="summary" className="text-lg lg:max-w-3xl sm:max-w-full self-center">
                    <p>Hi! I&apos;m a Full-Stack developer with experience in frontend, backend, and database. Check out the projects I have worked on!</p>
                </div>

                <section id="experience">
                    <h2 className="text-left text-4xl font-semibold underline mt-10">## Experience</h2>
                    <h3 className="text-2xl my-4">KernelCI Dashboard</h3>
                    <div className="text-left indent-8 gap-2">
                        <div className="inline-flex float-left items-stretch -ml-90">
                            <div id="gradient" className="self-stretch w-80" style={{ background: "linear-gradient(to right, transparent, #ffffff)" }} />
                            <Image className="bg-white p-20 aspect-video mr-6 rounded-r-2xl" src={"/images/portfolio/kernelci-logo-color.svg"} width={400} height={200} alt={"KernelCI Logo"} />
                        </div>
                        <p>KernelCI is an opensource project helping Linux Kernel developers to build and test their code, and they need a dashboard to visualize all the results.</p>
                        <p>I worked on the dashboard&apos;s frontend, backend and database, as well as other features such as CI/CD, unit and integration tests, email notifications, performance monitoring, and more. I was also the development team leader for a while.</p>
                        <p>I contributed to:</p>
                        <ul>
                            <li>· Creating new pages and <a href="https://github.com/kernelci/dashboard/pulls?q=is%3Apr+state%3Aclosed+author%3AMarceloRobert+Feat+-label%3ABackend%2Cbug%2CCI%2FCD%2Cdependencies%2CIngester" target="_blank">multiple features</a> with React;</li>
                            <li>· Database optimizations with Django and PostgreSQL, improving the performance by <a href="https://github.com/kernelci/dashboard/pull/1562" target="_blank">more than 10x</a>;</li>
                            <li>· <a href="https://github.com/kernelci/dashboard/pull/1777" target="_blank">CI/CD and test integrations</a> and with GitHub Actions, increasing the <a href="https://github.com/kernelci/dashboard/tree/main/backend#backend-" target="_blank">backend coverage</a> to 70%;</li>
                            <li>· Feature discussions with Scrum and Kanban in two-week sprints.</li>
                        </ul>
                        <p className="mt-4">Technologies used: React, TypeScript, Django, Python, PostgreSQL, Docker, Git, GitHub Actions, CI/CD, Scrum, Kanban, Cron jobs, Prometheus, Jinja.</p>
                    </div>
                </section>
            </main>
        </>
    )
}
