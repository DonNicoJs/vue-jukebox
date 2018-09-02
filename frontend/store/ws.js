
export const state = () => ({
  link: false,
  event: null,
  wsUrl: null,
  currentSong: null,
  playlist: []
});

export const getters = {
  getCurrentSong: (state) => {
    return `/songs/${state.currentSong}`;
  },
  getPlaylist: state => state.playlist
};

export const actions = {
  async loadPlaylist ({commit}) {
    const { data } = await this.$axios.get('/api/playlist/');
    commit('SET_PLAYLIST', data);
  }
};

export const mutations = {
  LINK_ESTABLISHED (state, event) {
    state.event = event;
    state.link = true;
  },
  SET_CURRENT_SONG (state, event) {
    state.currentSong = event.data;
  },
  SET_PLAYLIST (state, playlist) {
    state.playlist = playlist;
  }
};
