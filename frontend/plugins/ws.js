import VueNativeSock from 'vue-native-websocket';
import Vue from 'vue';

export default ({app: {router, store}}) => {
  const hostname = window.location.hostname;
  let wsUrl = `wss://${hostname}/jukebox`;
  if (hostname === 'localhost') {
    wsUrl = 'ws://localhost:9010/jukebox';
  }
  Vue.use(VueNativeSock, wsUrl, store, {format: 'json'});
};
