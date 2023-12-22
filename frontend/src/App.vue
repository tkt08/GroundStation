<template>
  <div>
    <div id="map" style = "height: 500px;"></div>
    <canvas id="gauge-acceleration" width="400" height="200"></canvas>
    <canvas id="gauge-gyro" width="400" height="200"></canvas>
    <canvas id="gauge-altitude" width="400" height="200"></canvas>
  </div>
</template>

<script>
import { RadialGauge } from 'canvas-gauges';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  data() {
    return {
      gauges: {},
      map: null,
      titleLayer: null,
      center: [40.138633, 139.984850],
      zoom: 20,
    };
  },
  methods: {
    createGauge(elementId, value, max, units) {
      return new RadialGauge({
        renderTo: elementId,
        width: 400,
        height: 200,
        units: units,
        minValue: 0,
        maxValue: max,
        value: value,
        // その他のゲージ設定...
      }).draw();
    },
    updateGauge(gauge, value) {
      gauge.value = value;
    },

    initMap() {
      this.map = L.map('map').setView(this.center, this.zoom);
      this.tileLayer = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        }
      );
      this.tileLayer.addTo(this.map);
    }
  },
  mounted() {
    
    this.gauges.acceleration = new RadialGauge({
      renderTo: 'gauge-acceleration',
      width: 400,
      height: 200,
      units: 'Acceleration [m/s^2]',
      minValue: 0,
      maxValue: 12,
      value: 0,
      majorTicks: ['0', '3', '6', '9', '12'],
      minorTicks: 2,
      highlights: [
        { from: 0, to: 3, color: 'rgba(200, 50, 50, .75)' },
        { from: 3, to: 6, color: 'rgba(50, 50, 200, .75)' },
        { from: 6, to: 9, color: 'rgba(200, 50, 200, .75)' },
        { from: 9, to: 12, color: 'rgba(50, 200, 50, .75)'}
      ],
    }).draw();


    this.gauges.gyro = new RadialGauge({
      renderTo: 'gauge-gyro',
      width: 400,
      height: 200,
      units: 'Gyro [rad/s]',
      minValue: -400,
      maxValue: 400,
      value: 0,
      majorTicks: ['-400', '-200', '0', '200', '400'],
      minorTicks: 2,
      highlights: [
        { from: -400, to: 0, color: 'rgba(200, 50, 50, .75)' },
        { from: 0, to: 400, color: 'rgba(50, 200, 50, .75)' },
      ],
    }).draw();

    this.gauges.altitude = new RadialGauge({
      renderTo: 'gauge-altitude',
      width: 400,
      height: 200,
      units: 'Altitude [m]',
      minValue: 0,
      maxValue: 500,
      value: 0,
      majorTicks: ['0', '100', '200', '300', '400', '500'],
      minorTicks: 2,
      highlights: [
        { from: 0, to: 100, color: 'rgba(200, 50, 50, .75)' },
        { from: 100, to: 200, color: 'rgba(50, 200, 50, .75)' },
        { from: 200, to: 300, color: 'rgba(50, 50, 200, .75)' },
        { from: 300, to: 500, color: 'rgba(200, 50, 200, .75)' }
      ],
    }).draw();

    this.ws = new WebSocket('ws://localhost:8080');

    this.ws.onmessage = (event) => {
      console.log(event.data);
      const [acc, gyro, altitude] = event.data.split(',').map(Number);
      this.updateGauge(this.gauges.acceleration, acc);
      this.gauges.acceleration.update();
      this.updateGauge(this.gauges.gyro, gyro);
      this.gauges.gyro.update();
      this.updateGauge(this.gauges.altitude, altitude);
      this.gauges.altitude.update();
    };

    this.map = L.map('map').setView(this.center, this.zoom);
    L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(this.map);

  }
};
</script>
