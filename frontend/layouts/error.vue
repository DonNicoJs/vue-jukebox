<template>
  <section class="container">
    <h1 class="title">
      {{ error.statusCode }}
    </h1>
    <h2 class="info">
      {{ error.message }}
    </h2>
    <nuxt-link
      v-if="error.statusCode === 404"
      to="/">
      Homepage
    </nuxt-link>
  </section>
</template>
<script>

export default {
  components: {
  },
  props: {
    error: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
  .title
  {
    margin-top: 15px;
    font-size: 5em;
    width:100%;
  }
  .info
  {
    font-weight: 300;
    color: #9aabb1;
    margin: 0;
    width:100%;
  }
  .button
  {
    margin-top: 50px;
  }
</style>
