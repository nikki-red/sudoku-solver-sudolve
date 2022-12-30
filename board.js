window.onload = function(){
  const table = document.querySelector("table");
  const tbody = document.createElement("tbody");
  for(var i=0;i<9;i++){
    const row = document.createElement("tr");
    for(var j=0;j<9;j++){
      const cell = document.createElement("td");
      const cellInput = document.createElement("input");
      cellInput.type = "text";
      cell.appendChild(cellInput);
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }
  table.appendChild(tbody);
}
