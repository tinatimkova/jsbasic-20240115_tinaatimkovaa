function truncate(str, maxlength) {
  if (str.length <= maxlength) {
    return str;
  } else {
    return str = str.slice(0, maxlength-1) + "…";
  }
}
