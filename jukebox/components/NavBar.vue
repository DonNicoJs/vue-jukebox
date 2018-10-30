<template>
  <nav
    class="navbar"
    role="navigation"
    aria-label="main navigation">
    <div class="navbar-brand">
      <nuxt-link
        class="navbar-item"
        to="/"
      >
        Vue-JukeBox
      </nuxt-link>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="mainNavBar">
        <span aria-hidden="true"/>
        <span aria-hidden="true"/>
        <span aria-hidden="true"/>
      </a>
    </div>
    <div
      id="mainNavBar"
      class="navbar-menu">
      <div class="navbar-start"/>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <nuxt-link
              to="upload"
              class="button">
              <b-icon
                icon="cloud-upload"
                size="is-small"
              />
              <span>Upload</span>
            </nuxt-link>
            <nuxt-link
              tag="button"
              to="manage"
              class="button"
            >
              <b-icon
                icon="playlist-edit"
                size="is-small"
              />
              <span>Manage</span>
            </nuxt-link>
          </div>
        </div>
      </div>
  </div></nav>
</template>

<script>
export default {}
</script>

<style>
</style>
