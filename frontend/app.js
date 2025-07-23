const socket = new WebSocket('ws://localhost:4208');

const inputMessage = document.getElementById('input-message');
const messages = document.getElementById('messages');

socket.addEventListener('open', () => {
  inputMessage.addEventListener('keydown', event => {
    if (event.keyCode === 13) {
      if (event.target.value.trim()) {
        socket.send(event.target.value);
        event.target.value = '';
      }
    }
  });

  socket.addEventListener('message', event => {
    messages.innerHTML += `<li>${event.data}</li>`;
  });
});
