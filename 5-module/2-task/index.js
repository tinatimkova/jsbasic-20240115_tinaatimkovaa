function toggleText() {
  let button = document.querySelector('.toggle-text-button');
  let text = document.getElementById('text');
  
  button.onclick = () => text.hidden = !text.hidden;
}
