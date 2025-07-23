const username = prompt('Enter your username ...');
const socket = new WebSocket(`ws://localhost:4208/${username}`);

let userID = null;

const input = document.querySelector('input');
const chat = document.querySelector('ul');

socket.addEventListener('open', () => {
  input.addEventListener('keydown', event => {
    if (event.keyCode === 13) {
      if (event.target.value.trim()) {
        socket.send(event.target.value.trim());
        input.value = '';
      }
    }
  });

  socket.addEventListener('message', event => {
    const data = JSON.parse(event.data);
    if (data.message) {
      chat.insertAdjacentHTML(
        'beforeend',
        `<li class=${data.userID === userID ? 'own' : 'other'}>
          <div class='message'>
            <span class='username'>${data.userID}</span>
            <span class='text'>${data.message}</span>
          </div>
          <span class='time'>${data.createdAt}</span>
        </li>`
      );
    } else {
      userID = data.userID;
    }
  });
});
