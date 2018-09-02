<template>

  <div class="PlayList">
    <v-list>
      <v-list-tile
        v-for="song in playlist"
        :key="song.id"
        @click="set(song.id)"
      >
        <v-list-tile-action>
          <v-icon
            v-show="song.song=== currentSong"
            color="gold">play_circle_outline</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          {{ song.song }}
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      playlist: 'ws/getPlaylist'
    }),
    ...mapState('ws', {
      currentSong: 'currentSong'
    })
  },
  methods: {
    set (id) {
      this.$axios.post(`/api/playlist/${id}`);
    }
  }
};
</script>

<style>

</style>
