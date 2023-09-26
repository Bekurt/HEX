const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

//Define the default state of the Redux store
let defaultMenuState = {
  playerNumber: 0,
  boardSize: 7,
};
let defaultGameState = {
  turn: 1,
  currentPlayer: "blue"
};

// Definition of all the action types
const NUMBER = "Set the number of players";
const BOARD = "Set the size of the board";
const TURN = "Advances to next turn";
const RESTART = "Reset game state";

//Actions
const setPlayerNumber = (int) => ({ type: NUMBER, value: int });
const setBoardSize = (int) => ({ type: BOARD, value: int });
const nextTurn = () => ({ type: TURN });
const resetState = () => ({ type: RESTART });

//Reducers
const menuReducer = (state = defaultMenuState, action) => {
  switch (action.type) {
    case NUMBER:
      return {
        playerNumber: action.value,
        boardSize: state.boardSize
      };
    case BOARD:
      return {
        playerNumber: state.playerNumber,
        boardSize: action.value
      };
    default:
      return state;
  };
};

const gameReducer = (state = defaultGameState, action) => {
  switch (action.type) {
    case TURN:
      return {
        turn: state.turn + 1,
        currentPlayer: state.currentPlayer == "blue" ? "red" : "blue"
      };
    case RESTART:
      return {
        turn: defaultGameState.turn,
        currentPlayer: defaultGameState.currentPlayer
      };
    default:
      return state;
  }
};

const rootReducer = Redux.combineReducers({ menu: menuReducer, game: gameReducer });

//Store
const store = Redux.createStore(rootReducer);

//Assign events to DOM components (Called upon body loaded)
function addEvents() {
  $("#title-wrapper").click(() => {
    $("#title-wrapper").toggleClass("hidden");
    $("#player-select").toggleClass("hidden");
  });
  $("#select-1").click(() => {
    $("#player-select").toggleClass("hidden");
    $("#difficulty").toggleClass("hidden");
    store.dispatch(setPlayerNumber(1));
  });
  $("#select-2").click(() => {
    $("#player-select").toggleClass("hidden");
    $("#difficulty").toggleClass("hidden");
    store.dispatch(setPlayerNumber(2));
  });
  $("#select-easy").click(() => {
    store.dispatch(setBoardSize(5));
    let size = store.getState().menu.boardSize;
    makeGame(size);
  });
  $("#select-normal").click(() => {
    store.dispatch(setBoardSize(7));
    let size = store.getState().menu.boardSize;
    makeGame(size);
  });
  $("#select-hard").click(() => {
    store.dispatch(setBoardSize(11));
    let size = store.getState().menu.boardSize;
    makeGame(size);
  });
  $("#select-back").click(() => {
    $("#difficulty").toggleClass("hidden");
    $("#player-select").toggleClass("hidden");
  });
  $("#restart-game").click(() => {
    $("#staticBackdrop").css("display", "none");
    $("#staticBackdrop").toggleClass("show");
    $("#main-menu").toggleClass("hidden");
    $("#game").toggleClass("hidden");
    $("#game-board").html("");
    $("#move-container").html("");
    store.dispatch(resetState());
    let size = store.getState().menu.boardSize;
    makeGame(size);
  });
  $("#back-to-menu").click(() => {
    store.dispatch(resetState());
    $("#staticBackdrop").css("display", "none");
    $("#staticBackdrop").toggleClass("show");
    $("#main-menu").toggleClass("hidden");
    $("#game").toggleClass("hidden");
    $("#game-board").html("");
    $("#move-container").html("");
    $("#title-wrapper").toggleClass("hidden");
    $("#difficulty").toggleClass("hidden");
    $("body").css("background-image", "url(./images/HexTrimmed.png)");
  });
};

