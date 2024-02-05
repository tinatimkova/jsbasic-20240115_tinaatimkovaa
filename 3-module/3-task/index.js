function camelize(str) {

  return str
    .split('-')
    .map((word, index) => word && index > 0 ? word[0].toUpperCase() + word.slice(1) : word)
    .join('');

}
