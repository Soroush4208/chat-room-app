const http = require('http');
const webSocket = require('ws');

const server = http.createServer();

const ws = new webSocket.Server({ server });

ws.on('headers', headers => {
  // console.log("Headers ->", headers);
});

ws.on('connection', (socket, req) => {
  const userID = req.url.slice(1);
  socket.id = userID;
  const now = new Date();
  const createdAt = now.toLocaleTimeString('fa-IR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  socket.send(JSON.stringify({ userID }));

  socket.on('message', data => {
    ws.clients.forEach(client => {
      client.send(
        JSON.stringify({
          userID: socket.id,
          message: data.toString(),
          createdAt,
        })
      );
    });
  });
});

server.listen(4208, () => {
  console.log('Server running on port 4208');
});