//Funcion to setup the board and ready for the game
function makeGame(size = 7) {
  //Switch to game view
  $("body").css("background-image", "none");
  $("#main-menu").toggleClass("hidden");
  $("#game").toggleClass("hidden");

  //Define the dimension of the hexagon
  const width = $("#game-side").width();
  const height = $("#game-side").height();
  const aspectRatio = Math.max(height / width, 0.6);
  const RAD3 = Math.sqrt(3);
  const boardUnitWidth = (size * RAD3 + (RAD3 / 2 * (size - 1)));
  const tileSide = aspectRatio * width / boardUnitWidth;
  const tiles = new Array(size * size);
  for (let i = 0; i < tiles.length; i++) {
    tiles[i] = i;
  };

  //Create svg
  let svg = d3.select("#game-board")
    .append("svg")
    .attr("viewBox", `-${0.1 * width} -${0.05 * width} ${width} ${width}`);

  //Create the hexagon
  svg.selectAll("polygon")
    .data(tiles)
    .enter()
    .append("polygon")
    .attr("id", e => e)
    .attr("class", "tile")
    .attr("points", e => {
      const row = Math.floor(e / size);
      const col = (e % size);
      let pointString = `${(col * RAD3 + row * RAD3 / 2) * tileSide},${(0.5 + row * 1.5) * tileSide}`;
      pointString += ` ${(RAD3 / 2 + col * RAD3 + row * RAD3 / 2) * tileSide},${(row * 1.5) * tileSide}`;
      pointString += ` ${(RAD3 + col * RAD3 + row * RAD3 / 2) * tileSide},${(0.5 + row * 1.5) * tileSide}`;
      pointString += ` ${(RAD3 + col * RAD3 + row * RAD3 / 2) * tileSide},${(1.5 + row * 1.5) * tileSide}`;
      pointString += ` ${(RAD3 / 2 + col * RAD3 + row * RAD3 / 2) * tileSide},${(2 + row * 1.5) * tileSide}`;
      pointString += ` ${(col * RAD3 + row * RAD3 / 2) * tileSide},${(1.5 + row * 1.5) * tileSide}`;
      return pointString;
    }).attr("onclick", "resolveTurn(event)");

  //Color top side
  svg.append("path").attr("d", () => {
    let dString = `M0,${0.5 * tileSide}`;
    for (let i = 0; i < size; i++) {
      dString += ` L${(RAD3 / 2 + i * RAD3) * tileSide},0`;
      dString += ` L${(RAD3 + i * RAD3) * tileSide},${0.5 * tileSide}`;
    };
    return dString;
  }).attr("class", "red-side");

  //Color bottom side
  svg.append("path").attr("d", () => {
    let dString = `M${((size - 1) * RAD3 / 2) * tileSide},${(1.5 + (size - 1) * 1.5) * tileSide}`;
    for (let i = 0; i < size; i++) {
      dString += ` L${(RAD3 / 2 + i * RAD3 + (size - 1) * RAD3 / 2) * tileSide},${(2 + (size - 1) * 1.5) * tileSide}`;
      dString += ` L${(RAD3 + i * RAD3 + (size - 1) * RAD3 / 2) * tileSide},${(1.5 + (size - 1) * 1.5) * tileSide}`;
    };
    return dString;
  }).attr("class", "red-side");

  //Color left side
  svg.append("path").attr("d", () => {
    let dString = `M0,${0.5 * tileSide}`;
    for (let i = 0; i < size; i++) {
      dString += ` L${(i * RAD3 / 2) * tileSide},${(1.5 + i * 1.5) * tileSide}`;
      dString += ` L${(RAD3 / 2 + i * RAD3 / 2) * tileSide},${(2 + i * 1.5) * tileSide}`;
    };
    return dString;
  }).attr("class", "blue-side");

  //Color right side
  svg.append("path").attr("d", () => {
    let dString = `M${(RAD3 + (size - 1) * RAD3) * tileSide},${0.5 * tileSide}`;
    dString += ` L${(RAD3 + (size - 1) * RAD3) * tileSide},${1.5 * tileSide}`;
    for (let i = 1; i < size; i++) {
      dString += ` L${(RAD3 + (size - 1) * RAD3 + i * RAD3 / 2) * tileSide},${(0.5 + i * 1.5) * tileSide}`;
      dString += ` L${(RAD3 + (size - 1) * RAD3 + i * RAD3 / 2) * tileSide},${(1.5 + i * 1.5) * tileSide}`;
    };
    return dString;
  }).attr("class", "blue-side");

  let columnList = alphabet.slice(0, size);
  //Column denomination (top)
  for (let i = 0; i < size; i++) {
    svg.append("text")
      .attr("x", (i * RAD3 + RAD3 / 8) * tileSide)
      .attr("y", -0.05 * tileSide)
      .html(columnList[i])
      .style("font-size", `${11 / size}em`);

    //Column denomination (bottom)
    svg.append("text")
      .attr("x", RAD3 * (i + 3 / 8 + size / 2) * tileSide)
      .attr("y", tileSide * ((size - 1) * 1.5 + 2.4))
      .html(columnList[i])
      .style("font-size", `${11 / size}em`);

    //Row denomination (left)
    svg.append("text")
      .attr("x", (RAD3 / 2 * i - 1) * tileSide)
      .attr("y", (1.5 * i + 1.1) * tileSide)
      .html(i + 1)
      .style("font-size", `${11 / size}em`);

    //Row denomination (right)
    svg.append("text")
      .attr("x", (RAD3 / 2 * i + 0.5 + RAD3 * size) * tileSide)
      .attr("y", (1.5 * i + 1.1) * tileSide)
      .html(i + 1)
      .style("font-size", `${11 / size}em`);
  };
};

// Callback for clicking a cell and wrapper for all the functions needed to prosess the turn
function resolveTurn(event) {
  const source = event.target;
  const state = store.getState();
  const AI = state.menu.playerNumber === 1 ? true : false;
  const size = state.menu.boardSize;
  const turn = state.game.turn;
  const player = state.game.currentPlayer;

  assignColor(source, player);
  updateHistory(source, player, size, turn);

  const boardState = getBoardState(size);
  let gameWon = checkWin(boardState, size, player);
  if (gameWon) {
    endGame(player);
  } else {
    store.dispatch(nextTurn());
    if (AI && player === "blue") {
      aiMove(boardState, size, turn);
    };
  };
};

