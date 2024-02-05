function highlight(table) {
  for (let row of table.querySelector('tbody').rows) {
    let status = row.lastElementChild;
    if (!status.hasAttribute('data-available')){
      status.setAttribute('hidden', true);
    } else if (status.dataset.available == 'true') {
      status.className = 'available';
    } else {
      status.className = 'unavailable';
    }
  }
}
