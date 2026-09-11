'use client';

import "./portfolio.css";
import { useEffect, useMemo, useState } from "react";
import { GlassContainer } from "@/components/GlassContainer";
import { IconLink } from "@/components/IconLink";

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
            <main className="min-h-screen flex flex-col px-16 bg-base-gray/90 relative font-mono text-center sm:max-w-9/10 lg:max-w-7/10 self-center pt-16" style={{boxShadow: "0px 0px 20px var(--color-base-gray)" }}>
                <GlassContainer>
                    <h1 className="text-6xl">Marcelo Robert Santos</h1>
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

                <div id="summary" className="lg:max-w-2xl sm:max-w-full self-center">
                    <p>Hi! I&apos;m a Full-Stack developer with experience in frontend, backend, and database. Check out the projects I have worked on!</p>
                </div>

                <button
                    onClick={() => setGridEnabled((prev) => !prev)}
                >
                    Toggle grid
                </button>
            </main>
        </>
    )
}
