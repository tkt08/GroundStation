'use strict';

const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const ExcelJS = require('exceljs');

// シリアルポート設定 115200bps
const port = new SerialPort({ path: "COM9", baudRate: 115200 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// 新しいワークブックとワークシートの作成
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Data');

// 列ヘッダーの設定
worksheet.columns = [
  { header: 'Timestamp', key: 'timestamp', width: 20 },
  { header: 'SensorValue', key: 'value', width: 15 },
  // 他のセンサデータの列もここに追加
];

port.on('open', function() {
  console.log('ポートを開けました。');
});

// 受信データのハンドリング
parser.on('data', function(data) {
  console.log('受信データ:', data);
  const timestamp = new Date(); // タイムスタンプの生成
  const parsedData = { timestamp, value: parseFloat(data) };
  worksheet.addRow(parsedData).commit(); // Excelに行を追加
});

// 10秒ごとにExcelファイルを保存
setInterval(() => {
  workbook.xlsx.writeFile('SensorData.xlsx')
    .then(() => console.log('Excelにデータを保存しました。'))
    .catch(err => console.error('Excelファイルの保存時にエラーが発生しました:', err));
}, 10000);
