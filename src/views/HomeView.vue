<template>
  <main>
    <ul id="podcast-list">
      <li v-for="podcast in podcasts" :key="podcast.id">
        <PodcastItemVue
          :imageUrl="podcast['im:image'][2].label" 
          :name="podcast['im:name'].label"
          :author="podcast['im:artist'].label"
          :id="podcast.id.attributes['im:id']" 
        />
      </li>
    </ul>
  </main>
</template>

<script>
import PodcastItemVue from '../components/PodcastItem.vue';
export default {
  data: () => {
    return {
      podcasts: null
    }
  },
  components:{
    PodcastItemVue
  },
  async created() {
    await this.getPodcasts();
  },
  methods: {
    async getPodcasts() {
      this.podcasts = this.$store.getters['podcasts/getList'];
      if (this.podcasts < 1) {
        await this.$store.dispatch('podcasts/loadPodcasts');
        this.podcasts = this.$store.getters['podcasts/getList'];
      }
    }
  }
}
</script>