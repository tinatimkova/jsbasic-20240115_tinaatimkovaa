function highlight(table) {
  let indexStatus, indexAge, indexGender;

  let thead = table.tHead.querySelectorAll('td');

  for (let td of thead) {
    switch (td.innerHTML) {
      case "Status": 
        indexStatus = td.cellIndex;
        break;
      case "Gender":
        indexGender = td.cellIndex;
        break;
      case "Age":
        indexAge = td.cellIndex;
        break;
    }
  }
  
  let tbody = table.querySelector('tbody').rows;
  
  for (let tr of tbody) {

    if (tr.cells[indexStatus].dataset.available) {

     tr.cells[indexStatus].dataset.available === 'true'
     ? tr.classList.add('available') 
     : tr.classList.add('unavailable');
     
   } else {
     tr.setAttribute('hidden', true);
   }
    
    if (tr.cells[indexGender].innerHTML === 'm') tr.classList.add('male');
    if (tr.cells[indexGender].innerHTML === 'f') tr.classList.add('female');
    
    if (tr.cells[indexAge].innerHTML < 18) tr.style.textDecoration = 'line-through';
  }
}
