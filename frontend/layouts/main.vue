<template>
  <v-app dark>
    <v-toolbar
      dark
      color="primary">
      <v-toolbar-title class="white--text">ghj.io</v-toolbar-title>
      <v-spacer/>
      <v-btn
        icon
        to="/"
        exact>
        <v-icon>play_circle_outline</v-icon>
      </v-btn>
      <v-btn
        icon
        to="remote"
        exact>
        <v-icon>settings_remote</v-icon>
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
export default {
  components: {
  }
};
</script>

<style>

</style>
