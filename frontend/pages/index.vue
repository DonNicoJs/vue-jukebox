<template>
  <v-layout
    row
    wrap>
    <v-flex xs12>
      <h2>Vue Jukebox</h2>
    </v-flex>
    <audio
      :src="currentSong"
      controls
      autoplay
      @ended="playNext"
    />
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
  },
  layout: 'main',
  fetch ({store: {dispatch}}) {
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
    playNext () {
      this.$axios.post('/api/playlist/next');
    }
  }
};
</script>

<style scoped lang="less">
</style>
