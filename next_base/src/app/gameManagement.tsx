import { Tile } from "./GameBoard";
import { SetStateAction, Dispatch } from "react";
import { shuffle } from "./shuffle";

interface resolveParams {
  id: string;
  state: Tile[];
  setState: Dispatch<SetStateAction<Tile[]>>;
  playerNum: number;
  setGameWon: Dispatch<SetStateAction<boolean>>;
}

export function resolveTurn({
  id,
  state,
  setState,
  playerNum,
  setGameWon,
}: resolveParams) {
  const thisTile = state.filter((e) => e.id === Number(id))[0];
  if (thisTile.owner !== "") {
    return;
  }
  const turn = state.filter((e) => e.owner !== "").length + 1;
  const player = turn % 2 === 0 ? "yellow" : "green";
  const newState = state.map((e) => {
    return e.id === thisTile.id ? { ...e, owner: player } : e;
  });
  setState(newState);
  const gameWon = checkWin({ state: newState, player });
  if (gameWon) {
    setGameWon(true);
  } else {
    if (playerNum == 1 && player === "green") {
      const aiChoice = aiMove(newState, turn);
      resolveTurn({
        id: String(aiChoice),
        state: newState,
        setState: setState,
        playerNum: playerNum,
        setGameWon: setGameWon,
      });
    }
  }
}

interface winParams {
  state: Tile[];
  player: "yellow" | "green";
}

//Checks if the game has been won by current player: returns true if game is won
function checkWin({ state, player }: winParams) {
  const size = Math.sqrt(state.length);
  const check = player === "green" ? "col" : "row";
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
          boardSimulated[index].owner = "yellow";
          redLeft--;
        } else {
          boardSimulated[index].owner = "green";
        }
      }
    }
    let roundWon = checkWin({ state: boardSimulated, player: "yellow" });
    if (roundWon) {
      boardSimulated.forEach((e) => {
        let realTile = state.find((t) => t.id == e.id) as Tile;
        if (e.owner === "yellow" && realTile.owner === "") {
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
