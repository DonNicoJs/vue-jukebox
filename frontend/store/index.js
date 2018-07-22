export const state = () => ({
  socket: {
    isConnected: false,
    message: ''
  }
});

export const mutations = {
  SOCKET_ONOPEN (state, event) {
    state.socket.isConnected = true;
  },
  SOCKET_ONCLOSE (state, event) {
    state.socket.isConnected = false;
  },
  SOCKET_ONERROR (state, event) {
    console.error(state, event);
  },
  SOCKET_ONMESSAGE (event, message) {
    state.socket.message = message;
  }
};
