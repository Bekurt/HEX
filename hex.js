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

//Actions
const setPlayerNumber = (int) => ({ type: NUMBER, value: int });
const setBoardSize = (int) => ({ type: BOARD, value: int });
const nextTurn = () => ({ type: TURN });

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
    default:
      return state;
  }
};

const rootReducer = Redux.combineReducers({ menu: menuReducer, game: gameReducer });

//Store
const store = Redux.createStore(rootReducer);

//Assign events to DOM components (Called upon body loaded)
function addEvents() {
  $("#select-1").click(() => {
    store.dispatch(setPlayerNumber(1));
  });
  $("#select-2").click(() => {
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
}

//Funcion to setup the board and ready for the game
function makeGame(size = 7) {
  //Switch to game view
  $("body").css("background-image", "none");
  $("#main-menu").toggleClass("hidden");
  $("#game").toggleClass("hidden");

  //Define the dimension of the hexagon
  const width = $("#game-board").width();
  const height = $("#game-board").height();
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
    }).attr("onclick", "assignColor(event)");

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

// Callback for clicking a cell: colors it based on current player and advances the game
function assignColor(event) {
  let source = event.target;
  let gameState = store.getState().game;
  switch (gameState.currentPlayer) {
    case "blue":
      source.style["fill"] = "royalblue";
      break;
    case "red":
      source.style["fill"] = "firebrick";
      break;
  }
  source.onclick = "";
  updateHistory(source, gameState.currentPlayer);
  checkWin();
  nextMove();
}

//Adds moves to right section
function updateHistory(trigger, color) {
  let id = trigger.id;
  let size = store.getState().menu.boardSize;
  const row = Math.ceil(id / size);
  const col = alphabet[id % size];
  if (color === "blue"){
    d3.select("#move-history").append("div")
    .attr("class", `history-entry`)
    .html(Math.ceil(store.getState().game.turn / 2));
  }
  d3.select("#move-history").append("div")
    .attr("class", `history-${color} history-entry`)
    .html(col + row);
  document.getElementById("move-history").scrollBy(0, 1000);
}

//Checks if the game has been won, either continue or show who won
function checkWin() {

}


function nextMove() {
  store.dispatch(nextTurn());
}