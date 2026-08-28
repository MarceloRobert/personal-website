'use client';

import {useState } from "react";

export default function Portfolio() {
    const squares = Array.from({ length: 900 });
    const [state, setState] = useState(0);

    console.log("Rendering");

    return (
        <main className="min-h-screen bg-black">
            <div className="grid grid-cols-50">
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