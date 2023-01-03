<template>
  <header>
    <nav>
      <RouterLink to="/">Podcaster</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<script>
import { RouterView, RouterLink } from "vue-router";
export default {
  components:{
    RouterView,
    RouterLink
  },
  beforeCreate() {
    this.$store.commit('podcasts/INITIALIZE_STORE');
    this.$store.commit('episodes/INITIALIZE_STORE');
  }
}
</script>


<style scoped>
</style>
