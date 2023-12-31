import { useState, Dispatch, SetStateAction } from "react";
import { TitleScreen } from "./TitleScreen";
import { PlayerSelect } from "./PlayerSelect";
import { DifficultySelect } from "./DifficultySelect";

export type navStateProp = {
  setNavState: Dispatch<SetStateAction<"title" | "player" | "diff">>;
};

export function MainMenu() {
  let [navState, setNavState] = useState(
    "title" as "title" | "player" | "diff"
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
        {navState === "player" && <PlayerSelect setNavState={setNavState} />}
        {navState === "diff" && <DifficultySelect setNavState={setNavState} />}
      </div>
    </div>
  );
}
