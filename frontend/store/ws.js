
export const state = () => ({
  link: false,
  event: null,
  wsUrl: null,
  songs: [],
  currentSong: null
});

export const getters = {
  getCurrentSong: (state) => {
    return `/songs/${state.currentSong}`;
  }
};

export const actions = {};

export const mutations = {
  LINK_ESTABLISHED (state, event) {
    state.event = event;
    state.link = true;
  },
  SET_CURRENT_SONG (state, event) {
    state.currentSong = event.data;
  }
};
