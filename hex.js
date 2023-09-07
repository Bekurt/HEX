function addEvents() {
  //Gets to next menu by toggling element visibility
  $("#select-1").click(() => {
    return playerNumber = 1;
  });
  $("#select-2").click(() => {
    return playerNumber = 2;
  });
  $("#select-easy").click(() => {
    boardSize = 5
    makeGame(boardSize, playerNumber);
  });
  $("#select-normal").click(() => {
    boardSize = 7;
    makeGame(boardSize, playerNumber);
  });
  $("#select-hard").click(() => {
    boardSize = 11;
    makeGame(boardSize, playerNumber);
  });
}

let playerNumber = 0;
let boardSize = 7;

function makeGame(size = 7, player = 1) {
  //Switch to game view
  $("body").css("background-image", "none");
  $("#main-menu").toggleClass("hidden");
  $("#game").toggleClass("hidden");

  //Define the dimension of the hexagon
  const width = $("#game-board").width();
  const tileSide = 0.9 * width / (size * 2.6 + 0.87);
  const tiles = new Array(size * size);
  for (let i = 0; i < tiles.length; i++) {
    tiles[i] = i;
  };

  //Create svg
  let svg = d3.select("#game-board")
    .append("svg")
    .attr("viewBox", `-50 -100 ${width} ${width}`);

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
      let pointString = `${(col * 1.73 + row * 0.87) * tileSide},${(0.5 + row * 1.5) * tileSide}`;
      pointString += ` ${(0.87 + col * 1.73 + row * 0.87) * tileSide},${(row * 1.5) * tileSide}`;
      pointString += ` ${(1.73 + col * 1.73 + row * 0.87) * tileSide},${(0.5 + row * 1.5) * tileSide}`;
      pointString += ` ${(1.73 + col * 1.73 + row * 0.87) * tileSide},${(1.5 + row * 1.5) * tileSide}`;
      pointString += ` ${(0.87 + col * 1.73 + row * 0.87) * tileSide},${(2 + row * 1.5) * tileSide}`;
      pointString += ` ${(col * 1.73 + row * 0.87) * tileSide},${(1.5 + row * 1.5) * tileSide}`;
      return pointString;
    }).attr("onclick","assignColor(event)");
};

function assignColor(event) {
  event.target.style["fill"] = "blue";
}