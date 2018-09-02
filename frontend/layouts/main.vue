<template>
  <v-app dark>
    <v-toolbar
      dark
      color="primary">
      <v-toolbar-title class="white--text">Vue JukeBox</v-toolbar-title>
      <v-spacer/>
      <v-btn
        icon
        @click="refresh">
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <nuxt/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  components: {
  },
  methods: {
    ...mapActions({
      loadPlaylist: 'ws/loadPlaylist'
    }),
    async refresh () {
      await this.$axios.post('/api/refresh');
      this.loadPlaylist();
    }
  }
};
</script>

<style>

</style>
