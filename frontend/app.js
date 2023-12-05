// frontend/app.js
const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('open', (event) => {
    console.log('WebSocket connection opened:', event);
    // ここでサーバーにメッセージを送信
    socket.send('Hello, Server!');
});

socket.addEventListener('message', (event) => {
    console.log('WebSocket message received:', event.data);
});

socket.addEventListener('close', (event) => {
    console.log('WebSocket connection closed:', event);
});

//このコードは、WebSocketクライアントの作成とそのイベントハンドリングを行うJavaScriptのフロントエンドコードです。

//まず、new WebSocket('ws://localhost:3000')を使用してWebSocketの新しいインスタンスを作成し、ローカルホストの3000番ポートに接続します。

//次に、WebSocketの各種イベントに対するリスナーを設定します。openイベントはWebSocket接続が開かれたときに発生し、このイベントのリスナーではコンソールにメッセージを表示し、サーバーにメッセージを送信します。

//messageイベントはサーバーからメッセージを受信したときに発生します。このイベントのリスナーでは、受信したメッセージをコンソールに表示します。

//最後に、closeイベントはWebSocket接続が閉じられたときに発生します。このイベントのリスナーでは、コンソールにメッセージを表示します。

//このコードは、WebSocketを使用してリアルタイムの通信を行うWebアプリケーションの一部として使用されます。
