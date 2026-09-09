'use client';

import { useEffect, useMemo, useState } from "react";
import "./portfolio.css";
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
                <div id="gridContainer" className="grid overflow-hidden" style={{
                    gridTemplateColumns: `repeat(${gridCount.columns}, minmax(0, 1fr))`,
                }}>
                    {gridSquares}
                </div>
            </section>}
            <main className="relative font-mono">
                <div className="bg-green-500/50 p-4 rounded-2xl">
                    <h1 className="text-2xl">Marcelo Robert Santos</h1>
                </div>

                <div>{state}</div>
                <button
                    onClick={() => setState((prev) => prev + 1)}
                >
                    Change state
                </button>
                <button
                    onClick={() => setGridEnabled((prev) => !prev)}
                >
                    Toggle grid
                </button>
            </main>
        </>
    )
}