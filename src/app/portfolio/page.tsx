'use client';

import { useEffect, useState } from "react";

const squareWidth = 50;

export default function Portfolio() {
    const [state, setState] = useState(0);
    const [gridCount, setGridCount] = useState({ columns: 0, rows: 0 });

    useEffect(() => {
        const updateGridSize = () => {
            setGridCount({
                columns: Math.ceil(window.innerWidth / squareWidth),
                rows: Math.ceil(window.innerHeight / squareWidth),
            });
        };

        updateGridSize();
        window.addEventListener("resize", updateGridSize);

        return () => window.removeEventListener("resize", updateGridSize);
    }, []);

    const squares = Array.from({ length: gridCount.columns * gridCount.rows });

    console.debug("Rendering");

    return (
        <main className="min-h-screen bg-black">
            <div className="grid" style={{
                gridTemplateColumns: `repeat(${gridCount.columns}, minmax(0, 1fr))`,
            }}>
                {squares.map((_, index) => (
                    <div
                        key={index}
                        className="aspect-square bg-neutral-800 transition-colors duration-1000 hover:bg-white hover:duration-0"
                    />
                ))}
            </div>
            <div>{state}</div>
            <button onClick={() => setState((prev) => prev + 1)}>Change state</button>
        </main>
    )
}