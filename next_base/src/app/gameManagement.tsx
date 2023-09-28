import { Tile } from "./GameBoard";
import { SetStateAction, Dispatch } from "react";
import { shuffle } from "./shuffle";

type shortDisp = Dispatch<SetStateAction<Tile[]>>;
interface resolveParams {
  id: string;
  state: Tile[];
  setState: shortDisp;
  playerNum: number;
}
export function resolveTurn({ id, state, setState, playerNum }: resolveParams) {
  const thisTile = state.filter((e) => e.id === Number(id))[0];
  if (thisTile.owner !== "") {
    return;
  }
  const turn = state.filter((e) => e.owner !== "").length + 1;
  const player = turn % 2 === 0 ? "green" : "blue";
  setState((state) => {
    const newState = state.map((e) => {
      return e.id === thisTile.id ? { ...e, owner: player } : e;
    });
    return newState;
  });
}

export function postRenderOperations(
  state: Tile[],
  setState: shortDisp,
  playerNum: number
) {
  const turn = state.filter((e) => e.owner !== "").length;
  const player = turn % 2 === 0 ? "green" : "blue";
  const gameWon = checkWin({ state: state, player });
  if (gameWon) {
    // endGame(player);
    console.log(player + " wins!");
  } else {
    if (playerNum == 1 && player === "blue") {
      const aiChoice = aiMove(state, turn);
      resolveTurn({
        id: String(aiChoice),
        state: state,
        setState: setState,
        playerNum: playerNum,
      });
    }
  }
}

interface winParams {
  state: Tile[];
  player: "green" | "blue";
}

//Checks if the game has been won by current player: returns true if game is won
function checkWin({ state, player }: winParams) {
  const size = Math.sqrt(state.length);
  const check = player === "blue" ? "col" : "row";
  let playerTiles = state.filter((elem) => elem.owner === player);
  let startingTiles = playerTiles.filter((elem) => elem[check] === 0);
  let endingTiles = playerTiles.filter((elem) => elem[check] === size - 1);

  // If it's impossible for the player to have won at this point, skip the check
  if (!(startingTiles.length && endingTiles.length)) {
    return false;
  }

  // Check for a path from the relevant sides
  playerTiles = playerTiles.filter((elem) => elem[check] !== 0);
  let tilesToCheck = startingTiles.slice();
  while (tilesToCheck.length > 0) {
    // Find neighbouring claimed tiles from the list of tiles to be checked
    let newNeighbours = playerTiles.filter((elem) => {
      let rowDiff = elem.row - tilesToCheck[0].row;
      let colDiff = elem.col - tilesToCheck[0].col;
      return (
        Math.abs(rowDiff) < 2 &&
        Math.abs(colDiff) < 2 &&
        Math.abs(rowDiff + colDiff) < 2
      );
    });

    // Check for a win
    let win = newNeighbours.some((neighbourElem) =>
      endingTiles.some((endingElem) => endingElem.id === neighbourElem.id)
    );
    if (win) {
      return true;
    }

    // Remove neighbours from the list so they aren't considered in future iterations
    playerTiles = playerTiles.filter(
      (elem) => !newNeighbours.some((e) => e.id === elem.id)
    );

    // Add neighbours to checlist
    tilesToCheck.push(...newNeighbours);
    tilesToCheck.shift();
  }
  // If you get here nobody won yet;
  return false;
}

// // Displays the modal window with the winning player
// function endGame(player) {
//   $("#staticBackdrop").css("display", "block");
//   $("#staticBackdrop").toggleClass("show");
//   $(".modal-title").html(`${player} player wins!`);
// }

// Updates game state and computes next AI move if relevant
function aiMove(state: Tile[], turn: number) {
  // Monte-Carlo evaluation of the next best move
  let winCounter = state.map((e) => ({ id: e.id, winPercent: 0 }));
  for (let index = 0; index < 2500; index++) {
    let boardSimulated = state.map((e) => ({
      id: e.id,
      owner: e.owner,
      row: e.row,
      col: e.col,
    }));
    boardSimulated = shuffle<Tile>(boardSimulated);

    // Assign the remaining moves
    let redLeft = Math.ceil((state.length - turn) / 2);
    for (let index = 0; index < boardSimulated.length; index++) {
      if (boardSimulated[index].owner === "") {
        if (redLeft > 0) {
          boardSimulated[index].owner = "green";
          redLeft--;
        } else {
          boardSimulated[index].owner = "blue";
        }
      }
    }
    let roundWon = checkWin({ state: boardSimulated, player: "green" });
    if (roundWon) {
      boardSimulated.forEach((e) => {
        let realTile = state.find((t) => t.id == e.id) as Tile;
        if (e.owner === "green" && realTile.owner === "") {
          let index = winCounter.findIndex((w) => w.id == e.id);
          winCounter[index].winPercent++;
        }
      });
    }
  }

  // Play best move
  let choice = winCounter.reduce(
    function (best, elem) {
      if (elem.winPercent > best.winPercent) {
        return (best = elem);
      } else {
        return best;
      }
    },
    { id: -1, winPercent: 0 }
  );
  return choice.id;
}
