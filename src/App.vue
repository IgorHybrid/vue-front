<template>
  <header>
    <nav>
      <h1><RouterLink to="/">Podcaster</RouterLink></h1>
      <div v-if="displayLoader" class="lds-dual-ring"></div>
    </nav>
  </header>

  <RouterView class="main-view" @loader="setLoader"/>
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
  async beforeCreate() {
    await this.$store.dispatch('podcasts/initStore');
    await this.$store.dispatch('episodes/initStore');
  },
  methods: {
    setLoader(payload) {
      this.displayLoader = payload;
    }
  }
}
</script>


<style scoped>
  header {
    margin-bottom: 50px;
    width: inherit;
  }
  nav {
    width: inherit;
    display: flex;
    border-bottom-style: solid;
    border-bottom-width: 0.15mm;
  }
  nav h1 {
    width: 80%;
  }
  .main-view {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
</style>
