const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const express = require('express');
const { createServer } = require('http');
const { Server } = require('ws');

const app = express();
const server = createServer(app);
const wss = new Server({ server });

const port = new SerialPort({ path: 'COM9', baudRate: 115200 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

wss.on('connection', (ws) => {
  parser.on('data', (data) => {
    ws.send(data); // シリアルポートからのデータをWebSocket経由で送信
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(8080, () => {
  console.log('サーバーがポート8080で起動しました');
});
