import { useEffect, useRef, useState } from "react";

export function GameInterface() {
  return (
    <main id="game" className="w-full h-full flex">
      <section id="game-side" className="h-full w-9/12">
        <header id="hint" className="bg-sky-700 text-black text-sm h-9 p-2">
          Try to connect the opposite sides of the board that match your color!
          First player is Blue
        </header>
        <GameBoard size={14} />
      </section>
      <section id="move-history" className="h-full w-3/12 bg-slate-500">
        <header
          id="history-title"
          className="bg-slate-600 text-black text-sm h-9 p-2"
        >
          Move history
        </header>
      </section>
    </main>
  );
}

interface Tiles {
  id: number;
  row: number;
  col: number;
  owner: string;
}

function GameBoard({ size = 6 }) {
  //Setup of empty board
  const emptyBoard: Tiles[] = [];
  for (let i = 0; i < size * size; i++) {
    emptyBoard.push({
      id: i,
      row: Math.floor(i / size),
      col: i % size,
      owner: "",
    });
  }

  //Hooks
  const [boardState, setBoardState] = useState(emptyBoard);
  const [criticalDimension, setCriticalDimension] = useState(300);
  const dimRef = useRef(null);

  // Create the board
  const board = createBoard(boardState, criticalDimension);

  // useEffect(() => {
  //   let observer = new ResizeObserver((entries, observer) => {
  //     const { inlineSize: width, blockSize: height } =
  //       entries[0].contentBoxSize[0];
  //     setCriticalDimension(height);

  //     observer.disconnect();
  //   });

  //   observer.observe(dimRef as unknown as Element);
  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

  return (
    <svg
      id="game-board"
      viewBox={`0 ${
        -0.2 * criticalDimension
      } ${criticalDimension} ${criticalDimension}`}
      className="h-full w-full"
    >
      {board}
    </svg>
  );
}

function createBoard(boardState: Tiles[], height: number): JSX.Element {
  const rowNum = Math.sqrt(boardState.length);
  const RAD3 = Math.sqrt(3);
  const boardUnit = rowNum * RAD3 + (RAD3 / 2) * (rowNum - 1);
  const sideLength = Math.round((0.8 * height) / boardUnit);

  let JSX = boardState.map((e) => {
    let pointString = `${(e.col * RAD3 + (e.row * RAD3) / 2) * sideLength},${
      (0.5 + e.row * 1.5) * sideLength
    }`;
    pointString += ` ${
      (RAD3 / 2 + e.col * RAD3 + (e.row * RAD3) / 2) * sideLength
    },${e.row * 1.5 * sideLength}`;
    pointString += ` ${
      (RAD3 + e.col * RAD3 + (e.row * RAD3) / 2) * sideLength
    },${(0.5 + e.row * 1.5) * sideLength}`;
    pointString += ` ${
      (RAD3 + e.col * RAD3 + (e.row * RAD3) / 2) * sideLength
    },${(1.5 + e.row * 1.5) * sideLength}`;
    pointString += ` ${
      (RAD3 / 2 + e.col * RAD3 + (e.row * RAD3) / 2) * sideLength
    },${(2 + e.row * 1.5) * sideLength}`;
    pointString += ` ${(e.col * RAD3 + (e.row * RAD3) / 2) * sideLength},${
      (1.5 + e.row * 1.5) * sideLength
    }`;
    return (
      <polygon
        id={String(e.id)}
        key={e.id}
        className={`stroke-black stroke-1 ${translateOwner(e.owner)}`}
        points={pointString}
      ></polygon>
    );
  });

  return <>{JSX}</>;
}

function translateOwner(owner: string): string {
  switch (owner) {
    case "blue":
      return "fill-blue-600";
    case "red":
      return "fill-red-800";
    default:
      return "fill-none";
  }
}
