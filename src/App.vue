<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {

beforeCreate() {                
            this.$store.commit('initialiseStore');
          },
}
</script>
