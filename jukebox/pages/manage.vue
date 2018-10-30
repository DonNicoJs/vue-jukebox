<template>
  <section class="section">
    <h1 class="title">Manage</h1>
    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-8">
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <div class="tile is-child notification is-primary is-4">
                <p class="title"> Add playlist </p>
                <create-playlist />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CreatePlaylist from '@/components/CreatePlaylist'

export default {
  components: {
    CreatePlaylist
  }
}
</script>

<style>
</style>
