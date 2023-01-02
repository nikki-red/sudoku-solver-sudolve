import React, { useEffect } from "react";
import "../styles/PlayArea.css";
import { solve } from "./playFunctions";
import { useState } from "react";
import generateGrid from "./generateGrid";
const PlayArea = () => {
  // initial grid
  let temp = Array(9)
    .fill()
    .map(() => Array(9).fill(0));
  const [grid, setGrid] = useState(temp);
  temp = Array(81).fill(0);
  const [emptyCells, setEmptyCells] = useState(temp);
  // used for setting IDs while generating the grid
  let idCounter = 0;

  const cellChangeHandler = (event) => {
    // function is run everytime a cell is updated

    let cellID = parseInt(event.target.id);
    let row = Math.floor(cellID / 9);
    let col = cellID % 9;

    // update grid
    let newGrid = grid;
    newGrid[row][col] =
      event.target.value != "" ? parseInt(event.target.value) : 0;
    setGrid(newGrid);

    // update emptyCells state
    let anotherNewEmptyCellsArray = emptyCells;
    anotherNewEmptyCellsArray[cellID] = event.target.value ? 0 : 1;
    setEmptyCells(anotherNewEmptyCellsArray);
  };

  const submitHandler = () => {
    alert("This does not work yet!");
  };

  const resetHandler = () => {
    temp = Array(9)
      .fill()
      .map(() => Array(9).fill(0));
    setGrid(temp);
    window.location.reload();
  };

  return (
    <div className="arena-container">
      <div className="grid">
        {/* looping through the grid[][] array to create the table */}
        <table>
          {grid.map((row) => {
            return (
              <tr>
                {" "}
                {row.map((cell) => {
                  return (
                    <td>
                      <input
                        id={idCounter++}
                        type="text"
                        onChange={cellChangeHandler}
                      />
                    </td>
                  );
                })}{" "}
              </tr>
            );
          })}
        </table>
        <div class="btn-group btn-group-justified buttons" id="allbtns">
          <button
            type="button"
            class="btn btn-dark btn-lg btnOne"
            onClick={submitHandler}
          >
            Submit
          </button>
          <button
            type="button"
            class="btn btn-outline-dark btn-lg btnTwo"
            onClick={resetHandler}
          >
            Clear
          </button>
        </div>{" "}
      </div>
    </div>
  );
};

export default PlayArea;
