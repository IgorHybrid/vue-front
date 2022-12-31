<template>
  <main>
    <ul id="podcast-list">
      <li v-for="podcast in podcasts" :key="podcast.id">
        <PodcastItemVue
          :imageUrl="podcast['im:image'][0].label" 
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
import axios from 'axios';
export default {
  data: () => {
    return {
      podcasts: null
    }
  },
  components:{
    PodcastItemVue
  },
  async mounted() {
    console.log("Prueba");
    await this.getPodcasts();
  },
  methods: {
    async getPodcasts() {
      try {
        const resp = await axios.get("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json");
        this.podcasts = resp.data.feed.entry;
        console.log(this.podcasts);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>