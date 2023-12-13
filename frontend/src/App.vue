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
        labels: [], // データポイントのラベル（例：タイムスタンプ）
        datasets: [
          {
            label: 'センサーデータ',
            data: [], // グラフに描画するデータ
            // その他のグラフ設定
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
      console.log('受信したデータ：', event.data);
      // センサーデータを受信し、グラフを更新
      const value = parseFloat(event.data);
      if (!isNaN(value)) {
        this.chartData.labels.push(new Date().toLocaleTimeString());
        this.chartData.datasets[0].data.push(value);
        this.chartData = { ...this.chartData }; // リアクティブなデータ更新
      }
    };
  }
});
</script>
