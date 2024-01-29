function sumSalary(salaries) {
  let sum = 0;
  for (let prop in salaries) {
    if (isFinite(salaries[prop])) {
      sum += salaries[prop];
    }
  }
  return sum;
}
