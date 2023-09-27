"use client";

import { MainMenu } from "./main_menu";
import { GameInterface } from "./game";

export default function HomePage() {
  let stateProxy: string = "game";

  return (
    <main className="w-full h-screen bg-sky-600">
      {stateProxy === "menu" && <MainMenu />}
      {stateProxy === "game" && <GameInterface />}
    </main>
  );
}
