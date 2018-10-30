<template>
  <section class="section">
    <div class="container">
      <audio-player
        :track="currentSong"
        @song:end="next"
      >
        <b-icon
          slot="play-icon"
          icon="play-circle" />

        <b-icon
          slot="pause-icon"
          icon="pause-circle" />
        <b-icon
          slot="stop-icon"
          icon="stop-circle" />
      </audio-player>
      <button
        class="button"
        @click="previous"
      >
        <b-icon icon="previous"/>
        Prev
      </button>
      <button
        class="button"
        @click="next">
        Next
        <b-icon
          dark
          class="skip_next"
        />
      </button>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AudioPlayer from '../components/AudioPlayer'
import PlayList from '../components/PlayList'

export default {
  components: {
    AudioPlayer,
    PlayList
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      currentSong: 'songs/getCurrentSong'
    }),
    socketLink() {
      if (this.$store.state.socket) {
        return this.$store.state.socket.isConnected
      }
    }
  },
  watch: {
    socketLink: {
      immediate: true,
      handler: function(link) {
        if (link && !this.$isServer) {
          this.registerToServer()
        }
      }
    }
  },
  mounted() {
    this.loadPlaylist()
  },
  methods: {
    ...mapActions({
      loadPlaylist: 'songs/loadPlaylist'
    }),
    registerToServer() {
      this.$socket.sendObj()
    },
    next() {
      this.$axios.post('/api/playlist/next')
    },
    previous() {
      this.$axios.post('/api/playlist/previous')
    }
  }
}
</script>

<style lang="sass">
</style>
