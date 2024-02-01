function showSalary(users, age) {
  return users
  .filter(user => user.age <= age)
  .map(({ name, balance }) => [`${name}, ${balance}`])
  .join('\n');
}
