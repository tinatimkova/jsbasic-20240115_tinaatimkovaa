/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  elem = document.createElement('table');
  #rows = null;  

  constructor(rows) {
    this.#rows = rows;
    this.elem = this.#render();
  }
  
  #render() {
    this.elem.insertAdjacentHTML('afterbegin', this.#template());
    
    this.elem.addEventListener('click', (event) => this.#onRemoveRow(event));
    
    return this.elem;
  }
  
  #template() {
    return `
    <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Salary</th>
        <th>City</th>
        <th></th>
       </tr>
       </thead>
       <tbody>${this.#rows.map(row => `
       <tr>
        <th>${row.name}</th>
        <th>${row.age}</th>
        <th>${row.salary}</th>
        <th>${row.city}</th>
        <th><button data-action='remove'>X</button</th>
        </tr>`).join('')}
       </tbody>`;
  }
  
  #onRemoveRow(event) {
   if (event.target.dataset.action !== 'remove') {
     return;
   } 
    
   let row = event.target.closest('tbody tr');
   row.remove();
  }
}
