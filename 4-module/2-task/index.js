function makeDiagonalRed(table) {
  let i = 0;
  while(table.rows[i]) {
    table.rows[i].cells[i].style.backgroundColor = 'red';
    i++;
  }
}
