import { useContext } from "react";
import { colorSides } from "../Utilities/colorSides";
import { generateLabels } from "../Utilities/generateLabels";
import { appContext, owner } from "../Utilities/StateManager";
import { resolveTurn } from "../Utilities/gameManagement";

interface Box {
  box: {
    width: number;
    height: number;
  };
}

// Returns
export function GameBoard({ box }: Box) {
  const { state, dispatch } = useContext(appContext);

  const rowNum = Math.sqrt(state.boardState.length);
  const RAD3 = Math.sqrt(3);
  const boardUnitWidth = rowNum * RAD3 + (RAD3 / 2) * (rowNum - 1);
  const boardUnitHeight = rowNum * 1.5 + 2;
  const sideLength = Math.min(
    Math.round((0.8 * box.height) / boardUnitHeight),
    Math.round((0.8 * box.width) / boardUnitWidth)
  );

  //
  let boardJSX = state.boardState.map((e) => {
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
        id={e.id}
        key={e.id}
        className={`stroke-black stroke-2 cursor-pointer hover:fill-indigo-300
          ${translateOwner(e.owner)}`}
        points={pointString}
        onClick={(event) =>
          resolveTurn({
            id: event.currentTarget.id,
            state: state,
            dispatch: dispatch,
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
function translateOwner(player: number) {
  switch (player) {
    case owner.player1:
      return "fill-player1-tile";
    case owner.player2:
      return "fill-player2-tile";
    default:
      return "fill-transparent";
  }
}
