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

parser.on('data', (data) => {
  const timestamp = new Date().toISOString();
  const values = data.split(','); // 受信データをカンマで分割

  if (values.length === 6) { // 6つの値があることを確認
    const csvData = `${timestamp},${values.join(',')}\n`;
    fs.appendFileSync(csvFilePath, csvData);
    console.log('CSVにデータを追記しました。');
  } else {
    console.error('無効なデータを受信しました:', data);
  }
});
