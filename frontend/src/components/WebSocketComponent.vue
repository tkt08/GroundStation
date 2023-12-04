<template>
  <div>
    <h1>WebSocket Component</h1>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  mounted() {
    // WebSocketの接続を確立
    const socket = io('http://localhost:3000');

    // 何らかのイベントが発生したときの処理
    socket.on('someEvent', (data) => {
      console.log('Received data:', data);
      // ここでアップリンク処理を実装
    });
  }
};
</script>

<style scoped>
/* スタイルが必要な場合はここに記述 */
</style>
