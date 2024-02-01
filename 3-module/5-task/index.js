function getMinMax(str) {

  let numbers = str
  .split(' ')
  .filter(data => !isNaN(data));

  return { 
    min: Math.min(...numbers), 
    max: Math.max(...numbers) 
  }
}
