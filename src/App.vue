<template>
  <header>
    <nav>
      <RouterLink to="/">Podcaster</RouterLink>
      <div v-if="displayLoader" class="lds-dual-ring"></div>
    </nav>
  </header>

  <RouterView @loader="setLoader"/>
</template>

<script>
import { RouterView, RouterLink } from "vue-router";
export default {
  data: () => {
    return {
      displayLoader: true
    }
  },
  components:{
    RouterView,
    RouterLink
  },
  beforeCreate() {
    this.$store.commit('podcasts/INITIALIZE_STORE');
    this.$store.commit('episodes/INITIALIZE_STORE');
  },
  methods: {
    setLoader(payload) {
      this.displayLoader = payload;
    }
  }
}
</script>


<style scoped>
</style>
