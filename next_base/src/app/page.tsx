"use client";

import { MainMenu } from "./MainMenu";
import { GameInterface } from "./GameInterface";
import { Dispatch, createContext, useReducer } from "react";

const initialState: state = {
  appState: "menu",
  boardSize: 6,
  playerNum: 1,
};

export const stateContext = createContext<state>(initialState);
export const dispatchContext = createContext<Dispatch<any>>(() => null);

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <main className="w-full h-screen bg-main">
      <dispatchContext.Provider value={dispatch}>
        {state.appState === "menu" && <MainMenu />}
        <stateContext.Provider value={state}>
          {state.appState === "game" && <GameInterface />}
        </stateContext.Provider>
      </dispatchContext.Provider>
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
