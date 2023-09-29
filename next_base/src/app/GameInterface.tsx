import { useReducer, useRef } from "react";
import { BoardDisplay } from "./BoardDisplay";
import { Button } from "./Button";

export function GameInterface() {
  const dimRef = useRef(null);
  const [state, dispatch] = useReducer(gameReducer, {
    gameWon: false,
    moveArray: [""],
  });

  return (
    <>
      {state.gameWon && <WinNotification />}
      <main id="game" className="w-full h-full flex">
        <section id="game-side" className="h-full w-9/12 flex flex-col">
          <GameHeader />
          <div
            id="boundary"
            ref={dimRef}
            className="w-full h-[90%] flex-grow bg-tertiary-normal"
          >
            <BoardDisplay dimRef={dimRef} gameDispatch={dispatch} />
          </div>
        </section>
        <section id="move-history" className="h-full w-3/12 flex flex-col">
          <HistoryHeader />
          <History moveArray={state.moveArray} />
        </section>
      </main>
    </>
  );
}

function History({ moveArray }: { moveArray: string[] }) {
  const historyJSX = moveArray.slice(1).map((e, i) => {
    let turn = Math.ceil(i / 2) + 1;
    if (i % 2 === 1) {
      return (
        <div
          key={`yellow-move${turn}`}
          className="w-2/5 float-left bg-player2-tile text-black text-lg pl-3 py-1"
        >
          {e}
        </div>
      );
    } else {
      return (
        <>
          <div
            key={`move${turn}`}
            className="w-1/5 float-left bg-side-title text-lg pl-3 py-1"
          >
            <strong>{turn}</strong>
          </div>
          <div
            key={`green-move${turn}`}
            className="w-2/5 float-left bg-player1-tile text-black text-lg pl-3 py-1"
          >
            {e}
          </div>
        </>
      );
    }
  });
  return (
    <div
      id="history-wrapper"
      className="w-full h-[90%] flex-grow pt-3 bg-side-body"
    >
      {historyJSX}
    </div>
  );
}

function WinNotification() {
  return (
    <div
      id="modal-window"
      className="h-full w-full bg-black bg-opacity-70 first-letter absolute z-10"
    >
      <div
        id="wrapper"
        className="flex justify-center items-center w-full h-full"
      >
        <div
          id="modal-notification"
          className="flex flex-wrap justify-center items-center w-1/2 h-1/3 rounded-3xl bg-secondary mx-auto"
        >
          <span
            id="message"
            className="w-full select-none text-black text-center text-6xl"
          >
            Game Won!
          </span>
          <Button
            id="reset"
            text="New Game"
            colorScheme="tertiary"
            onClick={() => null}
          />
          <Button
            id="back"
            text="Menu"
            colorScheme="warning"
            onClick={() => null}
          />
        </div>
      </div>
    </div>
  );
}

function GameHeader() {
  return (
    <header
      id="hint"
      className="bg-secondary text-black p-2 lg:p-2.5 xl:p-3 2xl:p-3.5 text-sm lg:text-base xl:text-lg 2xl:text-xl h-[10%] max-h-16 flex-shrink-0"
    >
      Try to connect the opposite sides of the board that match your color!
      First player is Green
    </header>
  );
}

function HistoryHeader() {
  return (
    <header
      id="history-title"
      className="bg-side-title text-black p-2 lg:p-2.5 xl:p-3 2xl:p-3.5 text-sm lg:text-base xl:text-lg 2xl:text-xl h-[10%] max-h-16 flex-shrink-0"
    >
      Move history
    </header>
  );
}

interface state {
  gameWon: boolean;
  moveArray: string[];
}

interface action {
  type: string;
  value?: string;
}

function gameReducer(state: state, action: action): state {
  switch (action.type) {
    case "win":
      return { ...state, gameWon: !state.gameWon };
    case "push":
      let move = action.value as string;
      return { ...state, moveArray: [...state.moveArray, move] };
    default:
      return state;
  }
}
