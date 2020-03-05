<template>
  <div id="q-app">
    <router-view/>

  </div>
</template>

<script>

export default {
  beforeCreate() {
        this.$store.commit('initialiseStore');
      },
  name: 'App',
}
</script>
