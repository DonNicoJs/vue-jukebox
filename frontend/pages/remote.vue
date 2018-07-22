<template>
  <div>
    <v-layout
      row
      wrap>
      <v-btn
        @click="previous"
      >
        <v-icon dark>skip_previous</v-icon>
        Previous
      </v-btn>
      <v-btn
        @click="next"
      >
        Next
        <v-icon dark>skip_next</v-icon>
      </v-btn>
    </v-layout>
  </div>
</template>

<script>

export default {
  components: {
  },
  layout: 'main',
  data () {
    return {
    };
  },
  computed: {
  },
  watch: {
  },
  methods: {
    next () {
      this.$axios.post('/api/playlist/next');
    },
    previous () {
      this.$axios.post('/api/playlist/previous');
    }
  }
};
</script>

<style scoped lang="less">
</style>
