<template>
    <main v-if="podcast && podcast.details">
      <PodcastDescriptionItem
        :image="podcast.details.image"
        :name="podcast.details.title"
        :author="podcast.details.author.toString()"
        :description="podcast.details.description"
      />
      <div>
        <h1>Episodes: {{ podcast.details.item.length }}</h1>
      <ul>
        <li v-for="episode in podcast.details.item">
            <a @click="go2Episode(episode)">{{ getTitle(episode.title) }}</a>
            <label>{{ episode.pubDate }}</label>
            <label>{{ episode.duration }}</label>
        </li>
      </ul>
      </div>
    </main>
</template>
<script>
import PodcastDescriptionItem from '../components/PodcastDescriptionItem.vue';
export default {
    data: () => {
        return {
            podcast: null,
            podcastId: null
        }
    },
    components: {
        PodcastDescriptionItem
    },
    async created() {
        this.podcastId = this.$route.params.id;
        await this.getDetails();
    },
    methods: {
        async getDetails() {
            this.$emit('loader', true);
            this.podcast = this.$store.getters['episodes/getPodcastById'](this.podcastId);
            if (!this.podcast){
                await this.$store.dispatch('episodes/loadPodcastEpisodes', this.podcastId);
                this.podcast = this.$store.getters['episodes/getPodcastById'](this.podcastId);
            }
            this.$emit('loader', false);
        },
        getTitle(title) {
            if (typeof title === 'string') {
                return title;
            }

            return title[0];
        },
        go2Episode(episode) {
            this.$router.push({
                name: 'episode',
                params: {
                    podcastid: this.podcastId,
                    episodeid: episode.guid
                }
            });
        }
    } 
}
</script>