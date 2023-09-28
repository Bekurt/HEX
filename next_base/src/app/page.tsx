"use client";

import { MainMenu } from "./MainMenu";
import { GameInterface } from "./GameInterface";
import { useState } from "react";

export default function HomePage() {
  const [appState, setAppState] = useState("menu" as "menu" | "game");
  const [playerChoice, setPlayerChoice] = useState({
    boardSize: 6,
    playerNum: 1,
  });

  return (
    <main className="w-full h-screen bg-main">
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
