// backend/server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Expressの設定
app.use(express.static('/frontend/index.html'));  // frontendディレクトリを静的ファイルとして提供

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

wss.on('connection', (ws) => {
  console.log('Client connected');

  // WebSocketのイベントハンドリング
  ws.on('message', (message) => {
      console.log(`Received: ${message}`);
      // ここでメッセージを処理し、必要なアクションを実行
  });

  ws.on('close', () => {
      console.log('Client disconnected');
  });
});


//このコードは、Node.jsを使用してWebSocketサーバーとHTTPサーバーを作成するためのものです。主なライブラリとしてexpress、http、およびws（WebSocket）が使用されています。

//まず、必要なモジュールをrequireを使用してインポートします。次に、expressアプリケーションを作成し、それを使用してHTTPサーバーを作成します。その後、このHTTPサーバーを使用してWebSocketサーバーを作成します。

//app.use(express.static('/frontend/index.html'));の行では、Expressが/frontend/index.htmlパスの静的ファイルを提供するように設定されています。これにより、ブラウザからこのパスにアクセスすると、index.htmlファイルが返されます。

//次に、環境変数PORTまたはデフォルトの3000番ポートでサーバーを起動します。サーバーが起動したら、コンソールにメッセージが表示されます。

//最後に、WebSocketサーバーに対する接続イベントとメッセージイベントのハンドラを設定します。クライアントがサーバーに接続すると、'Client connected'というメッセージがコンソールに表示されます。クライアントからメッセージが送信されると、そのメッセージがコンソールに表示されます。また、クライアントが接続を閉じると、'Client disconnected'というメッセージが表示されます。
