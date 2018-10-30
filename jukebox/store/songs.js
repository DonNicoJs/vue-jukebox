export const state = () => ({
  currentSong: null,
  playlist: []
})

export const getters = {
  getCurrentSong: state => {
    if (state.currentSong) {
      return `/songs/${state.currentSong}`
    }
  },
  getPlaylist: state => state.playlist
}

export const actions = {
  async loadPlaylist({ commit }) {
    const { data } = await this.$axios.get('/api/playlist/')
    commit('SET_PLAYLIST', data)
  }
}

export const mutations = {
  SET_CURRENT_SONG(state, event) {
    state.currentSong = event.data
  },
  SET_PLAYLIST(state, playlist) {
    state.playlist = playlist
  }
}
