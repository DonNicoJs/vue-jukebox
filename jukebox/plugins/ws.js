import VueNativeSock from 'vue-native-websocket'
import Vue from 'vue'

export default ({ app: { store } }) => {
  const hostname = window.location.hostname
  let wsUrl = `ws://${hostname}/jukebox`
  if (hostname === 'localhost') {
    wsUrl = 'ws://localhost:3000/jukebox'
  }
  Vue.use(VueNativeSock, wsUrl, { store, format: 'json' })
}
