<template>
    <main v-if="podcast && podcast.details">
      <PodcastDescriptionItem
        :imageUrl="getImage()"
        :name="podcast.details.title"
        :author="podcast.details.author.toString()"
        :description="podcast.details.summary.toString()"
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
        console.log('PodcastView');
        this.podcastId = this.$route.params.id;
        await this.getDetails();
    },
    methods: {
        async getDetails() {
            this.podcast = this.$store.getters['episodes/getPodcastById'](this.podcastId);
            if (!this.podcast){
                await this.$store.dispatch('episodes/loadPodcastEpisodes', this.podcastId);
                this.podcast = this.$store.getters['episodes/getPodcastById'](this.podcastId);
            }
        },
        //TODO: Move inside component
        getImage() {
            if (this.podcast.details.thumbnail) {
                return this.podcast.details.thumbnail._url;
            }

            if (this.podcast.details.image[0].url) {
                return this.podcast.details.image[0].url;
            }

            return this.podcast.details.image[1].url;
        },
        getTitle(title) {
            if (typeof title === 'string') {
                return title;
            }

            return title[0];
        },
        go2Episode(episode) {
            console.log('Label pushed');
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