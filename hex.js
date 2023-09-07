function addEvents() {
  //Gets to next menu by toggling element visibility
  $("#select-1").click(() => {
    return playerNumber = 1;
  });
  $("#select-2").click(() =>{
    return playerNumber = 2;
  });
  $("#select-easy").click(() =>{
    return boardSize = 5;
  });
  $("#select-normal").click(() =>{
    return boardSize = 7;
  });
  $("#select-hard").click(() =>{
    return boardSize = 11;
  });
}

let playerNumber = 0;
let boardSize = 7;

function makeGame() {};