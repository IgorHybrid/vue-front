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
  }
}
</script>


<style scoped>
</style>
