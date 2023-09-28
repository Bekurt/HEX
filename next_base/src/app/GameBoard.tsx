import { useState } from "react";
import { colorSides } from "./colorSides";
import { generateLabels } from "./generateLabels";

interface Tile {
  id: number;
  row: number;
  col: number;
  owner: string;
}

interface Props {
  size: number;
  box: {
    width: number;
    height: number;
  };
}

// Returns
export function GameBoard({ size, box }: Props): JSX.Element {
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
        onClick={(event) => {
          console.log("fired!");
          const state = colorTile(event.currentTarget.id, boardState);
          setBoardState(state);
        }}
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

// Updates the state when a tile is selected
function colorTile(id: string, boardState: Tile[]) {
  const thisTile = boardState.filter((e) => e.id === Number(id));
  if (thisTile[0].owner === "") {
    const turn = boardState.filter((e) => e.owner !== "").length + 1;
    const player = turn % 2 === 0 ? "red" : "blue";
    const newState = boardState.map((e) => {
      return e.id === thisTile[0].id ? { ...e, owner: player } : e;
    });
    return newState;
  } else {
    return boardState;
  }
}

// Returns the right class based on the player who owns the tile
function translateOwner(owner: string): string {
  switch (owner) {
    case "blue":
      return "fill-player1-tile";
    case "red":
      return "fill-player2-tile";
    default:
      return "fill-transparent";
  }
}
