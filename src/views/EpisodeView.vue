<template>
    <main v-if="podcast && episode">
        <div class="podcast-details">
            <PodcastDescriptionItem 
                :image="podcast.details.image"
                :name="podcast.details.title"
                :author="podcast.details.author.__text"
                :description="podcast.details.description"
            />
            <EpisodeDescriptionItem
                :source="getSource()" 
                :title="getTitle()"
                :description="episode.description"
            />
        </div>
    </main>
</template>

<script>
import PodcastDescriptionItem from '../components/PodcastDescriptionItem.vue';
import EpisodeDescriptionItem from '../components/EpisodeDescriptionItem.vue';
export default {
    data: () => {
        return {
            podcast: null,
            episode: null,
            podcastId: null,
            episodeId: null
        }
    },
    components: {
        PodcastDescriptionItem,
        EpisodeDescriptionItem
    },  
    mounted(){
        this.podcastId = this.$route.params.podcastid;
        this.episodeId = this.$route.params.episodeid;
        this.getDetails();
    },
    methods: {
        //TODO: It is necessary a rework. There is an error when first loading this view without going through home/podcast view.
        //Considering migrating from Vuex to Pinia (Right now you cannot cumputed getters with Vuex and Vue 3).
        getDetails() {
            this.$emit('loader', true);
            this.podcast = this.$store.getters['episodes/getPodcastById'](this.podcastId);
            this.episode = this.$store.getters['episodes/getEpisodeById'](this.podcastId, this.episodeId);
            if (!this.podcast || !this.episode) {
                this.$router.push({name: 'not-found', params: {pathMatch: this.$route.path}});
            }
            this.$emit('loader', false);
        },
        getSource() {
            if (!this.episode.content) {
                return this.episode.enclosure._url;
            }
            if(this.episode.content.hasOwnProperty('_url')) {
                return this.episode.content._url;
            }
            return this.episode.content[0]._url;
        },
        getTitle() {
            if (typeof this.episode.title === 'string') {
                return this.episode.title;
            }
            return this.episode.title[0]
        }
    }
}
</script>
<style scoped>
    .podcast-details{
        display: flex;
        flex-direction: row;
    }
</style>