import { useEffect, useRef, useState } from "react";
import type { state, action } from "./page";

interface Props {
  state: state;
  dispatch: React.Dispatch<action>;
}
export function GameInterface({ state, dispatch }: Props) {
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
          <GameBoard size={state.boardSize} dimRef={dimRef} />
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

interface Tile {
  id: number;
  row: number;
  col: number;
  owner: string;
}

interface Box {
  width: number;
  height: number;
}

function GameBoard({ size = 6, dimRef }: { size: number; dimRef: any }) {
  //Setup of empty board
  const emptyBoard: Tile[] = [];
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
  const [boxSize, setboxSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    let observer = new ResizeObserver((entries) => {
      const { inlineSize: width, blockSize: height } =
        entries[0].contentBoxSize[0];
      setboxSize({ width, height });
    });

    observer.observe(dimRef.current);
    return () => {
      observer.disconnect();
    };
  }, [boxSize, dimRef]);

  return (
    <svg
      id="game-board"
      viewBox={`${-0.1 * boxSize.width} ${-0.1 * boxSize.height} ${
        boxSize.width
      } ${boxSize.height}`}
      className="h-full w-full"
    >
      {createBoard(boardState, boxSize)}
    </svg>
  );
}

// Returns
function createBoard(boardState: Tile[], box: Box): JSX.Element {
  const rowNum = Math.sqrt(boardState.length);
  const RAD3 = Math.sqrt(3);
  const boardUnitWidth = rowNum * RAD3 + (RAD3 / 2) * (rowNum - 1);
  const boardUnitHeight = rowNum * 1.5 + 2;
  const sideLength = Math.min(
    Math.round((0.8 * box.height) / boardUnitHeight),
    Math.round((0.8 * box.width) / boardUnitWidth)
  );

  //EmptyBoard
  let boardJSX = boardState.map((e) => {
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
        className={`stroke-black stroke-2 ${translateOwner(e.owner)}`}
        points={pointString}
      ></polygon>
    );
  });

  //Color sides
  let topString = "";
  for (let n = 0; n < rowNum - 1; n++) {
    topString += ` L${(RAD3 / 2 + n * RAD3) * sideLength},0`;
    topString += ` L${(RAD3 + n * RAD3) * sideLength},${0.5 * sideLength}`;
  }
  topString += ` L${(RAD3 / 2 + (rowNum - 1) * RAD3) * sideLength},0`;
  topString += ` L${(RAD3 * 0.75 + (rowNum - 1) * RAD3) * sideLength},${
    0.25 * sideLength
  }`;

  const topJSX = (
    <path
      className="stroke-player2-side stroke-[3px] fill-none"
      d={`M0,${0.5 * sideLength}` + topString}
    ></path>
  );

  let bottomString = "";
  for (let n = 0; n < rowNum; n++) {
    bottomString += ` L${
      (RAD3 / 2 + n * RAD3 + ((rowNum - 1) * RAD3) / 2) * sideLength
    },${(2 + (rowNum - 1) * 1.5) * sideLength}`;
    bottomString += ` L${
      (RAD3 + n * RAD3 + ((rowNum - 1) * RAD3) / 2) * sideLength
    },${(1.5 + (rowNum - 1) * 1.5) * sideLength}`;
  }

  const bottomJSX = (
    <path
      className="stroke-player2-side stroke-[3px] fill-none"
      d={
        `M${(RAD3 / 4 + ((rowNum - 1) * RAD3) / 2) * sideLength},${
          (1.75 + (rowNum - 1) * 1.5) * sideLength
        }` + bottomString
      }
    ></path>
  );

  let leftString = "";
  for (let n = 0; n < rowNum - 1; n++) {
    leftString += ` L${((n * RAD3) / 2) * sideLength},${
      (1.5 + n * 1.5) * sideLength
    }`;
    leftString += ` L${(RAD3 / 2 + (n * RAD3) / 2) * sideLength},${
      (2 + n * 1.5) * sideLength
    }`;
  }
  leftString += ` L${(((rowNum - 1) * RAD3) / 2) * sideLength},${
    (1.5 + (rowNum - 1) * 1.5) * sideLength
  }`;
  leftString += ` L${(RAD3 / 4 + ((rowNum - 1) * RAD3) / 2) * sideLength},${
    (1.75 + (rowNum - 1) * 1.5) * sideLength
  }`;
  const leftJSX = (
    <path
      className="stroke-player1-side stroke-[3px] fill-none"
      d={`M0,${0.5 * sideLength}` + leftString}
    ></path>
  );

  let rightString = "";
  for (let n = 0; n < rowNum; n++) {
    rightString += ` L${
      (RAD3 + (rowNum - 1) * RAD3 + (n * RAD3) / 2) * sideLength
    },${(0.5 + n * 1.5) * sideLength}`;
    rightString += ` L${
      (RAD3 + (rowNum - 1) * RAD3 + (n * RAD3) / 2) * sideLength
    },${(1.5 + n * 1.5) * sideLength}`;
  }

  const rightJSX = (
    <path
      className="stroke-player1-side stroke-[3px] fill-none"
      d={
        `M${(RAD3 * 0.75 + (rowNum - 1) * RAD3) * sideLength},${
          0.25 * sideLength
        }` + rightString
      }
    ></path>
  );

  //Column denomination (top)
  const counter = [];
  for (let i = 0; i < rowNum; i++) {
    counter.push(i);
  }

  const topLabels = counter.map((e) => {
    return (
      <text
        key={`topLable${e}`}
        x={(e * RAD3 + (-1 * RAD3) / 2 + RAD3 / 2) * sideLength}
        y={(1 - 1 * 1.5) * sideLength + sideLength / 4}
        style={{ textAnchor: "middle", fontSize: `${sideLength / 2}px` }}
      >
        {String.fromCharCode(65 + e)}
      </text>
    );
  });

  const bottomLabels = counter.map((e) => {
    return (
      <text
        key={`bottomLable${e}`}
        x={(e * RAD3 + (rowNum * RAD3) / 2 + RAD3 / 2) * sideLength}
        y={(1 + rowNum * 1.5) * sideLength + sideLength / 4}
        style={{ textAnchor: "middle", fontSize: `${sideLength / 2}px` }}
      >
        {String.fromCharCode(65 + e)}
      </text>
    );
  });

  const leftLabels = counter.map((e) => {
    return (
      <text
        key={`leftLable${e}`}
        x={(-1 * RAD3 + (e * RAD3) / 2 + RAD3 / 2) * sideLength}
        y={(1 + e * 1.5) * sideLength + sideLength / 4}
        style={{ textAnchor: "middle", fontSize: `${sideLength / 2}px` }}
      >
        {1 + e}
      </text>
    );
  });

  const rightLabels = counter.map((e) => {
    return (
      <text
        key={`rightLable${e}`}
        x={(rowNum * RAD3 + (e * RAD3) / 2 + RAD3 / 2) * sideLength}
        y={(1 + e * 1.5) * sideLength + sideLength / 4}
        style={{ textAnchor: "middle", fontSize: `${sideLength / 2}px` }}
      >
        {1 + e}
      </text>
    );
  });

  return (
    <>
      {boardJSX}
      {topJSX}
      {bottomJSX}
      {leftJSX}
      {rightJSX}
      {topLabels}
      {bottomLabels}
      {leftLabels}
      {rightLabels}
    </>
  );
}

// Returns the right class based on the player who owns the tile
function translateOwner(owner: string): string {
  switch (owner) {
    case "blue":
      return "fill-player1-tile";
    case "red":
      return "fill-player2-tile";
    default:
      return "fill-none";
  }
}
