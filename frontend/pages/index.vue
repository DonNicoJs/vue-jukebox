<template>
  <v-layout
    row
    wrap>
    <v-flex xs12>
      <h2>Vue Jukebox</h2>
    </v-flex>
    <v-flex xs12>
      <audio-player
        :track="currentSong"
        @song:end="next"
      >
        <v-icon slot="play-icon">play_circle_outline</v-icon>
        <v-icon slot="pause-icon">pause_circle_outline</v-icon>
        <v-icon slot="stop-icon">stop</v-icon>
      </audio-player>
    </v-flex>
    <v-flex xs12>
      <v-btn
        @click="previous"
      >
        <v-icon dark>skip_previous</v-icon>
        Prev
      </v-btn>
      <v-btn
        @click="next"
      >
        Next
        <v-icon dark>skip_next</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs12>
      <play-list />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import AudioPlayer from '../components/AudioPlayer';
import PlayList from '../components/PlayList';

export default {
  components: {
    AudioPlayer,
    PlayList
  },
  layout: 'main',
  async fetch ({store: {dispatch}}) {
    await dispatch('ws/loadPlaylist');
  },
  data () {
    return {};
  },
  computed: {
    ...mapGetters({
      currentSong: 'ws/getCurrentSong'
    }),
    socketLink () {
      if (this.$store.state.socket) {
        return this.$store.state.socket.isConnected;
      }
    }
  },
  watch: {
    socketLink: {
      immediate: true,
      handler: function (link) {
        if (link && !this.$isServer) {
          this.registerToServer();
        }
      }
    }
  },
  methods: {
    registerToServer () {
      this.$socket.sendObj();
    },
    next () {
      this.$axios.post('/api/playlist/next');
    },
    previous () {
      this.$axios.post('/api/playlist/previous');
    }
  }
};
</script>

<style lang="less">
</style>
