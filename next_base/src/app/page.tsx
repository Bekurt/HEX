"use client";

import { MainMenu } from "./MainMenu";
import { GameInterface } from "./GameInterface";
import { createContext, useReducer } from "react";

export const stateContext = createContext({
  appState: "menu",
  boardSize: 6,
  playerNum: 1,
});

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, {
    appState: "menu",
    boardSize: 6,
    playerNum: 1,
  });

  return (
    <main className="w-full h-screen bg-main">
      {state.appState === "menu" && <MainMenu dispatch={dispatch} />}
      <stateContext.Provider value={state}>
        {state.appState === "game" && <GameInterface />}
      </stateContext.Provider>
    </main>
  );
}

export interface state {
  appState: "menu" | "game";
  boardSize: number;
  playerNum: number;
}

export interface action {
  type: "switch-mode" | "set-size" | "set-players";
  value?: string | number;
}

function reducer(state: state, action: action): state {
  switch (action.type) {
    case "switch-mode":
      let otherMode: "menu" | "game" =
        state.appState === "game" ? "menu" : "game";
      return { ...state, appState: otherMode };
    case "set-size":
      let size = action.value as number;
      return { ...state, boardSize: size };
    case "set-players":
      let players = action.value as number;
      return { ...state, playerNum: players };
    default:
      return state;
  }
}
