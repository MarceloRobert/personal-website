"use client";

import { useState } from "react";

export const StateDebug = () => {
  const [state, setState] = useState(0);

  console.log("StateDebug rendered");

  return (
    <div>
      <span>{state} </span>
      <button onClick={() => setState((prev: number) => prev + 1)}>
        Change state
      </button>
    </div>
  );
};
