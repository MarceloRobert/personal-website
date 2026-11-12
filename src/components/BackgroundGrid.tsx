"use client";

import { useState, useEffect, useMemo } from "react";

const SQUARE_WIDTH = 35;
const LTD_RANDOM_NUMS_LEN = 1000;
const UINT16_LIMIT = 65536;
const ANIMATION_OFFSET = 300; // in seconds, should be more than the animation duration in the css

export function BackgroundGrid() {
  const [gridCount, setGridCount] = useState({ columns: 0, rows: 0 });
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
  );
}
