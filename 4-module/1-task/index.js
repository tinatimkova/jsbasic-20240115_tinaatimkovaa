function makeFriendsList(friends) {

  let list = document.createElement('ul');
  for (let friend of friends) {
    list.innerHTML += `<li>${friend['firstName']} ${friend['lastName']}</li>`;
  }

  return list;

}
