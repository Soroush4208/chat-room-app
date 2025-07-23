const http = require('http');
const websocket = require('ws');

const server = http.createServer();

const wss = new websocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('new client connected');
});

server.listen(4208, () => {
  console.log('Server is running on port 4208');
});
