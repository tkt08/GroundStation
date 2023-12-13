'use strict';

const fs = require('fs');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const csvFilePath = 'SensorData.csv';
const headers = 'Timestamp,AccX,AccY,AccZ,GyroX,GyroY,GyroZ\n';

const port = new SerialPort({ path: "COM9", baudRate: 115200 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

if (!fs.existsSync(csvFilePath)) {
  fs.writeFileSync(csvFilePath, headers);
}

port.on('open', () => {
  console.log('ポートを開けました。');
});

// UTC時間を日本時間に変換し、秒数までのフォーマットで出力する関数
function toJapanTime(date) {
  const japanTimeOffset = 9 * 60; // 日本はUTC+9時間
  // ローカルタイムゾーンのオフセットを取得し、UTC時間に変換
  const utcTime = new Date(date.getTime() + (date.getTimezoneOffset() * 60000));
  // UTC時間に日本のタイムゾーンオフセットを加算
  const localTime = new Date(utcTime.getTime() + japanTimeOffset * 60000);

  const year = localTime.getFullYear();
  const month = ('0' + (localTime.getMonth() + 1)).slice(-2);
  const day = ('0' + localTime.getDate()).slice(-2);
  const hours = ('0' + localTime.getHours()).slice(-2);
  const minutes = ('0' + localTime.getMinutes()).slice(-2);
  const seconds = ('0' + localTime.getSeconds()).slice(-2);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

parser.on('data', (data) => {
  const timestamp = toJapanTime(new Date());
  const values = data.split(',');

  if (values.length === 6) {
    const csvData = `${timestamp},${values.join(',')}\n`;
    fs.appendFileSync(csvFilePath, csvData);
    console.log('CSVにデータを追記しました。');
  } else {
    console.error('無効なデータを受信しました:', data);
  }
});
