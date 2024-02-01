function camelize(str) {
  let arr = str.split('-');
  let newArr = arr.map((word, index) => {
   if (word && index > 0) {
     return word[0].toUpperCase() + word.slice(1);
   }
    return word;
  });
  return newArr.join('');
}
