const http = require('http');
const websocket = require('ws');

const server = http.createServer();

const wss = new websocket.Server({ server });

wss.on('headers', (headers, req) => {
  console.log('headers => ', headers);
});

wss.on('connection', socket => {
  socket.on('message', message => {
    wss.clients.forEach(client => {
      if (client.readyState === websocket.OPEN) {
        client.send(message.toString());
      }
    });
  });
});

server.listen(4208, () => {
  console.log('Server is running on port 4208');
});
