"use client";

import { useReducer } from "react";
import { MainMenu } from "./MenuComponents/MainMenu";
import { GameInterface } from "./GameComponents/GameInterface";
import { reducer, initialState, appContext } from "./Utilities/StateManager";

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <main className="w-full h-screen bg-main">
      <appContext.Provider value={{ state, dispatch }}>
        {state.isGame ? <GameInterface /> : <MainMenu />}
      </appContext.Provider>
    </main>
  );
}
