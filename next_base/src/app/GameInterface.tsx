import { useRef } from "react";
import { BoardDisplay } from "./BoardDisplay";

export function GameInterface() {
  const dimRef = useRef(null);

  return (
    <main id="game" className="w-full h-full flex">
      <section id="game-side" className="h-full w-9/12 flex flex-col">
        <header
          id="hint"
          className="bg-secondary text-black p-2 lg:p-2.5 xl:p-3 2xl:p-3.5 text-sm lg:text-base xl:text-lg 2xl:text-xl h-[10%] max-h-16 flex-shrink-0"
        >
          Try to connect the opposite sides of the board that match your color!
          First player is Blue
        </header>
        <div
          id="boundary"
          ref={dimRef}
          className="w-full h-[90%] flex-grow bg-tertiary-normal"
        >
          <BoardDisplay dimRef={dimRef} />
        </div>
      </section>
      <section id="move-history" className="h-full w-3/12 bg-side-body">
        <header
          id="history-title"
          className="bg-side-title text-black p-2 lg:p-2.5 xl:p-3 2xl:p-3.5 text-sm lg:text-base xl:text-lg 2xl:text-xl h-[10%] max-h-16"
        >
          Move history
        </header>
      </section>
    </main>
  );
}