// Function that evaluates the state of the board and returns an object with the information of each tile
function getBoardState(size) {
  let tiles = document.getElementsByClassName("tile");
  let boardState = new Array(size * size);

  // Setup of the board info necessary to find a winner
  for (let idx = 0; idx < boardState.length; idx++) {
    boardState[idx] = {
      id: idx,
      owner: tiles[idx].owner,
      row: Math.floor(idx / size),
      col: idx % size
    };
  }
  return boardState;
}

// Colors the "source" cell based on current player
function assignColor(source, color) {
  switch (color) {
    case "blue":
      source.style["fill"] = "royalblue";
      break;
    case "red":
      source.style["fill"] = "firebrick";
      break;
  }
  source.owner = color;
  source.onclick = "";
};

//Adds moves to right section
function updateHistory(source, color, size, turn) {
  let id = source.id;
  const row = Math.ceil(id / size);
  const col = alphabet[id % size];
  // Turn counter
  if (color === "blue") {
    d3.select("#move-container").append("div")
      .attr("class", `history-entry`)
      .html(Math.ceil(turn / 2));
  }
  // Actual move
  d3.select("#move-container").append("div")
    .attr("class", `history-${color} history-entry`)
    .html(col + row);
  document.getElementById("move-container").scrollBy(0, 1000);
};

//Checks if the game has been won by current player: returns true if game is won
function checkWin(boardState, size, player) {
  let check = player === "blue" ? "col" : "row";
  let playerTiles = boardState.filter(elem => elem.owner === player);
  let startingTiles = playerTiles.filter(elem => elem[check] === 0);
  let endingTiles = playerTiles.filter(elem => elem[check] === size - 1);

  // If it's impossible for the player to have won at this point, skip the check
  if (!(startingTiles.length && endingTiles.length)) {
    return false;
  };

  // Check for a path from the relevant sides
  playerTiles = playerTiles.filter(elem => elem[check] !== 0);
  let tilesToCheck = startingTiles.slice();
  while (tilesToCheck.length > 0) {
    // Find neighbouring claimed tiles from the list of tiles to be checked
    let newNeighbours = playerTiles.filter(elem => {
      let rowDiff = elem.row - tilesToCheck[0].row;
      let colDiff = elem.col - tilesToCheck[0].col;
      return (
        Math.abs(rowDiff) < 2 &&
        Math.abs(colDiff) < 2 &&
        Math.abs(rowDiff + colDiff) < 2
      );
    });

    // Check for a win
    let win = newNeighbours.some(neighbourElem => endingTiles.some(endingElem => endingElem.id === neighbourElem.id));
    if (win) {
      return true;
    }

    // Remove neighbours from the list so they aren't considered in future iterations
    playerTiles = playerTiles.filter(elem => !newNeighbours.some(e => e.id === elem.id));

    // Add neighbours to checlist
    tilesToCheck.push(...newNeighbours);
    tilesToCheck.shift();
  }
  // If you get here nobody won yet;
  return false;
};

// Displays the modal window with the winning player
function endGame(player) {
  $("#staticBackdrop").css("display", "block");
  $("#staticBackdrop").toggleClass("show");
  $(".modal-title").html(`${player} player wins!`);
};

// Updates game state and computes next AI move if relevant
function aiMove(boardState, size, turn) {
  // Monte-Carlo evaluation of the next best move
  let winCounter = boardState.map(e => ({id: e.id, winPercent: 0}));
  for (let index = 0; index < 2500; index++) {
    let boardSimulated = boardState.map( e => ({id: e.id, owner: e.owner, row: e.row, col: e.col}));
    boardSimulated = shuffle(boardSimulated);

    // Assign the remaining moves
    let redLeft = Math.ceil((size ** 2 - turn) / 2);
    for (let index = 0; index < boardSimulated.length; index++) {
      if (boardSimulated[index].owner === undefined) {
        if (redLeft > 0) {
          boardSimulated[index].owner = "red";
          redLeft--;
        } else {
          boardSimulated[index].owner = "blue";
        }
      }
    }
    let roundWon = checkWin(boardSimulated, size, "red")
    if (roundWon) {
      boardSimulated.forEach(e => {
        let realTile = boardState.find(t => t.id == e.id);
        if (e.owner === "red" && realTile.owner === undefined) {
          let index = winCounter.findIndex(w => w.id == e.id);
          winCounter[index].winPercent++;
        }
      });
    }
  }

  // Play best move
  let choice = winCounter.reduce(function(best, elem) { 
    if (elem.winPercent > best.winPercent) {
      return best = elem;
    } else {
      return best;
    }
  }, { winPercent: 0 });
  resolveTurn({target: document.getElementById(choice.id)});
};

// Fisher-Yates random shuffle algorithm
function shuffle(array) {
  for (let index = array.length - 1; index > 0; index--) {
    const randIdx = Math.floor(Math.random() * index);
    const memory = array[index];
    array[index] = array[randIdx];
    array[randIdx] = memory;
  }
  return array;
}