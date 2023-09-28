import React, { useState } from "react";
import type { state, action } from "./page";
import { TitleScreen } from "./TitleScreen";
import { PlayerSelect } from "./PlayerSelect";
import { DifficultySelect } from "./DifficultySelect";

interface Props {
  dispatch: React.Dispatch<action>;
}

export function MainMenu({ dispatch }: Props) {
  let [navState, setNavState] = useState(
    "title" as "title" | "player" | "difficulty"
  );

  return (
    <div
      id="background-animation"
      className="w-full h-full flex items-center bg-hexTri bg-[length:1400px_840px] bg-center animate-marqee overflow-hidden"
    >
      <div
        id="menu-bar"
        className="w-full h-2/5 border border-black bg-secondary"
      >
        {navState === "title" && <TitleScreen setNavState={setNavState} />}
        {navState === "player" && (
          <PlayerSelect dispatch={dispatch} setNavState={setNavState} />
        )}
        {navState === "difficulty" && (
          <DifficultySelect dispatch={dispatch} setNavState={setNavState} />
        )}
      </div>
    </div>
  );
}
