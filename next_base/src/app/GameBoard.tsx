import { useContext, useEffect, useState } from "react";
import { colorSides } from "./colorSides";
import { generateLabels } from "./generateLabels";
import { postRenderOperations, resolveTurn } from "./gameManagement";
import { stateContext } from "./page";

export interface Tile {
  [key: string]: number | string;
  id: number;
  row: number;
  col: number;
  owner: string;
}

interface Props {
  box: {
    width: number;
    height: number;
  };
}

// Returns
export function GameBoard({ box }: Props): JSX.Element {
  const menuState = useContext(stateContext);
  const size = menuState.boardSize;
  const emptyBoard: Tile[] = [];
  for (let i = 0; i < size * size; i++) {
    emptyBoard.push({
      id: i,
      row: Math.floor(i / size),
      col: i % size,
      owner: "",
    });
  }
  const [boardState, setBoardState] = useState(emptyBoard);

  // Fires the check for a winner after state change is rendered
  useEffect(() => {
    postRenderOperations(boardState, setBoardState, menuState.playerNum);
  }, [boardState, menuState.playerNum]);

  const rowNum = Math.sqrt(boardState.length);
  const RAD3 = Math.sqrt(3);
  const boardUnitWidth = rowNum * RAD3 + (RAD3 / 2) * (rowNum - 1);
  const boardUnitHeight = rowNum * 1.5 + 2;
  const sideLength = Math.min(
    Math.round((0.8 * box.height) / boardUnitHeight),
    Math.round((0.8 * box.width) / boardUnitWidth)
  );

  //
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
        className={`stroke-black stroke-2 ${translateOwner(
          e.owner
        )} cursor-pointer`}
        points={pointString}
        onClick={(event) =>
          resolveTurn({
            id: event.currentTarget.id,
            state: boardState,
            setState: setBoardState,
            playerNum: menuState.playerNum,
          })
        }
      ></polygon>
    );
  });

  //Color sides
  const sidesJSX = colorSides(rowNum, RAD3, sideLength);

  //Make labels
  const labelsJSX = generateLabels(rowNum, RAD3, sideLength);

  return (
    <>
      {boardJSX}
      {sidesJSX}
      {labelsJSX}
    </>
  );
}

// Returns the right class based on the player who owns the tile
function translateOwner(owner: string): string {
  switch (owner) {
    case "blue":
      return "fill-player1-tile";
    case "green":
      return "fill-player2-tile";
    default:
      return "fill-transparent";
  }
}
