function factorial(n) {
  let result = n;
  if (n == 0 || n == 1) {
    return 1;
  }
  while(n > 1) {
    result *= n - 1;
    n--;
  }
  return result;
}
