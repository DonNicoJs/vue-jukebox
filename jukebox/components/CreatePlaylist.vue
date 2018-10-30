<template>
  <form @submit.prevent="save" >
    <b-field label="Name">
      <b-input v-model="name"/>
    </b-field>
    <button
      class="button"
      type="submit">
      Create
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    }
  },
  methods: {
    async save() {
      if (this.name && this.name.trim()) {
        const { data } = await this.$axios.post('/api/playlist/', {
          name: this.name.trim()
        })
        console.log(data)
        this.name = ''
      }
    }
  }
}
</script>

<style>
</style>
