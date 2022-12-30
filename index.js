function readInput() {
  var grid = Array(9).fill().map(() => Array(9).fill(0));
  console.log(grid);
  for (var i = 0; i < 81; i++) {
    var val = document.querySelectorAll('input')[i].value;
    if (val) {
      var a = Math.floor(i / 9), b = i % 9;
      grid[a][b] = val;
    }
    else{
      document.querySelectorAll('input')[i].classList.add("empty");
    }
  }
  solve(grid);
  var index=0;
  for(var i=0; i<9; i++){
    for(var j=0; j<9; j++){
      document.querySelectorAll('input')[index++].value = grid[i][j];
    }
  }
}

var row = 0, col = 0;
function solve(grid) {
  if (!emptyCell(grid, row, col)) return true;
  var x = row, y = col;
  for (var i = 1; i <= 9; i++) {
    if (check(grid, i, row, col)) {
      grid[row][col] = i;
      if (solve(grid)) return true;
      grid[row][col] = 0;
      row = x, col = y;
    }
  }
  return false;
}

function emptyCell(grid, row, col) {
  var x = row, y = col;
  if (y == 8 || (y == 7 && grid[x][y] != 0)) y = 0;
  for (var i = x; i < 9; i++) {
    for (var j = y; j < 9; j++) {
      if (grid[i][j] == 0) {
        this.row = i;
        this.col = j;
        return true;
      }
    }
  }
  return false;
}

function check(grid, i, row, col) {
  //check horizontal
  for (var j = 0; j < 9; j++) {
    if (grid[row][j] == i) return false;
  }
  //check vertical
  for (var j = 0; j < 9; j++) {
    if (grid[j][col] == i) return false;
  }
  //check box
  var x = row - row % 3,
    y = col - col % 3;
  for (var j = x; j < x + 3; j++) {
    for (var k = y; k < y + 3; k++) {
      if (grid[j][k] == i) return false;
    }
  }
  return true;
}

function clearInput(){
  for (var i = 0; i < 81; i++) {
    document.querySelectorAll('input')[i].value = "";
    document.querySelectorAll('input')[i].classList.remove("empty");
  }
}
