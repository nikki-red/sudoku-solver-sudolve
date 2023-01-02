// Variables used to note the cell numbers if invalid (does not follow sudoku rules)
var x1 = -1,
  x2 = -1,
  y1 = -1,
  y2 = -1;

export function readInput(grid, setGrid) {
  // Create a 2d array initialised with 0s
  for (var i = 0; i < 81; i++) {
    var val = document.querySelectorAll("input")[i].value;
    if (val) {
      // If cell if filled by user
      var a = Math.floor(i / 9),
        b = i % 9;
      // Assigning values from input table to grid
      grid[a][b] = val;
    } else {
      // If cell is empty
      // Adding 'empty' class name to empty cells
      document.querySelectorAll("input")[i].classList.add("empty");
    }
  }

  // Removing any 'invalidCell' class name from any such cells
  var boxes = document.querySelectorAll(".invalidCell");
  boxes.forEach((box) => {
    box.classList.remove("invalidCell");
  });
  // Check if user input follows sudoku rules
  if (!checkInput(grid, x1, y1, x2, y2)) {
    //console.log(x1 + " " + y1 + " " + x2 + " " + y2);
    // Adding 'invalidCell' class name if that cell does not follow sudoku rules
    document
      .querySelectorAll("input")
      [parseInt(x1 * 9) + parseInt(y1)].classList.add("invalidCell");
    document
      .querySelectorAll("input")
      [parseInt(x2 * 9) + parseInt(y2)].classList.add("invalidCell");
    // Removing any 'empty' class name from any such cells
    var boxes = document.querySelectorAll(".empty");
    boxes.forEach((box) => {
      box.classList.remove("empty");
    });
    // alert("Invalid input");
  } else {
    // Solve sudoku
    solve(grid);
    var index = 0;
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        // Assigning the values to respective input cell
        document.querySelectorAll("input")[index++].value = grid[i][j];
      }
    }
  }
}

function checkInput(grid, x1, y1, x2, y2) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (grid[i][j] != 0) {
        //console.log("cell[" + i + "][" + j + "]: " + grid[i][j]);
        if (!check(grid, grid[i][j], i, j, true, x2, y2)) {
          (this.x1 = i), (this.y1 = j);
          //console.log("horizontal caught @ row " + this.x1 + " j " + this.y1);
          return false;
        }
      }
    }
  }
  return true;
}

var row = 0,
  col = 0;

export function solve(grid) {
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
      (row = x), (col = y);
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
        (this.row = i), (this.col = j);
        return true;
      }
    }
  }
  return false;
}

function check(grid, i, row, col, flag, x2, y2) {
  //check horizontal
  for (var j = 0; j < 9; j++) {
    if (flag && j == col) continue;
    if (grid[row][j] == i) {
      (this.x2 = row), (this.y2 = j);
      //console.log("horizontal caught @ row " + this.x2 + " j " + this.y2);
      return false;
    }
  }
  //check vertical
  for (var j = 0; j < 9; j++) {
    if (flag && j == row) continue;
    if (grid[j][col] == i) {
      (this.x2 = j), (this.y2 = col);
      //console.log("vertical caught @ j " + j + " col " + col);
      return false;
    }
  }
  //check box
  var x = row - (row % 3),
    y = col - (col % 3);
  for (var j = x; j < x + 3; j++) {
    for (var k = y; k < y + 3; k++) {
      if (flag && j == row && k == col) continue;
      if (grid[j][k] == i) {
        (this.x2 = j), (this.y2 = k);
        //console.log("box caught @ j " + j + " k " + k);
        return false;
      }
    }
  }
  return true;
}
