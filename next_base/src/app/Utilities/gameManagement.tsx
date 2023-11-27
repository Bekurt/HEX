import { Dispatch } from 'react';
import { shuffle } from "./shuffle";
import { Tile, action, owner, state } from "./StateManager";

interface resolveParams {
  id: string;
  state: state;
  dispatch: Dispatch<action>;
}

export function resolveTurn({ id, state, dispatch }: resolveParams) {
  // Check if move is valid
  const board = state.boardState;
  const thisTile = board.filter((e) => e.id === id)[0];
  if (thisTile.owner !== owner.none) {
    return;
  }

  // Evaluate new state
  const turn = board.filter((e) => e.owner !== owner.none).length + 1;
  const player = turn % 2 === 0 ? owner.player2 : owner.player1;
  const move = `${String.fromCharCode(65 + thisTile.col)}${thisTile.row + 1}`;
  const newBoard = board.map((e) => {
    return e.id === thisTile.id ? { ...e, owner: player } : e;
  });
  const newHistory = [...state.moveArray, move];
  dispatch({ type: "color", value: newBoard });
  dispatch({ type: "push", value: newHistory });

  // Check if current player has won and either end game or trigger AI (if relevant)
  const gameWon = checkWin({ state: newBoard, player });
  if (gameWon) {
    dispatch({ type: "win", value: true });
  } else {
    if (state.vsAI && player === owner.player1) {
      setTimeout(() => {
        const aiChoice = aiMove(newBoard, turn);
      resolveTurn({
        id: aiChoice,
        state: { ...state, boardState: newBoard, moveArray: newHistory },
        dispatch: dispatch,
        })
      },0)
    }
  }
}

interface winParams {
  state: Tile[];
  player: owner;
}

//Checks if the game has been won by current player: returns true if game is won
function checkWin({ state, player }: winParams) {
  const size = Math.sqrt(state.length);
  const check = player === owner.player1 ? "col" : "row";
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

// Updates game state and computes next AI move if relevant
function aiMove(board: Tile[], turn: number) {
  // Monte-Carlo evaluation of the next best move
  let winCounter = board.map((e) => ({ id: e.id, winPercent: 0 }));
  for (let index = 0; index < 1500; index++) {
    let boardSimulated = board.map((e) => ({
      id: e.id,
      owner: e.owner,
      row: e.row,
      col: e.col,
    }));
    boardSimulated = shuffle<Tile>(boardSimulated);

    // Assign the remaining moves
    let tilesLeftAI = Math.ceil((board.length - turn) / 2);
    for (let index = 0; index < boardSimulated.length; index++) {
      if (boardSimulated[index].owner === owner.none) {
        if (tilesLeftAI > 0) {
          boardSimulated[index].owner = owner.player2;
          tilesLeftAI--;
        } else {
          boardSimulated[index].owner = owner.player1;
        }
      }
    }
    let roundWon = checkWin({ state: boardSimulated, player: owner.player2 });
    if (roundWon) {
      boardSimulated.forEach((e) => {
        let realTile = board.find((t) => t.id == e.id) as Tile;
        if (e.owner === owner.player2 && realTile.owner === owner.none) {
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
    { id: "", winPercent: 0 }
  );
  return choice.id;
}
