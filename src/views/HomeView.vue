<template>
  <main>
    <div>
      <p>{{ podcastsFiltered.length }}</p>
      <input v-model="filterValue" placeholder="Filter podcasts..." />
    </div>
    <ul id="podcast-list">
      <li v-for="podcast in podcastsFiltered" :key="podcast.id">
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
      podcasts: null,
      filterValue: ''
    }
  },
  computed: {
    podcastsFiltered() {
      const regex = new RegExp('.*' + this.filterValue + '.*', 'gi');
      return this.podcasts.filter(elm => elm['im:name'].label.match(regex));
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
      this.$emit('loader', true);
      this.podcasts = this.$store.getters['podcasts/getList'];
      if (this.podcasts < 1) {
        await this.$store.dispatch('podcasts/loadPodcasts');
        this.podcasts = this.$store.getters['podcasts/getList'];
      }
      this.$emit('loader', false);
    }
  }
}
</script>

<style scoped>
  #podcast-list {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
  }

  #podcast-list li {
    flex: 1 0 21%;
    margin: 5px;
  }
</style>