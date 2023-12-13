<template>
  <div>
    <line-chart :chart-data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default defineComponent({
  components: {
    LineChart
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'acc_x',
            data: [],
            borderColor: 'red',
            // その他のグラフ設定
          },
          {
            label: 'acc_y',
            data: [],
            borderColor: 'green',
            // その他のグラフ設定
          },
          {
            label: 'acc_z',
            data: [],
            borderColor: 'blue',
            // その他のグラフ設定
          },
          {
            label: 'gyro_x',
            data: [],
            borderColor: 'orange',
          },
          {
            label: 'gyro_y',
            data: [],
            borderColor: 'purple',
          },
          {
            label: 'gyro_z',
            data: [],
            borderColor: 'yellow',
          }
        ]
      },
      chartOptions: {
        // グラフのオプション
      },
      ws: null
    };
  },
  mounted() {
    this.ws = new WebSocket('ws://localhost:8080');

  this.ws.onmessage = (event) => {
  const values = event.data.split(',').map(Number);
  if (values.length >= 6) {
    const [accX, accY, accZ, gyroX, gyroY, gyroZ] = values;
    const label = new Date().toLocaleTimeString();
    this.chartData.labels.push(label);
    this.chartData.datasets[0].data.push(accX);
    this.chartData.datasets[1].data.push(accY);
    this.chartData.datasets[2].data.push(accZ);
    this.chartData.datasets[3].data.push(gyroX);
    this.chartData.datasets[4].data.push(gyroY);
    this.chartData.datasets[5].data.push(gyroZ);
    this.chartData = { ...this.chartData }; // リアクティブなデータ更新
  }
};

  }
});
</script>
