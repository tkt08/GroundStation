const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');

  // 何らかのイベントが発生したときの処理
  socket.on('someEvent', (data) => {
    console.log('Received data:', data);
    // ここでアップリンク処理を実装
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
