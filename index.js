function readInput() {
  // Create a 2d array initialised with 0s
  var grid = Array(9).fill().map(() => Array(9).fill(0));
  for (var i = 0; i < 81; i++) {
    var val = document.querySelectorAll('input')[i].value;
    if (val) {
      var a = Math.floor(i / 9),
        b = i % 9;
      // Assigning values from input table to grid
      grid[a][b] = val;
    } else {
      document.querySelectorAll('input')[i].classList.add("empty");
    }
  }
  // Check if user input follows sudoku rules
  if (!checkInput(grid)) {
    alert("Invalid input");
    window.location.reload();
  } else {
    solve(grid);
    var index = 0;
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        document.querySelectorAll('input')[index++].value = grid[i][j];
      }
    }
  }
}

function checkInput(grid) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (grid[i][j] != 0) {
        console.log("cell[" + i + "][" + j + "]: " + grid[i][j]);
        if (!check(grid, grid[i][j], i, j, true)) return false;
      }
    }
  }
  return true;
}

var row = 0,
  col = 0;

function solve(grid) {
  // Find the next empty cell else if all filled return true
  if (!emptyCell(grid, row, col)) return true;
  var x = row,
    y = col;
  for (var i = 1; i <= 9; i++) {
    // Traverse through the possible values
    // If value does not follow sudoku rules, back track
    if (check(grid, i, row, col, false)) {
      grid[row][col] = i;
      if (solve(grid)) return true;
      grid[row][col] = 0;
      row = x, col = y;
    }
  }
  return false;
}

function emptyCell(grid, row, col) {
  var x = row,
    y = col;
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

function check(grid, i, row, col, flag) {
  //check horizontal
  for (var j = 0; j < 9; j++) {
    if (flag && j == col) continue;
    if (grid[row][j] == i) {
      //console.log("horizontal caught @ row " + row + " j " + j);
      return false;
    }
  }
  //check vertical
  for (var j = 0; j < 9; j++) {
    if (flag && j == row) continue;
    if (grid[j][col] == i) {
      //console.log("vertical caught @ j " + j + " col " + col);
      return false;
    }
  }
  //check box
  var x = row - row % 3,
    y = col - col % 3;
  for (var j = x; j < x + 3; j++) {
    for (var k = y; k < y + 3; k++) {
      if (flag && j == row && k == col) continue;
      if (grid[j][k] == i) {
        //console.log("box caught @ j " + j + " k " + k);
        return false;
      }
    }
  }
  return true;
}
