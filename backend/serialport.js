'use strict';

// SerialPort クラスのインポート
const { SerialPort } = require('serialport');

// シリアルポート設定 115200bps
const port = new SerialPort({ path: "COM9", baudRate: 115200 });

// ポート開いた際のイベント
port.on('open', function() {
  console.log('ポートを開けました。');
});

// 送信テスト
port.write("ああ～早く調歩同期まみれになろうぜ。", function(err) {
  if (err) {
    // エラーハンドル
    return console.log('送信エラー:', err.message);
  }
  // 送信成功
  console.log("送信完了。");
});

// 受信データのハンドリング
port.on('data', function(data) {
  var text = String(data);
  console.log(text);
});
