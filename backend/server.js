'use strict';

const fs = require('fs');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

// CSVファイルのヘッダー
const headers = 'Timestamp,SensorValue\n';
const csvFilePath = 'SensorData.csv';

// シリアルポート設定 115200bps
const port = new SerialPort({ path: "COM9", baudRate: 115200 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// CSVファイルが存在しない場合は、新しくファイルを作成してヘッダーを書き込む
if (!fs.existsSync(csvFilePath)) {
  fs.writeFileSync(csvFilePath, headers, (err) => {
    if (err) throw err;
  });
}

port.on('open', () => {
  console.log('ポートを開けました。');
});

// 受信データのハンドリング
parser.on('data', (data) => {
  console.log('受信データ:', data);
  const timestamp = new Date().toISOString(); // ISO形式のタイムスタンプ
  const sensorValue = parseFloat(data).toFixed(2); // センサー値を小数点2桁で丸める
  const csvData = `${timestamp},${sensorValue}\n`; // CSV形式の文字列

  // CSVファイルに追記
  fs.appendFile(csvFilePath, csvData, (err) => {
    if (err) throw err;
    console.log('CSVにデータを追記しました。');
  });
});
