import { useContext, useRef } from "react";
import { BoardDisplay } from "./BoardDisplay";
import { History } from "./History";
import { WinNotification } from "./WinNotification";
import { Header } from "../Utilities/Components/Header";
import { Section } from "../Utilities/Components/Section";
import { appContext } from "../Utilities/StateManager";

export function GameInterface() {
  const { state, dispatch } = useContext(appContext);
  const dimRef = useRef(null);

  return (
    <>
      {state.isWon && <WinNotification />}
      <main id="game" className="w-full h-full flex">
        <Section id="game-side" width="w-9/12">
          <Header
            id="hint"
            color="bg-secondary"
            text="Try to connect the opposite sides of the board that match your color!
       Green is first."
          />
          <div
            id="boundary"
            ref={dimRef}
            className="w-full h-[90%] flex-grow bg-tertiary-normal"
          >
            <BoardDisplay dimRef={dimRef} />
          </div>
        </Section>
        <Section id="move-history" width="w-3/12">
          <Header
            id="history-header"
            color="bg-side-title"
            text="Move History"
          />
          <History moveArray={state.moveArray} />
        </Section>
      </main>
    </>
  );
}
