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
let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

function makeGame(size = 7, player = 1) {
  //Switch to game view
  $("body").css("background-image", "none");
  $("#main-menu").toggleClass("hidden");
  $("#game").toggleClass("hidden");

  //Define the dimension of the hexagon
  const width = $("#game-board").width();
  const RAD3 = Math.sqrt(3);
  const boardUnitWidth = (size * RAD3 + (RAD3 / 2 * (size - 1)));
  const tileSide = 0.8 * width / boardUnitWidth;
  const tiles = new Array(size * size);
  for (let i = 0; i < tiles.length; i++) {
    tiles[i] = i;
  };

  //Create svg
  let svg = d3.select("#game-board")
    .append("svg")
    .attr("viewBox", `-${0.1 * width} -${0.1 * width} ${width} ${width}`);

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
      .attr("y", "0")
      .html(columnList[i])
      .style("font-size",`${11 / size}em`);

    //Column denomination (bottom)
    svg.append("text")
      .attr("x", RAD3 * (i + 3 / 8 + size / 2) * tileSide)
      .attr("y", tileSide * ((size - 1) * 1.5 + 2.2))
      .html(columnList[i])
      .style("font-size",`${11 / size}em`);

    //Row denomination (left)
    svg.append("text")
      .attr("x", (RAD3 / 2 * i - 1) * tileSide)
      .attr("y", (1.5 * i + 1.1) * tileSide)
      .html(i + 1)
      .style("font-size",`${11 / size}em`);

    //Row denomination (right)
    svg.append("text")
      .attr("x", (RAD3 / 2 * i + 0.5 + RAD3 * size) * tileSide)
      .attr("y", (1.5 * i + 1.1) * tileSide)
      .html(i + 1)
      .style("font-size",`${11 / size}em`);
  };
};

function assignColor(event) {
  event.target.style["fill"] = "blue";
}