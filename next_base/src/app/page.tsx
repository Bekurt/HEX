"use client";

import { MainMenu } from "./main_menu";
import { GameInterface } from "./game";
import { useState } from "react";

export default function HomePage() {
  const [appState, setAppState] = useState("menu" as "menu" | "game");
  const [playerChoice, setPlayerChoice] = useState({
    boardSize: 6,
    playerNum: 1,
  });

  return (
    <main className="w-full h-screen bg-sky-600">
      {appState === "menu" && (
        <MainMenu
          switchInterface={setAppState}
          setChoice={setPlayerChoice}
          playerChoice={playerChoice}
        />
      )}
      {appState === "game" && (
        <GameInterface
          switchInterface={setAppState}
          playerChoice={playerChoice}
        />
      )}
    </main>
  );
}
